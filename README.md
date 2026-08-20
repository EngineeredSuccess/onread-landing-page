# OnRead — Painted Door Waitlist Landing Page

> **Stop Overthinking. Start Checking.**
> The brutally honest AI judge for your toxic group chats and dating app disasters. Drop the screenshot, get your Aura Score.

[![Built with Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)

---

## ⚡ Features

- **Mobile-First Funnel:** Optimized for 99% mobile traffic coming from TikTok and Instagram link-in-bio.
- **Neon Brutalism UI:** Deep pitch black (`#0A0A0A`), Neon Pink (`#FF006E`), Neon Green (`#39FF14`), and Neon Purple (`#BC13FE`).
- **Interactive Judgement Chamber:** Live toggleable chat disaster breakdowns with `-10,000 Aura` verdict cards and GPT-4o Vision roasts.
- **Instant Waitlist Form:** Email regex validation, real-time feedback, celebratory confetti, and unique referral share links.
- **Supabase Ready:** Built-in Postgres schema (`supabase/schema.sql`) with automatic Mock Store fallback during development.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Setup Supabase (Optional)

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Run the SQL statements from [`supabase/schema.sql`](supabase/schema.sql) in your Supabase SQL Editor.
3. Copy `.env.example` to `.env.local` and add your API credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub.
2. Import repository into [Vercel](https://vercel.com).
3. Add the environment variables from `.env.example` if connecting to live Supabase.
4. Deploy!
