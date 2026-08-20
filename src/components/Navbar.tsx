'use client';

import React from 'react';
import { Flame, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#222222] bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden border border-[#FF006E]/40 shadow-[0_0_15px_rgba(255,0,110,0.3)]">
            <img src="/logo.png" alt="OnRead Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-tight text-white">
                On<span className="text-[#FF006E]">Read</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF006E]/10 border border-[#FF006E]/40 text-[#FF006E] rounded">
                DROP #01
              </span>
            </div>
          </div>
        </div>

        {/* Live Activity & Quick Action */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#27272A] text-xs font-mono text-neutral-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
            </span>
            <span>2,840+ receipts judged today</span>
          </div>

          <button
            onClick={() => {
              const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement | null;
              if (emailInput) {
                emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => emailInput.focus(), 300);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#FF006E] hover:bg-[#ff1a7d] text-white font-semibold text-xs sm:text-sm transition-all transform active:scale-95 shadow-[0_0_15px_rgba(255,0,110,0.4)] cursor-pointer"
          >
            Claim Spot
          </button>
        </div>
      </div>
    </header>
  );
}
