'use client';

import React from 'react';
import { Flame, Skull, Lock, Zap, Shield, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: Flame,
    title: 'Brutally Honest AI',
    tag: 'GPT-4o VISION ROAST ENGINE',
    color: '#FF006E',
    borderColor: 'border-[#FF006E]/40',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(255,0,110,0.25)]',
    description:
      'Your friend will tell you "they\'re probably just super busy with work". Our AI will tell you they just don\'t care. Zero sugarcoating.',
    badge: 'NO CAP',
  },
  {
    icon: Skull,
    title: 'Aura Score Algorithm',
    tag: 'REAL-TIME PENALTY MATH',
    color: '#39FF14',
    borderColor: 'border-[#39FF14]/40',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(57,255,20,0.25)]',
    description:
      'Find out who is dragging the entire group chat down. Double-texting, sending "?" after 2 minutes, and begging for replies drain your points instantly.',
    badge: '-10K AURA',
  },
  {
    icon: Lock,
    title: 'Toxic Invites Only',
    tag: 'GATEKEEPER SECURITY',
    color: '#BC13FE',
    borderColor: 'border-[#BC13FE]/40',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(188,19,254,0.25)]',
    description:
      'You only get access if you roast a friend hard enough or jump the queue with an invite link. Zero random people allowed.',
    badge: '500 SLOTS',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0A0A0A] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono text-neutral-400 mb-3">
            <Zap className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>BUILT FOR COLD HARD TRUTH</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Why <span className="text-[#FF006E]">OnRead</span> Exposes Everyone
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 font-normal">
            No endless therapy talk. Just raw screenshot diagnostics.
          </p>
        </div>

        {/* 3 Brutal Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col justify-between bg-[#141414] border ${feature.borderColor} rounded-2xl p-6 sm:p-7 transition-all duration-300 ${feature.shadowColor} group relative overflow-hidden`}
              >
                {/* Subtle top indicator bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-80"
                  style={{ backgroundColor: feature.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#0A0A0A] border border-[#282828] text-white group-hover:scale-110 transition-transform"
                      style={{ color: feature.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-md bg-[#0A0A0A] border"
                      style={{ color: feature.color, borderColor: `${feature.color}40` }}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    {feature.tag}
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-3 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F1F23] flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>STATUS</span>
                  <span className="text-[#39FF14]">OPERATIONAL</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
