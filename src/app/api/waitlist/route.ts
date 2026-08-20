import { NextRequest, NextResponse } from 'next/server';
import { addWaitlistEmail } from '@/lib/supabase';
import { addContactToResend, isResendConfigured } from '@/lib/resend';

// RFC 5322 compliant email regex simplified
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 254) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 422 }
      );
    }

    const userAgent = req.headers.get('user-agent') || undefined;

    // 1. Record into Resend if configured
    if (isResendConfigured) {
      await addContactToResend(trimmedEmail, source || 'landing_page');
    }

    // 2. Record into Supabase / Mock fallback
    const result = await addWaitlistEmail(trimmedEmail, source || 'landing_page', userAgent);

    return NextResponse.json(
      {
        success: true,
        message: result.isDuplicate
          ? "You're already on the VIP waitlist! We'll notify you first."
          : "You're on the list. Prepare your receipts, we drop soon. +100 Aura for moving fast. 💀",
        isDuplicate: result.isDuplicate,
        auraBonus: 100,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
    console.error('Waitlist API error:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}
