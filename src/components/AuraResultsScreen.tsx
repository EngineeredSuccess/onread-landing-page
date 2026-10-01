'use client';

import { useState } from 'react';
import { Check, Download, MessageSquare, RefreshCw, Share2, Zap } from 'lucide-react';
import type { AuraVerdict } from '@/components/VerdictCard';

interface AuraResultsScreenProps {
  verdict: AuraVerdict;
  onReset: () => void;
}

const TIER_STYLE: Record<AuraVerdict['tier'], { color: string; emoji: string; label: string }> = {
  ANGEL: { color: '#39FF14', emoji: '😇', label: 'ANGEL' },
  CLEAN: { color: '#39FF14', emoji: '✨', label: 'CLEAN' },
  MID: { color: '#FFB800', emoji: '😬', label: 'MID' },
  RADIOACTIVE: { color: '#BC13FE', emoji: '☢️', label: 'RADIOACTIVE' },
  TOXIC: { color: '#FF2D2D', emoji: '💀', label: 'TOXIC' },
};

function roundedBox(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 5,
) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  let line = '';
  const lines: string[] = [];
  let truncated = false;

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
      if (lines.length >= maxLines) {
        truncated = true;
        line = '';
        break;
      }
    } else {
      line = candidate;
    }
  }

  if (line && lines.length < maxLines) lines.push(line);
  if (truncated && lines.length) {
    const last = lines.length - 1;
    while (lines[last] && ctx.measureText(`${lines[last]}…`).width > maxWidth) lines[last] = lines[last].slice(0, -1);
    lines[last] += '…';
  }

  lines.forEach((visibleLine, index) => ctx.fillText(visibleLine, x, y + index * lineHeight));
  return lines.length * lineHeight;
}

async function createStoryBlob(verdict: AuraVerdict, color: string, tierLabel: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create the Story image.');

  const background = ctx.createLinearGradient(0, 0, 0, canvas.height);
  background.addColorStop(0, '#140711');
  background.addColorStop(0.55, '#0A0A0A');
  background.addColorStop(1, '#080B08');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.14;
  ctx.strokeStyle = '#FF006E';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 48) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 48) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 76px Arial, sans-serif';
  ctx.fillText('On', 485, 170);
  ctx.fillStyle = '#FF006E';
  ctx.fillText('Read', 615, 170);
  ctx.fillStyle = '#929292';
  ctx.font = '600 24px Arial, sans-serif';
  ctx.fillText('AURA CHECK • FINAL VERDICT', 540, 240);

  ctx.fillStyle = '#777777';
  ctx.font = '700 24px Arial, sans-serif';
  ctx.fillText('YOUR AURA SCORE', 540, 440);
  ctx.fillStyle = color;
  ctx.font = '900 190px Arial, sans-serif';
  ctx.fillText(String(verdict.auraScore), 540, 650);
  ctx.font = '500 34px Arial, sans-serif';
  ctx.fillStyle = '#858585';
  ctx.fillText('/ 100', 540, 710);

  roundedBox(ctx, 300, 760, 480, 76, 38);
  ctx.fillStyle = '#171217'; ctx.fill();
  ctx.strokeStyle = `${color}88`; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = '800 30px Arial, sans-serif';
  ctx.fillText(tierLabel, 540, 809);

  const left = 84;
  const cardWidth = 912;
  let y = 900;
  const drawCard = (label: string, content: string, accent: string, maxLines: number) => {
    ctx.font = '700 24px Arial, sans-serif';
    const contentFont = '500 30px Arial, sans-serif';
    ctx.font = contentFont;
    const lines = content.trim().split(/\s+/).reduce<string[]>((acc, word) => {
      const last = acc.length - 1;
      const next = last >= 0 ? `${acc[last]} ${word}` : word;
      if (last < 0 || ctx.measureText(next).width > cardWidth - 88) acc.push(word);
      else acc[last] = next;
      return acc;
    }, []);
    const visibleLines = Math.min(Math.max(1, lines.length), maxLines);
    const cardHeight = 88 + visibleLines * 42 + 34;

    roundedBox(ctx, left, y, cardWidth, cardHeight, 24);
    ctx.fillStyle = '#121212'; ctx.fill();
    ctx.strokeStyle = `${accent}66`; ctx.lineWidth = 2; ctx.stroke();
    ctx.textAlign = 'left';
    ctx.fillStyle = accent;
    ctx.font = '800 23px Arial, sans-serif';
    ctx.fillText(label, left + 36, y + 48);
    ctx.fillStyle = '#EEEEEE';
    ctx.font = contentFont;
    drawWrappedText(ctx, content, left + 36, y + 100, cardWidth - 72, 42, maxLines);
    y += cardHeight + 22;
  };

  drawCard('THE ROAST', `“${verdict.roast}”`, '#FF2E93', 5);
  if (verdict.tldr) drawCard('TL;DR', verdict.tldr, '#BC13FE', 3);

  if (verdict.redFlags.length) {
    const flags = verdict.redFlags.slice(0, 3).map((flag) => `• ${flag}`).join('\n');
    const lines = flags.split('\n').length;
    const cardHeight = 84 + lines * 46 + 26;
    roundedBox(ctx, left, y, cardWidth, cardHeight, 24);
    ctx.fillStyle = '#121212'; ctx.fill();
    ctx.strokeStyle = '#FF444466'; ctx.lineWidth = 2; ctx.stroke();
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FF6666';
    ctx.font = '800 23px Arial, sans-serif';
    ctx.fillText('RED FLAGS', left + 36, y + 48);
    ctx.fillStyle = '#EEEEEE';
    ctx.font = '500 28px Arial, sans-serif';
    flags.split('\n').forEach((flag, index) => ctx.fillText(flag, left + 36, y + 98 + index * 44, cardWidth - 72));
    y += cardHeight + 22;
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#777777';
  ctx.font = '600 24px Arial, sans-serif';
  ctx.fillText('GET YOUR VERDICT AT ONREAD.CC', 540, Math.min(y + 26, 1800));
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Could not export the Story image.')), 'image/png');
  });
}

export default function AuraResultsScreen({ verdict, onReset }: AuraResultsScreenProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const config = TIER_STYLE[verdict.tier] ?? TIER_STYLE.MID;
  const shareText = `My OnRead Aura Score: ${verdict.auraScore}/100 (${verdict.tier}) — ${verdict.tldr}`;

  const handleShare = async () => {
    setShareError(null);
    try {
      if (navigator.share) {
        await navigator.share({ title: 'My OnRead Aura Verdict', text: shareText, url: 'https://onread.cc' });
      } else {
        await navigator.clipboard.writeText(`${shareText} https://onread.cc`);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      }
    } catch (cause) {
      if (cause instanceof Error && cause.name !== 'AbortError') {
        setShareError('Could not open sharing. Try copying your verdict instead.');
      }
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    setShareError(null);
    try {
      const blob = await createStoryBlob(verdict, config.color, config.label);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'onread-aura-story.png';
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (cause) {
      setShareError(cause instanceof Error ? cause.message : 'Could not create the Story image.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="space-y-4 pb-8">
      <header className="py-3 text-center">
        <p className="mb-2 text-xs font-mono tracking-[0.25em] text-neutral-500">YOUR AURA SCORE</p>
        <p className="font-display text-6xl font-black tracking-tight sm:text-7xl" style={{ color: config.color }}>{verdict.auraScore}</p>
        <span className="mt-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-mono font-bold" style={{ color: config.color, borderColor: `${config.color}66`, backgroundColor: `${config.color}12` }}>
          <span>{config.emoji}</span>{config.label}
        </span>
      </header>

      {verdict.tldr && (
        <article className="rounded-2xl border border-[#BC13FE]/30 bg-[#141414] p-4">
          <h2 className="mb-2 flex items-center gap-2 text-[11px] font-mono font-bold tracking-wider text-[#BC13FE]"><Zap className="h-4 w-4" /> TL;DR</h2>
          <p className="text-sm leading-relaxed text-neutral-200">{verdict.tldr}</p>
        </article>
      )}

      <article className="rounded-2xl border border-[#FF006E]/35 bg-[#141414] p-4 shadow-[0_0_24px_rgba(255,0,110,0.08)]">
        <h2 className="mb-2 flex items-center gap-2 text-[11px] font-mono font-bold tracking-wider text-[#FF006E]"><span>💀</span> THE ROAST</h2>
        <p className="text-sm italic leading-relaxed text-white">“{verdict.roast}”</p>
      </article>

      {!!verdict.redFlags.length && (
        <article className="rounded-2xl border border-[#FF2D2D]/25 bg-[#141414] p-4">
          <h2 className="mb-3 text-[11px] font-mono font-bold tracking-wider text-[#FF6666]">🚩 RED FLAGS</h2>
          <ul className="space-y-2">
            {verdict.redFlags.map((flag, index) => <li key={`${index}-${flag}`} className="flex gap-2 text-sm text-neutral-300"><span className="text-[#FF6666]">•</span>{flag}</li>)}
          </ul>
        </article>
      )}

      {!!verdict.actionPlan.length && (
        <article className="rounded-2xl border border-[#39FF14]/20 bg-[#141414] p-4">
          <h2 className="mb-3 flex items-center gap-2 text-[11px] font-mono font-bold tracking-wider text-[#39FF14]"><MessageSquare className="h-4 w-4" /> WHAT TO DO NEXT</h2>
          <ul className="space-y-2">
            {verdict.actionPlan.map((action, index) => <li key={`${index}-${action}`} className="flex gap-2 text-sm text-neutral-300"><span className="text-[#39FF14]">✓</span>{action}</li>)}
          </ul>
        </article>
      )}

      {shareError && <p role="status" className="text-center text-xs text-[#FF8A8A]">{shareError}</p>}
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => void handleShare()} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF006E] px-3 text-xs font-bold tracking-wide text-white transition hover:bg-[#ff1a7d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}{copied ? 'COPIED' : 'SHARE VERDICT'}
        </button>
        <button type="button" onClick={() => void handleDownload()} disabled={downloading} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#39FF14]/40 px-3 text-xs font-bold tracking-wide text-[#39FF14] transition hover:bg-[#39FF14]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60">
          <Download className="h-4 w-4" />{downloading ? 'CREATING…' : 'DOWNLOAD STORY'}
        </button>
      </div>
      <button type="button" onClick={onReset} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#27272A] text-xs font-mono text-neutral-400 transition hover:border-[#FF006E]/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        <RefreshCw className="h-3.5 w-3.5" /> CHECK ANOTHER SCREENSHOT
      </button>
      <p className="text-center text-[10px] font-mono text-neutral-600">Generated by OnRead AI · Screenshots are not stored</p>
    </section>
  );
}
