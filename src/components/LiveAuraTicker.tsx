'use client';

import React from 'react';

const RECENT_VERDICTS = [
  { location: 'NYC', score: '-4,500 Aura', note: 'Sent 4 reels with zero replies 💀', color: '#FF2D2D' },
  { location: 'London', score: '+500 Aura', note: 'Left on read for 72 hours 💅', color: '#39FF14' },
  { location: 'Warsaw', score: '-10,000 Aura', note: 'Asked "why are you mad?" at 3 AM 🚩', color: '#FF2D2D' },
  { location: 'LA', score: '-8,000 Aura', note: 'Double texted: "guess you hate me lol"', color: '#FF006E' },
  { location: 'Toronto', score: '+1,200 Aura', note: 'Replied "ok" to a 3-paragraph essay', color: '#39FF14' },
  { location: 'Berlin', score: '-12,000 Aura', note: 'Liked their own message to revive chat 💀', color: '#BC13FE' },
];

export default function LiveAuraTicker() {
  return (
    <div className="w-full bg-[#111111] border-y border-[#202020] py-2.5 overflow-hidden">
      <div className="flex w-max animate-marquee space-x-6 text-xs font-mono">
        {[...RECENT_VERDICTS, ...RECENT_VERDICTS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-[#18181B] rounded-lg border border-[#27272A]">
            <span className="text-neutral-400">[{item.location}]</span>
            <span className="font-bold" style={{ color: item.color }}>
              {item.score}
            </span>
            <span className="text-neutral-300">• {item.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
