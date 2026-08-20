'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, CheckCircle2, Copy, Share2, Sparkles, Loader2, Skull } from 'lucide-react';

interface WaitlistFormProps {
  id?: string;
  source?: string;
}

export default function WaitlistForm({ id = 'waitlist-form', source = 'hero' }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{ isDuplicate?: boolean; message?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMsg('Please enter your email to check your aura.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setErrorMsg('Enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmed, source }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit. Please try again.');
      }

      setIsSuccess(true);
      setSuccessData(data);

      // Trigger Confetti Party
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF006E', '#39FF14', '#BC13FE', '#FFFFFF'],
        });
      } catch {
        // Safe failover for environments without canvas
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}?ref=${encodeURIComponent(email.split('@')[0] || 'vip')}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      "I just reserved my spot for OnRead — the AI judge that roasts your toxic group chats and calculates your Aura Score 💀🔥 Join before Drop 1 fills up:"
    );
    const url = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : 'https://onread.app';
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-lg mx-auto bg-[#141414] border border-[#39FF14]/50 rounded-2xl p-6 sm:p-7 shadow-[0_0_30px_rgba(57,255,20,0.15)] text-left animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-start gap-3.5 mb-4">
          <div className="p-2.5 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-white">
                {successData?.isDuplicate ? "You're Already on the VIP List" : "Spot Secured — You're in Drop #01"}
              </span>
            </div>
            <p className="text-sm font-mono text-[#39FF14] mt-0.5">
              +100 AURA BONUS CLAIMED ⚡
            </p>
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-[#27272A] rounded-xl p-4 mb-5">
          <p className="text-sm text-neutral-300 leading-relaxed font-medium">
            &ldquo;You&apos;re on the list. Prepare your receipts, we drop soon. +100 Aura for moving fast. 💀&rdquo;
          </p>
          <div className="mt-3 pt-3 border-t border-[#1F1F23] flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>VIP PRIORITY QUEUE</span>
            <span className="text-[#39FF14]">CONFIRMED #0{Math.floor(Math.random() * 80 + 380)}</span>
          </div>
        </div>

        {/* Viral Referral Share */}
        <div className="space-y-3">
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Want VIP Beta Access sooner? Jump the line:
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleCopyLink}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F1F23] hover:bg-[#2A2A30] border border-[#333] text-xs font-mono text-white transition-all active:scale-95"
            >
              <Copy className="w-3.5 h-3.5 text-[#FF006E]" />
              <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Referral Invite Link'}</span>
            </button>

            <button
              onClick={shareOnTwitter}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF006E] hover:bg-[#ff1a7d] text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(255,0,110,0.3)] active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Flex on X / Twitter</span>
            </button>
          </div>

          <button
            onClick={() => {
              setIsSuccess(false);
              setEmail('');
            }}
            className="w-full text-center text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors pt-2"
          >
            Register another email address →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto flex flex-col gap-3"
      noValidate
    >
      <div className="relative flex flex-col sm:flex-row gap-2.5 p-1.5 sm:p-2 rounded-2xl bg-[#141414]/90 border border-[#27272A] focus-within:border-[#FF006E] focus-within:shadow-[0_0_25px_rgba(255,0,110,0.25)] transition-all">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="Enter your email to save your aura..."
            disabled={isLoading}
            className="w-full h-12 sm:h-13 px-4 rounded-xl bg-transparent text-white placeholder:text-neutral-500 text-sm sm:text-base outline-none disabled:opacity-50"
            autoComplete="email"
            aria-label="Your email address"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="h-12 sm:h-13 px-6 sm:px-8 rounded-xl bg-[#FF006E] hover:bg-[#ff1a7d] text-white font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-[0_0_20px_rgba(255,0,110,0.4)] hover:shadow-[0_0_30px_rgba(255,0,110,0.6)] flex-shrink-0 disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Judging...</span>
            </>
          ) : (
            <>
              <span>Save Your Aura</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <div className="text-xs font-mono text-[#FF2D2D] text-left px-2 flex items-center gap-1.5 animate-in fade-in">
          <Skull className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </form>
  );
}
