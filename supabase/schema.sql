-- OnRead: Waitlist Database Schema
-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    aura_bonus INTEGER DEFAULT 100,
    referral_source TEXT DEFAULT 'organic',
    user_agent TEXT,
    ip_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create index on email and created_at for fast queries and deduplication
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_idx ON public.waitlist (lower(email));
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON public.waitlist (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Allow public anonymous inserts (for landing page signup)
CREATE POLICY "Allow public anonymous waitlist inserts" 
ON public.waitlist 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- 5. RLS Policy: Only service role can view the waitlist entries
CREATE POLICY "Service role can view waitlist" 
ON public.waitlist 
FOR SELECT 
TO service_role 
USING (true);

-- 6. Comment on table
COMMENT ON TABLE public.waitlist IS 'Painted Door waitlist entries for OnRead launch';
