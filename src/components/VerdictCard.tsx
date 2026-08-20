'use client';

import { Flame, Copy } from 'lucide-react';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export interface AuraVerdict {
  auraScore: number;
  tier: 'ANGEL' | 'CLEAN' | 'MID' | 'RADIOACTIVE' | 'TOXIC';
  tldr: string;
  roast: string;
  redFlags: string[];
  actionPlan: string[];
}

interface VerdictCardProps {
  verdict: AuraVerdict;
  onNewCheck: () => void;
  onShare?: (platform: 'instagram' | 'tiktok' | 'copy') => void;
}

const TIER_CONFIG: Record<AuraVerdict['tier'], { color: string; glow: string; bg: string; label: string }> = {
  ANGEL: {
    color: '#39FF14',
    glow: 'shadow-[0_0_30px_rgba(57,255,20,0.5)]',
    bg: 'bg-[#39FF14]/10 border-[#39FF14]/30',
    label: 'ANGEL',
  },
  CLEAN: {
    color: '#39FF14',
    glow: 'shadow-[0_0_25px_rgba(57,255,20,0.4)]',
    bg: 'bg-[#39FF14]/5 border-[#39FF14]/20',
    label: 'CLEAN',
  },
  MID: {
    color: '#FFB800',
    glow: 'shadow-[0_0_25px_rgba(255,184,0,0.4)]',
    bg: 'bg-[#FFB800]/10 border-[#FFB800]/30',
    label: 'MID',
  },
  RADIOACTIVE: {
    color: '#BC13FE',
    glow: 'shadow-[0_0_30px_rgba(188,19,254,0.5)]',
    bg: 'bg-[#BC13FE]/10 border-[#BC13FE]/30',
    label: 'RADIOACTIVE',
  },
  TOXIC: {
    color: '#FF2D2D',
    glow: 'shadow-[0_0_30px_rgba(255,45,45,0.5)]',
    bg: 'bg-[#FF2D2D]/10 border-[#FF2D2D]/30',
    label: 'TOXIC',
  },
};

export default function VerdictCard({ verdict, onNewCheck, onShare }: VerdictCardProps) {
  const [copied, setCopied] = useState(false);
  const config = TIER_CONFIG[verdict.tier] || TIER_CONFIG.RADIOACTIVE;

  const handleShare = (platform: 'instagram' | 'tiktok' | 'copy') => {
    if (onShare) {
      onShare(platform);
      return;
    }

    const shareText = `My OnRead Aura Score: ${verdict.auraScore} (${verdict.tier}) — ${verdict.tldr}`;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://onread.app';

    if (platform === 'copy') {
      void navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      return;
    }

    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(shareUrl);

    if (platform === 'instagram') {
      // Instagram Stories deep link (mobile only)
      const storyUrl = `https://www.instagram.com/stories/create/${shareUrl}`;
      window.open(storyUrl, '_blank');
    } else if (platform === 'tiktok') {
      // TikTok share sheet
      if (navigator.share) {
        void navigator.share({ title: 'OnRead Aura Score', text: shareText, url: shareUrl });
      } else {
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <style jsx>{`
        @keyframes neon-pulse-${verdict.tier} {
          0%, 100% { box-shadow: 0 0 20px ${config.color}, 0 0 40px ${config.color}; }
          50% { box-shadow: 0 0 30px ${config.color}, 0 0 60px ${config.color}; }
        }
        .score-pulse-${verdict.tier} { animation: neon-pulse-${verdict.tier} 2s ease-in-out infinite; }
      `}</style>

        <div
        className={`relative bg-[#141414] rounded-3xl p-5 sm:p-7 border-2 mb-6 border-[${config.color}]/30 shadow-[0_0_40px_rgba(0,0,0,0.3)]`}
      >
        {/* Watermark */}
        <div className="absolute top-4 right-5 text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
          <span>RATED BY ONREAD • VERIFIED</span>
        </div>

        {/* SCORE */}
        <div className="bg-[#0A0A0A] border border-[#27272A] rounded-2xl p-5 mb-5 text-center relative overflow-hidden">
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
            FINAL VERDICT
          </div>
          <div
            className={`font-display font-black text-5xl sm:text-6xl mb-2 score-pulse-${verdict.tier}`}
            style={{ color: config.color }}
          >
            {verdict.auraScore}
          </div>
          <div
            className={`inline-block px-3 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider ${config.bg}`}
            style={{ color: config.color }}
          >
            {verdict.tier === 'RADIOACTIVE' ? '💀 ' : verdict.tier === 'TOXIC' ? '☣️ ' : '✓ '}{verdict.tier}
          </div>
        </div>

        {/* TL;DR */}
        <div className="bg-[#191919] border border-[#2A2A2A] rounded-xl p-4 mb-3">
          <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1">
            TL;DR
          </div>
          <p className="text-sm text-neutral-200 leading-snug">
            {verdict.tldr}
          </p>
        </div>

        {/* THE ROAST */}
        <div
          className={`border rounded-xl p-4 mb-4 ${
            verdict.tier === 'TOXIC'
              ? 'border-[#FF2D2D]/40 bg-[#191919]/80'
              : verdict.tier === 'RADIOACTIVE'
                ? 'border-[#BC13FE]/40 bg-[#191919]/80'
                : 'border-[#2A2A2A] bg-[#191919]/50'
          } relative`}
        >
          <div
            className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider mb-1"
            style={{ color: config.color }}
          >
            <span>🔥 THE ROAST</span>
            <span className="text-[10px] text-neutral-400">GPT-4o Vision</span>
          </div>
          <p className="text-sm sm:text-base text-white font-medium italic leading-snug">
            "{verdict.roast}"
          </p>
        </div>

        {/* RED FLAGS */}
        <div className="bg-[#191919] border border-[#2A2A2A] rounded-xl p-4 mb-4">
          <div className="text-[11px] font-mono font-bold text-[#FF2D2D] uppercase tracking-wider mb-2">
            🚩 RED FLAGS DETECTED
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {verdict.redFlags.map((flag, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-xs text-neutral-300 font-mono bg-[#0F0F11] px-2.5 py-1.5 rounded-lg border border-[#27272A]"
              >
                <span className="text-[#FF2D2D]">🚩</span>
                <span>{flag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION PLAN */}
        <div className={`border rounded-xl p-4 mb-5 ${
          verdict.tier === 'ANGEL'
            ? 'border-[#39FF14]/30 bg-[#191919]/50'
            : verdict.tier === 'CLEAN'
              ? 'border-[#39FF14]/20 bg-[#191919]/50'
              : 'border-[#FF006E]/30 bg-[#191919]/50'
        }`}>
          <div
            className="text-[11px] font-mono font-bold uppercase tracking-wider mb-1.5"
            style={{ color: config.color }}
          >
            ⚡ IMMEDIATE ACTION PLAN
          </div>
          <ul className="space-y-1 text-xs text-neutral-300 font-mono">
            {verdict.actionPlan.map((plan, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span style={{ color: config.color }}>✔</span>
                <span>{plan}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.75 },
                colors: ['#FF006E', '#39FF14', '#BC13FE', '#FF2D2D'],
              });
              onNewCheck();
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-[#FF006E] hover:bg-[#ff1a7d] text-white font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,0,110,0.4)] cursor-pointer"
          >
            <Flame className="w-4 h-4" />
            <span>Check Another Screenshot</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleShare('instagram')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#18181B] hover:bg-[#2A2A30] border border-[#27272A] text-neutral-300 hover:text-white text-xs font-mono transition-all"
            >
              <svg className="w-4 h-4 text-[#FF006E]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.84.25 2.3.42.66.24 1.1.54 1.56 1 .46.45.76.89 1 1.56.17.46.37 1.13.42 2.3.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.84-.42 2.3-.24.66-.54 1.1-1 1.56-.45.46-.89.76-1.56 1-.46.46-1.13.37-2.3.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.84-.25-2.3-.42-.66-.24-1.1-.54-1.56-1-.46-.45-.76-.89-1-1.56-.17-.46-.37-1.13-.42-2.3-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.84.42-2.3.24-.66.54-1.1 1-1.56.45-.46.89-.76 1.56-1 .46-.46 1.13-.37 2.3-.42 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7 .07 5.71.13 4.8.33 4 .58c-.76.22-1.39.5-2.02 1.13S.82 2.94.6 3.7c-.25.79-.45 1.7.03 3.7C.6 8.33.6 8.74.6 12s-.03 3.67-.6 4.96c-.48 2-.48 2.91-.25 3.7.22.76.5 1.39 1.13 2.02.63.63 1.27 1 2 .22.79.11 1.7.46 3.7C15.67 23.4 16.26 23.4 17.55 23.4c1.29-.07 1.9-.27 3.7-.27.79-.25 1.7-.45 2.32-.04.63.41 1.31.69 2.02 1.31.72.63 1.29 1.32 1.46 2.17.07.3.14.59.19 1.79v-1.28c0-3.24.01-3.85-.07-5.17-.06-1.17-.26-1.85-.4-2.3-.13-.43-.28-.8-.45-1.13l-.07-.09c-.12-.17-.27-.32-.43-.46-.16-.13-.35-.25-.54-.36-1.51-.78-2.68-1.71-4.17-2.73-1.29-.88-2.08-1.37-3.5-2.68C8.69 4.3 8.16 3.46 7 2.28 6.67 1.64 6.3 1.55 5.99 1.41c-.35-.15-.72-.33-1.36-.59C4.1 1.07 3.77.83 3.35.73 2.7 0.57 2.13.39 2.05.28 2 2.25 2 2.25 2 2.25s0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0z" />
              </svg>
              <span>Share to Story</span>
            </button>
            <button
              onClick={() => handleShare('tiktok')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#18181B] hover:bg-[#2A2A30] border border-[#27272A] text-neutral-300 hover:text-white text-xs font-mono transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 4.59a2.12 2.12 0 0 1 2.97.64v4.57a.75.75 0 0 1-.37.64L6.58 16.93a.75.75 0 0 1-1.03-.26.75.75 0 0 1 .14-.99l13.5-8.44a.75.75 0 0 1 .97.03v-.17a.75.75 0 0 0-.49-.71l-6.5-2a.75.75 0 0 0-.37 1.45l7.25 2.32a.75.75 0 0 0 .97-.03v-.17a.99.99 0 0 0-1.21-.95L6.5 7.07a.75.75 0 0 1-1.03-.26.75.75 0 0 1 .14-.99z" />
              </svg>
              <span>Share to TikTok</span>
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#18181B] hover:bg-[#2A2A30] border border-[#27272A] text-neutral-300 hover:text-[#39FF14] transition-all"
              title="Copy verdict to clipboard"
            >
              {copied ? <Check size={16} className="text-[#39FF14]" /> : <Copy className="w-4 h-4 text-[#BC13FE]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Watermark footer */}
      <div className="text-center text-xs font-mono text-neutral-500">
        Generated by OnRead AI • Screenshots are not stored
      </div>
    </div>
  );
}

function Check({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}