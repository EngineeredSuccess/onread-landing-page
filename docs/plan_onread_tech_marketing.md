# OnRead: Dev & Marketing Plan
**Date:** Aug 17, 2026

---

## 1. Tech Stack (Target MVP)
Built for speed, flexibility, and "ship fast, break things later" energy.

*   **Mobile:** React Native (Expo) — one codebase, iOS + Android, native access (haptics, camera roll)
*   **Landing Page / Web:** Next.js on Vercel. SEO-ready, fast, social-traffic optimized
*   **Backend, Auth, DB:** Supabase — auth (Apple/Google Sign-In), Postgres for Aura Check history
*   **AI Engine:** OpenAI API (GPT-4o Vision). Strict system prompt = ruthless, sarcastic "Aura Judge" that outputs clean JSON
*   **Payments:** Stripe (subscriptions + one-off Aura Check packs)

---

## 2. Marketing Strategy: Painted Door Test
Validate demand *before* writing a single line of app code. Fake it 'til you make it.

*   **Main Goal:** Build a waitlist. Drive TikTok/IG traffic → simple landing page → email capture
*   **Video Format:** POV skits of cringe texting moments ("left on read," "double text energy," "kropka nienawiści"). Then fake the OnRead upload + brutal AI roast
*   **Production Stack:**
    *   **Figma:** 2-3 high-fidelity mocks (neon, aggressive UI, Aura counter)
    *   **CapCut:** Screen recordings of real chats + mockups + glitch/scan SFX
    *   **CaptionFlow (captionflow.xyz):** Auto-gen dynamic, aggressive word-by-word captions — essential for Gen Z retention on TT/Reels

---

## 3. Core User Flow (The Happy Path)
1.  **Trigger:** User gets burned in chat (ghosted, dry replies, red flag detected)
2.  **Action:** Screenshot → share to OnRead
3.  **Aura Check:** Vision AI reads image, extracts text, judges via system prompt
4.  **Verdict:** Structured JSON → Aura Score, TL;DR, Brutal Roast, Red Flags Found, Action Plan
5.  **Share:** Generate a fire visual card → post to IG Stories / send to group chat / flex on TikTok

---

## 4. Legal & Compliance (Non-Negotiable)
**This is the "don't get sued / shut down" section. Do not skip.**

*   **Consent & Privacy:** ToS must state: *you only upload screenshots you have permission to share*. No exceptions. GDPR/CCPA compliant from day one.
*   **Content Moderation Pipeline:** Auto-scan uploads for CSAM, doxxing, PII, threats. Flag → human review → ban. OpenAI moderation API + custom rules.
*   **Data Retention:** Screenshots deleted after processing (default). History stores *text summary + verdict only*, not images. User can purge account anytime.
*   **Liability Shield:** Clear disclaimer: "AI roasts are entertainment, not legal/relationship advice. OnRead not responsible for feelings hurt or relationships ended."
*   **Age Gate:** 17+ (mature humor, potential explicit content in chats). App Store / Play Store rating aligned.

---

## 5. AI Economics & Monetization (How We Survive)
**GPT-4o Vision costs real money. Every check = API call. Math must work.**

*   **Cost Estimate:** ~$0.01–0.03 per image (input tokens + output). At scale, this adds up fast.
*   **Credit System:** 
    *   Free tier: 3 Aura Checks / week (burn rate control)
    *   Pro: $4.99/mo → unlimited checks + priority queue + exclusive roast styles
    *   Packs: $1.99 for 10 checks (one-off, no sub commitment)
*   **Rate Limiting:** Hard cap per user/IP. Prevents abuse + keeps costs predictable.
*   **Stripe Setup:** Subscription + one-time purchases. Webhook → Supabase → update user tier/credits instantly.
*   **Unit Economics Target:** LTV > 3x CAC. Track: cost per check, conversion free→paid, churn.

---

## 6. Retention & Engagement Loops (Why They Come Back)
Virality gets them in. Loops keep them.

*   **Aura Score History:** "Your texting is getting worse 📉" — weekly trend line, shareable
*   **Weekly Roast Recap:** "Top 3 red flags you caught this week" push notification
*   **Friend Leaderboards:** Compare Aura Scores with contacts (opt-in). "You're 2nd worst in the group chat"
*   **Streak Mechanics:** "7 days of catching red flags" → unlock exclusive roast persona (e.g., "British Auntie," "Disappointed Dad")
*   **Roast Styles:** Rotate personas — keep it fresh, give reason to check daily

---

## 7. Viral Growth Mechanics (Built-In, Not Bolted On)
*   **Invite-Only Beta:** FOMO > open access. "3 invites per user" → waitlist becomes status
*   **"Roast a Friend" Flow:** User sends roast card → friend gets push "Someone thinks your texts are mid" → they download to see/retaliate
*   **TikTok/Reels Templates:** Pre-made CapCut templates for users to stitch their results. "POV: OnRead exposed me"
*   **Share Card = Ad:** Every shared card has subtle "Rated by OnRead" watermark + app store QR

---

## 8. Competitive Moat (Why Clones Die)
*   **Network Effect:** Friend leaderboards + "roast a friend" = value grows with users
*   **Proprietary Aura Score:** Not just "funny" — weighted algorithm (response time, sentiment, red flag density). Hard to copy well.
*   **Community Features:** User-submitted roast styles, voted on. Best ones get added officially.
*   **Brand Voice:** The "ruthless bestie" tone is IP. Consistency across AI, push, social, support.

---

## 9. Phased Roadmap (Scope Discipline)
### MVP (v1) — *Ship This First*
- Screenshot upload → Vision AI → JSON verdict → shareable card
- Auth (Supabase), 3 free checks/week, basic landing page + waitlist
- **No:** history, leaderboards, payments, invites, multiple personas

### v2 — *Retention & Revenue*
- Aura Score history + trends
- Pro tier (Stripe) + credit packs
- Weekly recap push
- 3 roast personas

### v3 — *Social & Scale*
- Friend leaderboards + "roast a friend"
- Invite system
- User-submitted personas
- Localization (EN/PL/ES first)

---

## 10. Risk Mitigation (Things That Kill You)
*   **AI Hallucination / Misread:** "This roast was off" button → logs bad output → fine-tunes prompt / adds few-shot examples
*   **OpenAI Outage:** Fallback to Anthropic Claude 3.5 Sonnet (Vision) — pre-tested prompt parity
*   **Moderation Fail:** Auto-escalation to human review queue. 24h SLA for appeals.
*   **Cost Spike:** Hard monthly spend cap on OpenAI key. Alerts at 50%/80%/95%.

---

## 11. Success Metrics (KPIs — Track or Die)
| Metric | Target (First 90 Days) |
|--------|------------------------|
| Waitlist → Download Conversion | >25% |
| D1 Retention | >40% |
| D7 Retention | >15% |
| Share Rate (checks → story/share) | >30% |
| Cost per Aura Check | <$0.02 |
| Free → Paid Conversion | >5% |
| Monthly Burn (AI + Infra) | <$2k pre-revenue |

---

**Bottom Line:** Ship MVP in 3 weeks. Validate with painted door *now*. Legal + monetization baked in from day one. Everything else is noise until you have 1k weekly active users roasting their friends.