'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="check" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 overflow-hidden scroll-mt-20">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#FF006E]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#BC13FE]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top Viral Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#FF006E]/30 text-xs font-mono mb-6 shadow-[0_0_15px_rgba(255,0,110,0.15)] animate-pulse-subtle">
          <span className="flex h-2 w-2 rounded-full bg-[#FF006E]" />
          <span className="text-neutral-300 font-medium">THE AURA CHECK IS LIVE</span>
          <span className="text-[#39FF14] font-bold">TRY IT FREE</span>
        </div>

        {/* Big Aggressive H1 */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-[1.08] max-w-3xl mb-6">
          Stop Overthinking.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF006E] via-[#BC13FE] to-[#FF006E] drop-shadow-[0_0_25px_rgba(255,0,110,0.4)]">
            Start Checking.
          </span>
        </h1>

        {/* Punchy Subheader */}
        <p className="text-base sm:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10">
          The AI judge for your toxic group chats and dating app disasters. Drop the screenshot, get your{' '}
          <span className="text-white font-semibold underline decoration-[#FF006E] decoration-2 underline-offset-4">
            Aura Score
          </span>
          .
        </p>

        <Link
          href="/check"
          className="mb-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF006E] px-7 py-4 font-display text-base font-bold text-white shadow-[0_0_25px_rgba(255,0,110,0.35)] transition hover:bg-[#ff1a7d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          CHECK YOUR CHAT <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mb-6 text-xs font-mono text-neutral-500">No account. No email. Just your screenshot and the verdict.</p>

        {/* Platform Logos / Social Proof Bar */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            MADE FOR
          </span>
          <div className="flex items-center gap-6 sm:gap-10 text-neutral-400 text-sm font-display font-bold">
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#FF006E]"></span>
              <span>TikTok</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#BC13FE]"></span>
              <span>IG Reels</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#39FF14]"></span>
              <span>Group Chats</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
