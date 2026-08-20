'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, AlertTriangle, CheckCircle, ShieldAlert, Sparkles, MessageSquare, Terminal } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  chatSnippet: {
    sender: 'them' | 'you';
    text: string;
    time: string;
    status?: string;
  }[];
  score: string;
  tier: string;
  tierColor: string;
  tldr: string;
  roast: string;
  redFlags: string[];
  actionPlan: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'triple-text',
    title: 'The Triple-Texter',
    chatSnippet: [
      { sender: 'them', text: 'hey, how was your weekend?', time: 'Friday 6:15 PM' },
      { sender: 'you', text: 'it was pretty good! went to that cafe you mentioned', time: 'Friday 6:18 PM', status: 'Read 6:19 PM' },
      { sender: 'you', text: 'did you end up going to that party?', time: 'Saturday 2:10 AM', status: 'Read 2:15 AM' },
      { sender: 'you', text: 'hello?? did you die lol', time: 'Saturday 4:45 PM', status: 'Read 4:46 PM' },
    ],
    score: '-10,000',
    tier: 'RADIOACTIVE / TOXIC',
    tierColor: '#FF2D2D',
    tldr: 'You triple-texted someone who left you on read for 22 hours across two calendar days. Main character energy ❌',
    roast: 'Bro really sent three consecutive messages like a smoke detector with low battery chirping for attention in an empty apartment 💀',
    redFlags: ['Triple texting in 24h', 'Zero reciprocity', 'Desperation energy', 'Double-checking read receipts'],
    actionPlan: [
      '1. Lock phone in a drawer immediately.',
      '2. Touch real grass outside.',
      '3. If they reply next Tuesday: respond in 3 business days.',
    ],
  },
  {
    id: 'dry-texter',
    title: 'The "k" Responder',
    chatSnippet: [
      { sender: 'you', text: 'omg you will never believe what happened at work today my boss literally lost his mind', time: '3:45 PM' },
      { sender: 'them', text: 'k', time: '7:12 PM', status: 'Delivered' },
      { sender: 'you', text: 'are you free this friday to get dinner?', time: '7:14 PM' },
      { sender: 'them', text: 'idk maybe', time: '9:30 PM', status: 'Delivered' },
    ],
    score: '-8,500',
    tier: 'EMOTIONAL DESERT',
    tierColor: '#FF006E',
    tldr: 'You are writing novel chapters to someone communicating in Morse code.',
    roast: 'They are giving you the conversational equivalent of tap water at room temperature. Have some self respect 💀',
    redFlags: ['Single letter replies', '4-hour gap for 1 character', 'Asymmetrical text density'],
    actionPlan: [
      '1. Delete chat history.',
      '2. Archive conversation.',
      '3. Reclaim your lost dignity.',
    ],
  },
  {
    id: 'ghost-revival',
    title: 'The 3 AM Zombie',
    chatSnippet: [
      { sender: 'them', text: 'hey stranger miss u', time: '3:14 AM' },
      { sender: 'you', text: 'omg hey!! how are you? i was just thinking about you!!', time: '3:15 AM' },
    ],
    score: '-15,000',
    tier: 'CRIMINAL DOWN BAD',
    tierColor: '#BC13FE',
    tldr: 'Instant 60-second reply to a 3 AM resurrection text after 4 months of silence.',
    roast: 'You were waiting by the phone like a hostage negotiator on standby. Catastrophic Aura depletion.',
    redFlags: ['3 AM booty call trap', 'Instant 1-minute reply', 'Exclamation mark overdose'],
    actionPlan: [
      '1. Airplane mode immediately.',
      '2. Do not explain yourself.',
      '3. Never reply at 3 AM.',
    ],
  },
];

export default function SocialProofVerdict() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#0E0E0E] border-y border-[#1E1E1E] overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid-pink opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF006E]/10 border border-[#FF006E]/30 text-xs font-mono text-[#FF006E] mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>THE JUDGEMENT CHAMBER (FIGMA FRAME 3)</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase tracking-tight">
            The Same Verdict You Saw on <span className="text-[#FF006E]">TikTok</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl mx-auto font-normal">
            Upload the receipt. Our ruthless vision AI breaks down the cringe in seconds.
          </p>

          {/* Scenario Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(scenario)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeScenario.id === scenario.id
                    ? 'bg-[#FF006E] text-white font-bold shadow-[0_0_15px_rgba(255,0,110,0.5)]'
                    : 'bg-[#18181B] text-neutral-400 hover:text-white border border-[#27272A]'
                }`}
              >
                {scenario.title}
              </button>
            ))}
          </div>
        </div>

        {/* The Verdict Card (Figma Frame 3 Spec) */}
        <div className="max-w-xl mx-auto bg-[#141414] border-2 border-[#FF006E] rounded-3xl p-5 sm:p-7 shadow-[0_0_40px_rgba(255,0,110,0.25)] relative overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute top-4 right-5 text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></span>
            <span>RATED BY ONREAD • VERIFIED</span>
          </div>

          {/* Fake Chat Snippet Box */}
          <div className="bg-[#0A0A0A] border border-[#27272A] rounded-2xl p-4 mb-5 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F1F23] text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <MessageSquare className="w-3 h-3 text-[#FF006E]" />
                <span>EVIDENCE SCREENSHOT</span>
              </span>
              <span>OCR: EXTRACTED</span>
            </div>

            <div className="space-y-2 pt-1 text-xs sm:text-sm">
              {activeScenario.chatSnippet.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'you' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm ${
                      msg.sender === 'you'
                        ? 'bg-[#FF006E]/20 border border-[#FF006E]/40 text-white rounded-br-none'
                        : 'bg-[#222226] text-neutral-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 mt-0.5 px-1">
                    <span>{msg.time}</span>
                    {msg.status && <span className="text-[#FF006E]">• {msg.status}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Aura Score Big Meter */}
          <div className="bg-[#0A0A0A] border border-[#FF2D2D]/40 rounded-2xl p-5 mb-4 text-center relative overflow-hidden shadow-[0_0_20px_rgba(255,45,45,0.15)]">
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
              FINAL VERDICT
            </div>
            <div className="font-display font-black text-5xl sm:text-6xl text-[#FF2D2D] tracking-tight neon-text-red">
              {activeScenario.score}
            </div>
            <div className="inline-block mt-2 px-3 py-0.5 rounded-full bg-[#FF2D2D]/15 border border-[#FF2D2D]/40 text-[#FF2D2D] text-xs font-mono font-bold tracking-wider">
              💀 {activeScenario.tier}
            </div>
          </div>

          {/* TL;DR Section */}
          <div className="bg-[#191919] border border-[#2A2A2A] rounded-xl p-4 mb-3">
            <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1">
              TL;DR
            </div>
            <p className="text-sm text-neutral-200 leading-snug">
              {activeScenario.tldr}
            </p>
          </div>

          {/* The Brutal Roast Section */}
          <div className="bg-[#191919] border border-[#BC13FE]/40 rounded-xl p-4 mb-4 relative shadow-[0_0_15px_rgba(188,19,254,0.1)]">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#BC13FE] uppercase tracking-wider mb-1">
              <span>🔥 THE ROAST</span>
              <span className="text-[10px] text-neutral-400">GPT-4o Vision</span>
            </div>
            <p className="text-sm sm:text-base text-white font-medium italic leading-snug">
              &ldquo;{activeScenario.roast}&rdquo;
            </p>
          </div>

          {/* Red Flags Grid */}
          <div className="bg-[#191919] border border-[#2A2A2A] rounded-xl p-4 mb-4">
            <div className="text-[11px] font-mono font-bold text-[#FF2D2D] uppercase tracking-wider mb-2">
              🚩 RED FLAGS DETECTED
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeScenario.redFlags.map((flag, idx) => (
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

          {/* Action Plan */}
          <div className="bg-[#191919] border border-[#39FF14]/30 rounded-xl p-4 mb-5">
            <div className="text-[11px] font-mono font-bold text-[#39FF14] uppercase tracking-wider mb-1.5">
              ⚡ IMMEDIATE ACTION PLAN
            </div>
            <ul className="space-y-1 text-xs text-neutral-300 font-mono">
              {activeScenario.actionPlan.map((plan, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#39FF14]">✔</span>
                  <span>{plan}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Card CTA */}
          <Link href="/check" className="block w-full">
            <button
              type="button"
              className="w-full py-3.5 px-4 rounded-xl bg-[#FF006E] hover:bg-[#ff1a7d] text-white font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,0,110,0.4)] cursor-pointer"
            >
              <Flame className="w-4 h-4" />
              <span>Check Your Own Screenshot Now</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
