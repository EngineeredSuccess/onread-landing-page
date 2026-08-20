import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

// In-memory mock storage for development/preview when keys are not configured yet
const mockWaitlist: Array<{ email: string; createdAt: string; id: string }> = [];

export async function addWaitlistEmail(email: string, source: string = 'organic', userAgent?: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (isSupabaseConfigured && supabase) {
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
        return { success: true, isDuplicate: true, message: "You're already registered! Keep your notifications on." };
      }
      throw new Error(error.message);
    }

    return { success: true, isDuplicate: false, data };
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
