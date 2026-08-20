'use client';

import React from 'react';
import WaitlistForm from './WaitlistForm';
import { Sparkles, Zap, Users, ShieldAlert } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="waitlist" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 overflow-hidden scroll-mt-20">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#FF006E]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#BC13FE]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top Viral Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#FF006E]/30 text-xs font-mono mb-6 shadow-[0_0_15px_rgba(255,0,110,0.15)] animate-pulse-subtle">
          <span className="flex h-2 w-2 rounded-full bg-[#FF006E]" />
          <span className="text-neutral-300 font-medium">DROP 01: THE AURA TRIAL</span>
          <span className="text-[#FF006E] font-bold">INVITE-ONLY</span>
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

        {/* Waitlist Form Component */}
        <div className="w-full max-w-lg mb-6">
          <WaitlistForm id="hero-waitlist" source="hero" />
        </div>

        {/* FOMO Counter & Progress Bar */}
        <div className="w-full max-w-md bg-[#121212] border border-[#27272A] rounded-xl p-3.5 shadow-inner">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Zap className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" />
              <span className="font-semibold text-white">First Drop Limit:</span>
            </div>
            <div className="text-neutral-400">
              <span className="text-[#FF006E] font-bold">392</span> / 500 spots taken
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-[#1F1F23] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF006E] to-[#BC13FE] rounded-full shadow-[0_0_10px_rgba(255,0,110,0.6)]"
              style={{ width: '78.4%' }}
            />
          </div>

          <p className="text-[11px] font-mono text-neutral-400 mt-2 text-center">
            🔥 <span className="text-white font-medium">Only 500 spots available in the first drop.</span> Zero randoms.
          </p>
        </div>

        {/* Platform Logos / Social Proof Bar */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            As seen on
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
