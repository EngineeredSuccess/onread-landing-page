# OnRead — MVP Development Plan
**Goal:** Ship fastest path from screenshot → AI roast → shareable card

---

## MVP Scope (v1 — 3 weeks)

✅ In scope | ❌ Out of scope

| Feature | Status | Why |
|---------|--------|-----|
| Landing page + waitlist | ✅ | Validation first |
| Auth (Supabase) | ✅ | Required for usage tracking |
| Screenshot upload | ✅ | Core flow |
| AI analysis (GPT-4o) | ✅ | Core flow |
| Verdict card display | ✅ | Product output |
| Share to social | ✅ | Viral distribution |
| Aura Score history | ❌ | v2 feature |
| Friend leaderboards | ❌ | v2 feature |
| Paid subscriptions | ❌ | v2 feature |
| Invite system | ❌ | v2 feature |
| Multiple AI personas | ❌ | v2 feature |
| Mobile app (React Native) | ❌ | Web-only v1 |

---

## Tech Stack (Build-Ready)

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | **Next.js 15 (App Router)** | SSR, SEO, API routes for AI calls |
| Styling | **Tailwind CSS** | Rapid neon brutalism, matches Figma design |
| Backend | **Supabase** | Auth + DB + Storage, already in plan |
| Database | **Supabase Postgres** | Aura results, waitlist, user sessions |
| Auth | **Supabase Auth** | Apple/Google Sign-In, email capture |
| File Storage | **Supabase Storage** | Screenshot uploads (temp, for processing only) |
| AI Engine | **OpenAI API (GPT-4o)** | Vision + structured JSON output |
| Hosting | **Vercel (hobby plan)** | Free, fast, Git integration |
| Analytics | **PostHog** | Free self-hosted product analytics |
| Feedback | **GitHub Issues** | Track bugs, feature requests |

---

## Week-by-Week Plan

### Week 1: Foundation + Landing Page
**Goal:** Deploy live landing page with waitlist + auth

- [ ] Initialize Next.js project (`npx create-next-app@latest`)
- [ ] Set up Tailwind CSS (neon palette from design system)
- [ ] Create `plan_onread_tech_marketing.md` → update with current plan
- [ ] Build landing page (`/`) — hero, problem hooks, Figma mockup screenshots
- [ ] Integrate Supabase (project + SDK init)
- [ ] Build waitlist form → store emails in Supabase `waitlist` table
- [ ] Implement passwordless auth (email link, Apple/Google)
- [ ] Deploy to Vercel + connect to GitHub
- [ ] Set up PostHog for event tracking

**Deliverable:** `onread.app` live with waitlist capture
**Success Metric:** 100 sign-ups from landing page

### Week 2: Core Upload + AI Pipeline
**Goal:** Full screenshot → verdict → card flow

- [ ] Build upload interface (`/dashboard`)
  - Drag-drop zone (matches Figma mockup)
  - File validation: JPG/PNG only, max 10MB, <5MB recommended
  - Real-time preview thumbnail
- [ ] Backend API route (`/api/aura-check`)
  - Auth required
  - Upload screenshot to Supabase Storage (temp bucket)
  - Call OpenAI Vision API with system prompt
  - Parse JSON response
  - Store result in `aura_checks` table
- [ ] System Prompt v1 (ruthless Aura Judge persona):
  ```
  You are A.U.R.A. (Artificial Universal Roasting Algorithm), a brutally honest dating message analyst. 
  Analyze the screenshot's conversation and return STRICT JSON:

  {
    "auraScore": 0-100,
    "tier": "TOXIC|CLEAN|MID|RADIOACTIVE|ANGEL",
    "tldr": "one-line summary of what went wrong",
    "roast": "brutal but funny roast (2-3 sentences, roast the user not the other person)",
    "redFlags": ["flag1", "flag2", "flag3"],
    "actionPlan": ["step1", "step2", "step3"]
  }

  You must be sarcastic, witty, and ruthless. No markdown, no extra text, just JSON.
  ```
- [ ] Verdict card component (React) — matches Frame 3 of Figma
- [ ] Rate limiting: 3 free checks per user per week (track in DB)

**Deliverable:** End-to-end flow working — upload → AI → verdict card
**Success Metric:** 15 successful checks from beta users

### Week 3: Polish + Polish + Ship
**Goal:** Production-ready, deployable to beta users

- [ ] Add share functionality (Twitter, Instagram Stories, copy link)
- [ ] Loading states (analyzing progress bar animation)
- [ ] Error handling:
  - AI failure → "The void is silent..." fallback message
  - Image too large → compression or reject
  - No text detected → "This screenshot is blank. Are you sure?"
- [ ] Rate limit UI ("2/3 checks remaining")
- [ ] Mobile responsive (works on phone for testing)
- [ ] Analytics events:
  - `page_view` → `sign_up` → `upload` → `ai_check_complete` → `share`
- [ ] Performance: <3s upload, <5s AI response
- [ ] Security: validate image on backend (not just frontend)
- [ ] Deploy final build to Vercel
- [ ] Beta test with 10-20 people from waitlist

**Deliverable:** Polished MVP live and tested
**Success Metric:** 50% of beta users complete flow + 30% share

---

## Supabase Schema (MVP)

```sql
-- Waitlist (if not using auth yet)
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  source TEXT, -- 'landing', 'referral', etc
  notified BOOLEAN DEFAULT FALSE
);

-- Users (Supabase Auth handles this)
-- Stored in auth.users automatically

-- Aura Checks (the core data)
CREATE TABLE aura_checks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  screenshot_url TEXT, -- temporary, expires
  screenshot_key TEXT, -- storage bucket key
  score INTEGER CHECK (score >= 0 AND score <= 100),
  tier TEXT CHECK (tier IN ('TOXIC', 'CLEAN', 'MID', 'RADIOACTIVE', 'ANGEL')),
  tldr TEXT,
  roast TEXT,
  red_flags JSONB, -- ["flag1", "flag2"]
  action_plan JSONB, -- ["step1", "step2"]
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP GENERATED ALWAYS AS (created_at + INTERVAL '24 hours')
);

-- Rate limiting
CREATE TABLE user_usage (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  checks_count INTEGER DEFAULT 0,
  week_start TIMESTAMP DEFAULT DATE_TRUNC('week', NOW()),
  free_checks_remaining INTEGER DEFAULT 3
);

-- Indexes for performance
CREATE INDEX idx_aura_checks_user ON aura_checks(user_id);
CREATE INDEX idx_aura_checks_created ON aura_checks(created_at DESC);
```

---

## Environment Variables (`.env.local`)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o

# App
NEXTAUTH_URL=https://onread.app
NEXT_PUBLIC_APP_URL=https://onread.app

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Storage
STORAGE_BUCKET=lorem-aura-temp
MAX_FILE_SIZE=5242880  # 5MB
```

---

## API Route: `/api/aura-check`

```typescript
// pages/api/aura-check.ts
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { user_id, screenshot_key, filename } = req.body

  // 1. Rate limit check
  // 2. Get temp URL from Supabase Storage
  // 3. Call OpenAI Vision API
  // 4. Parse + validate JSON
  // 5. Store in DB
  // 6. Delete temp screenshot
  // 7. Return verdict JSON

  // Estimated cost: ~$0.01-0.02 per call
}
```

---

## Figma → Production Mapping

| Figma Frame | React Component | Status |
|-------------|-----------------|--------|
| Upload - Empty | `components/UploadZone.tsx` | Week 2 |
| Upload - Filled | `components/ScreenshotPreview.tsx` | Week 2 |
| Analyzing - 67% | `components/LoadingState.tsx` | Week 2 |
| Verdict - Radioactive | `components/VerdictCard.tsx` | Week 2 |
| Verdict - TOXIC | (same component, variant) | Week 2 |
| Tier badges | `components/TierBadge.tsx` | Week 2 |
| Share Row | `components/ShareRow.tsx` | Week 3 |
| Red Flag chip | `components/RedFlagChip.tsx` | Week 2 |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| OpenAI API changes pricing/breaks | High | Cache prompts, have Claude 3.5 as backup |
| Screenshots contain PII/CSAM | Critical | Auto-moderate with AWS Rekognition or OpenAI moderation |
| AI returns invalid JSON | High | Schema validation + retry logic + fallback template |
| Supabase rate limits | Medium | Monitor usage, optimize queries |
| Vercel cold starts | Low | Keep-alive pings, accept latency |
| Users upload non-text images | Medium | OCR confidence threshold → "Can't find text in this screenshot" |
| Cost overruns (>$200/mo) | High | Per-user rate limit (5 checks/day max), hard API budget cap |

---

## Success Metrics (MVP)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Waitlist signups | 500 | Supabase / PostHog |
| Upload → complete flow | 70% | PostHog funnel |
| D1 retention | 30% | PostHog cohort |
| Share rate (after check) | 40% | PostHog event |
| Cost per check | <$0.02 | OpenAI billing |
| Load time (< 8s) | 95% of users | Vercel Analytics |
| Error rate | <1% | Sentry or log monitoring |

---

## v2+ Roadmap (Post-MVP)

**v2 (2 weeks):** Aura Score history, weekly recaps, push notifications
**v3 (2 weeks):** Pro tier ($4.99/mo), 10-pack purchase, waitlist referral rewards  
**v4 (3 weeks):** Friend leaderboards, "Roast a friend" social features, invite-only expansion
**v5+:** Mobile apps (React Native), multiple AI personas, group chat roasting

---

## Immediate Action Items

1. **Today:** Init Next.js repo in `E:\viral_apps` (`package.json`, Tailwind config)
2. **Today:** Create `/mvp_plan.md` ← this file
3. **Today:** Create `/.env.local.example` with placeholder keys
4. **Today:** Draft landing page component (`components/LandingHero.tsx`)
5. **Tomorrow:** Supabase link + waitlist table migration
6. **Tomorrow:** Deploy first version to Vercel
7. **Day 3:** UploadZone + screenshot handling
8. **Day 4:** OpenAI integration + system prompt
9. **Day 5-7:** Verdict card + full flow polish

---

## One-Pager: The Ask

**Mission:** Ship fastest path from screenshot → AI roast → shareable card  
**Stack:** Next.js + Tailwind + Supabase + OpenAI  
**Timeline:** 3 weeks  
**Budget:** $50 server credit (Vercel Hobby + Supabase free tier)  
**Riskiest piece:** OpenAI Vision API JSON parsing reliability  
**Success signal:** 50 beta users complete flow in first week

*Updated from plan_onread_tech_marketing.md → focus on what ships FIRST.*