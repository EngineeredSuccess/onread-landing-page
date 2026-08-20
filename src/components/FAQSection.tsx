'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Will my screenshots be kept or leaked?',
    a: 'No. Screenshots are processed in real-time by GPT-4o Vision to extract text and analyze dynamics, then immediately purged from memory. Your toxic chats stay private.',
  },
  {
    q: 'How brutal is the AI really?',
    a: 'It does not give fake sympathy. If you are double-texting someone who left you on delivered for 12 hours, OnRead will deduct your Aura points and give you an immediate tactical exit strategy.',
  },
  {
    q: 'How much does it cost to use?',
    a: 'Waitlist members in Drop #01 receive 3 free Aura checks every week forever, plus a +100 Aura bonus at launch.',
  },
  {
    q: 'When is Drop #01 going live?',
    a: 'Invitations roll out in batches to the first 500 waitlist signups as soon as the beta doors open. Move fast before all 500 spots are taken.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#0E0E0E] border-t border-[#1F1F23]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono text-neutral-400 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF006E]" />
            <span>RAW ANSWERS</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase tracking-tight">
            Frequently Asked <span className="text-[#FF006E]">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#141414] border border-[#242428] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-display font-bold text-base sm:text-lg text-white hover:text-[#FF006E] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#FF006E]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-neutral-300 font-normal leading-relaxed border-t border-[#1F1F23] pt-3 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
