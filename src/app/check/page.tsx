'use client';

import { useState, useEffect } from 'react';
import UploadZone from '@/components/UploadZone';
import VerdictCard, { AuraVerdict } from '@/components/VerdictCard';
import { Zap, Skull, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckPage() {
  const [step, setStep] = useState<'idle' | 'uploading' | 'analyzing' | 'result'>('idle');
  const [verdict, setVerdict] = useState<AuraVerdict | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [checksRemaining, setChecksRemaining] = useState(3);

  useEffect(() => {
    const stored = localStorage.getItem('onread_user_id');
    if (!stored) {
      const newId = `anon-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('onread_user_id', newId);
    }

    const remaining = parseInt(localStorage.getItem('onread_checks_remaining') || '3', 10);
    setChecksRemaining(remaining);
  }, []);

  const handleUpload = async (file: File) => {
    setError(null);
    setVerdict(null);
    setStep('uploading');
    setProgress(10);

    const userId = localStorage.getItem('onread_user_id') || `anon-${Date.now()}`;

    // Simulate upload progress
    const simulateProgress = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 10, 90));
    }, 200);

    try {
      setProgress(25);

      // Convert file to base64
      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const imageData = await toBase64(file);
      setProgress(45);

      // Call backend
      const res = await fetch('/api/aura-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          image_data: imageData,
          filename: file.name,
        }),
      });

      clearInterval(simulateProgress);
      setProgress(100);
      setStep('analyzing');

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'ai_error' || data.error === 'no_text_detected' || data.error === 'unsafe_content' || data.error === 'unreadable_text' || data.error === 'no_conversation') {
          setError(data.message || 'The AI shrugged. Something went wrong with the analysis.');
        } else if (data.error === 'Free weekly checks exhausted') {
          setError('You\'ve used all 3 free Aura Checks this week. Share the app to earn more!');
        } else {
          setError(data.error || 'Something went wrong. The void is silent...');
        }
        setStep('idle');
        setProgress(0);
        return;
      }

      // AI analysis is done — show verdict
      setVerdict(data.verdict);
      setStep('result');

      // Decrement checks remaining
      const newRemaining = Math.max(0, checksRemaining - 1);
      setChecksRemaining(newRemaining);
      localStorage.setItem('onread_checks_remaining', String(newRemaining));

    } catch (err: unknown) {
      clearInterval(simulateProgress);
      const msg = err instanceof Error ? err.message : 'Network error. Check your connection.';
      setError(msg);
      setStep('idle');
      setProgress(0);
    }
  };

  const handleNewCheck = () => {
    setVerdict(null);
    setStep('idle');
    setProgress(0);
    setError(null);
  };

  const AnalyzingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] gap-6 text-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-[#FF006E] flex items-center justify-center animate-pulse">
          <Skull className="w-10 h-10 text-white animate-pulse" />
        </div>
        <div className="absolute -inset-2 rounded-full bg-[#FF006E]/30 animate-ping" />
      </div>

      <div className="space-y-3">
        <p className="font-display font-bold text-xl text-white">A.U.R.A. is judging...</p>
        <p className="text-sm text-neutral-400 max-w-xs">
          {progress < 30
            ? 'Scanning the screenshot...'
            : progress < 60
              ? 'Extracting conversation text...'
              : progress < 90
                ? 'Detecting red flags...'
                : 'Formulating the roast...'}
        </p>
      </div>

      <div className="w-full max-w-xs bg-[#1F1F23] rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#FF006E] to-[#BC13FE] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs font-mono text-neutral-500">
        Progress: {Math.round(progress)}% — GPT-4o Vision engine
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16 pb-32 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors text-sm font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="text-right">
            <span className="font-mono text-xs text-neutral-400">Checks remaining:</span>
            <span className="font-display font-bold text-lg text-[#FF006E]">
              {checksRemaining}/3
            </span>
          </div>
        </div>

        {/* Main Content */}
        {step === 'result' && verdict ? (
          <VerdictCard
            verdict={verdict}
            onNewCheck={handleNewCheck}
            onShare={() => {
              const text = `My OnRead Aura Score: ${verdict.auraScore} (${verdict.tier}) — ${verdict.tldr}`;
              if (navigator.share) {
                void navigator.share({ title: 'OnRead', text: text, url: 'https://onread.app' });
              }
            }}
          />
        ) : step === 'uploading' || step === 'analyzing' ? (
          <AnalyzingScreen />
        ) : (
          <div className="space-y-6">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white text-center uppercase tracking-tight">
              Drop Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF006E] via-[#BC13FE] to-[#FF006E] drop-shadow-[0_0_25px_rgba(255,0,110,0.4)]">
                Receipt
              </span>
            </h1>
            <p className="text-center text-neutral-300 text-sm leading-relaxed">
              Screenshot your toxic texts, dry replies, or group chat disasters.{' '}
              <strong>A.U.R.A.</strong> will roast you into shape.
            </p>

            <UploadZone
              onUpload={handleUpload}
              isLoading={false}
              error={error}
              disabled={checksRemaining <= 0}
            />

            {checksRemaining <= 0 && (
              <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 text-center">
                <p className="text-[#FF2D2D] text-sm font-medium">
                  You've used all 3 free checks this week.
                </p>
                <button
                  onClick={() => {
                    localStorage.setItem('onread_checks_remaining', '3');
                    setChecksRemaining(3);
                  }}
                  className="mt-2 text-xs text-neutral-500 underline hover:text-neutral-300"
                >
                  Reset for testing — in production this would unlock Pro
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
