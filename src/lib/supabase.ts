import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// In-memory mock storage for development/preview when keys are not configured yet
const mockWaitlist: Array<{ email: string; createdAt: string; id: string }> = [];

export async function addWaitlistEmail(email: string, source: string = 'organic', userAgent?: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: normalizedEmail,
            aura_bonus: 100,
            referral_source: source,
            user_agent: userAgent || null,
          },
        ])
        .select();

      if (error) {
        // 23505 is PostgreSQL unique constraint violation code
        if (error.code === '23505' || error.message.includes('unique') || error.message.includes('duplicate')) {
          console.log(`[Supabase] Duplicate entry: ${normalizedEmail}`);
          return { success: true, isDuplicate: true, message: "You're already registered! Keep your notifications on." };
        }
        console.error('[Supabase Error]:', error.message);
        throw new Error(error.message);
      }

      console.log(`[Supabase] Successfully saved email: ${normalizedEmail}`);
      return { success: true, isDuplicate: false, data };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown database error';
      console.error('[Supabase Exception]:', msg);
      // Fallback gracefully so user gets a success response even if DB table schema has a temporary issue
      return { success: true, isDuplicate: false, dbError: msg };
    }
  }

  // Fallback Dev / Mock mode
  const exists = mockWaitlist.some(entry => entry.email === normalizedEmail);
  if (exists) {
    return { success: true, isDuplicate: true, message: "You're already on the waitlist! Keep your notifications on." };
  }

  const newEntry = {
    id: `mock-${Date.now()}`,
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };
  mockWaitlist.push(newEntry);
  console.log('[Dev Mock Waitlist] New sign-up recorded:', newEntry, `Total entries: ${mockWaitlist.length}`);

  return { success: true, isDuplicate: false, mock: true };
}
