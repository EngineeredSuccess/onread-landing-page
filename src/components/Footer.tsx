'use client';

import React from 'react';
import { Flame, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#070707] border-t border-[#1F1F23] py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#141414] border border-[#FF006E]/40 text-[#FF006E]">
            <Flame className="w-4 h-4 fill-[#FF006E]" />
          </div>
          <span className="font-display font-bold text-lg text-white">
            On<span className="text-[#FF006E]">Read</span>
          </span>
        </div>

        {/* Legal Liability Disclaimer */}
        <div className="max-w-2xl bg-[#0F0F12] border border-[#222] rounded-xl p-4 text-xs font-mono text-neutral-400 leading-relaxed text-left sm:text-center">
          <p className="flex items-center justify-center gap-1.5 text-neutral-300 font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39FF14]" />
            <span>DISCLAIMER & PRIVACY COMMITMENT</span>
          </p>
          <p>
            OnRead AI roasts are generated strictly for entertainment and satirical purposes. We are not responsible for hurt egos, broken situationships, or terminated group chats. Screenshots are processed via automated OCR and deleted immediately after scoring.
          </p>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
          <span>© {new Date().getFullYear()} OnRead. All rights reserved.</span>
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
            className="hover:text-white transition-colors cursor-pointer"
          >
            Drop #01 Waitlist
          </button>
          <span className="hover:text-white transition-colors cursor-pointer">
            Terms of Service
          </span>
          <span className="hover:text-white transition-colors cursor-pointer">
            Privacy Policy
          </span>
        </div>
      </div>
    </footer>
  );
}
