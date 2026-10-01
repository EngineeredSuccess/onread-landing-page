'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, Skull } from 'lucide-react';
import UploadZone from '@/components/UploadZone';
import AuraResultsScreen from '@/components/AuraResultsScreen';
import type { AuraVerdict } from '@/components/VerdictCard';

type CheckStep = 'idle' | 'uploading' | 'analyzing' | 'result';

const TERMINAL_LINES = [
  '> OCR stream initialized...',
  '> Parsing message bubbles...',
  '> Measuring response energy...',
  '> Checking red flags...',
  '> Compiling your verdict...',
];

function subscribeToQuota(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener('onread:quota-change', onStoreChange);
  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener('onread:quota-change', onStoreChange);
  };
}

function getStoredQuota() {
  try {
    const value = Number.parseInt(localStorage.getItem('onread_checks_remaining') || '3', 10);
    return Number.isFinite(value) ? Math.max(0, value) : 3;
  } catch {
    return 3;
  }
}

function getServerQuota() {
  return 3;
}

export default function CheckPage() {
  const [step, setStep] = useState<CheckStep>('idle');
  const [verdict, setVerdict] = useState<AuraVerdict | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const checksRemaining = useSyncExternalStore(subscribeToQuota, getStoredQuota, getServerQuota);

  useEffect(() => {
    try {
      let userId = localStorage.getItem('onread_user_id');
      if (!userId) {
        userId = `anon-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        localStorage.setItem('onread_user_id', userId);
      }
    } catch {
      // The checker can still run without persistent browser storage.
    }
  }, []);

  useEffect(() => {
    if (step !== 'uploading' && step !== 'analyzing') return;

    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + Math.random() * 3 + 1, 94));
    }, 250);
    const lineTimer = window.setInterval(() => {
      setVisibleLines((current) => Math.min(current + 1, TERMINAL_LINES.length));
    }, 700);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(lineTimer);
    };
  }, [step]);

  const handleUpload = async (file: File) => {
    setError(null);
    setVerdict(null);
    setProgress(8);
    setVisibleLines(0);
    setStep('uploading');

    let userId = `anon-${Date.now()}`;
    try {
      userId = localStorage.getItem('onread_user_id') || userId;
      const imageData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Could not read this image.'));
        reader.onerror = () => reject(new Error('Could not read this image.'));
        reader.readAsDataURL(file);
      });

      setStep('analyzing');
      const response = await fetch('/api/aura-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, image_data: imageData, filename: file.name }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'Free weekly checks exhausted') {
          throw new Error("You've used all 3 free Aura Checks this week.");
        }
        throw new Error(data.message || data.error || 'The scan failed. Please try again.');
      }

      if (!data.verdict || data.verdict.error) {
        throw new Error(data.verdict?.message || 'A.U.R.A. could not read this screenshot. Try a clearer image.');
      }

      setProgress(100);
      setVerdict(data.verdict as AuraVerdict);
      setStep('result');
      const remaining = Math.max(0, checksRemaining - 1);
      try {
        localStorage.setItem('onread_checks_remaining', String(remaining));
        window.dispatchEvent(new Event('onread:quota-change'));
      } catch {
        // Keep the result available if browser storage is disabled.
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Network error. Please try again.');
      setStep('idle');
      setProgress(0);
      setVisibleLines(0);
    }
  };

  const handleReset = () => {
    setVerdict(null);
    setError(null);
    setProgress(0);
    setVisibleLines(0);
    setStep('idle');
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] px-4 pb-16 pt-6 text-white sm:pt-10">
      <div className="pointer-events-none absolute inset-0 cyber-grid-pink opacity-30" />
      <div className="relative z-10 mx-auto max-w-lg">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to OnRead
          </Link>
          <span className="rounded-full border border-[#27272A] bg-[#141414] px-3 py-1 text-xs font-mono text-neutral-400">
            {checksRemaining} free checks left
          </span>
        </div>

        {step === 'result' && verdict ? (
          <AuraResultsScreen verdict={verdict} onReset={handleReset} />
        ) : step === 'uploading' || step === 'analyzing' ? (
          <section className="flex min-h-[520px] flex-col items-center justify-center gap-6 text-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#FF006E] shadow-[0_0_35px_rgba(255,0,110,0.35)]">
              <Skull className="h-10 w-10 animate-pulse motion-reduce:animate-none" />
              <span className="absolute -inset-2 animate-ping rounded-full border border-[#FF006E]/40 motion-reduce:animate-none" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight">A.U.R.A. is judging...</h1>
              <p className="mt-2 text-sm text-neutral-400">Scanning the screenshot and finding the red flags.</p>
            </div>
            <div className="w-full">
              <div className="mb-2 flex justify-between font-mono text-[11px] text-neutral-500">
                <span>ANALYSIS IN PROGRESS</span><span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#1F1F23]">
                <div className="h-full rounded-full bg-gradient-to-r from-[#FF006E] to-[#BC13FE] transition-[width] duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="w-full overflow-hidden rounded-xl border border-[#39FF14]/20 bg-[#050505] text-left">
              <div className="flex items-center gap-2 border-b border-[#39FF14]/10 bg-[#0E0E0E] px-4 py-3 text-[10px] font-mono text-neutral-500">
                <Cpu className="h-3.5 w-3.5 text-[#39FF14]" /> ONREAD SCAN CONSOLE
              </div>
              <div className="min-h-36 space-y-2 p-4 font-mono text-xs text-[#39FF14]/80">
                {TERMINAL_LINES.slice(0, visibleLines).map((line) => <p key={line}>{line}</p>)}
                {visibleLines < TERMINAL_LINES.length && <span className="blink-cursor motion-reduce:animate-none" />}
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-6">
            <header className="text-center">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF006E]/30 bg-[#FF006E]/10 px-3 py-1 text-[10px] font-mono tracking-wider text-[#FF006E]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF006E]" /> THE AURA SCANNER
              </p>
              <h1 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl">
                Drop the chat.<br /><span className="text-[#FF006E]">Get roasted.</span>
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
                Upload a screenshot of the conversation. A.U.R.A. will read the receipts and give you the verdict.
              </p>
            </header>

            <UploadZone onUpload={handleUpload} isLoading={false} error={error} disabled={checksRemaining <= 0} />

            {checksRemaining <= 0 && (
              <p className="rounded-xl border border-[#FF2D2D]/30 bg-[#FF2D2D]/10 p-4 text-center text-sm text-[#FF8A8A]">
                You&apos;ve used all 3 free checks this week. Come back when your free checks reset.
              </p>
            )}
            <p className="text-center text-[11px] font-mono text-neutral-600">Your screenshot is processed for this check and then removed.</p>
          </section>
        )}
      </div>
    </main>
  );
}
