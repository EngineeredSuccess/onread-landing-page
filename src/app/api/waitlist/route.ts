import { NextRequest, NextResponse } from 'next/server';
import { addWaitlistEmail } from '@/lib/supabase';
import { addContactToResend } from '@/lib/resend';

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

    // 1. Record contact and trigger confirmation email via Resend
    let resendResult = null;
    if (process.env.RESEND_API_KEY) {
      resendResult = await addContactToResend(trimmedEmail, source || 'landing_page');
    } else {
      console.log('[Waitlist API] No RESEND_API_KEY configured.');
    }

    // 2. Record into Supabase / Mock fallback
    const dbResult = await addWaitlistEmail(trimmedEmail, source || 'landing_page', userAgent);

    return NextResponse.json(
      {
        success: true,
        message: dbResult.isDuplicate
          ? "You're already on the VIP waitlist! We'll notify you first."
          : "You're on the list. Prepare your receipts, we drop soon. +100 Aura for moving fast. 💀",
        isDuplicate: dbResult.isDuplicate,
        auraBonus: 100,
        resend: resendResult ? {
          emailSent: resendResult.emailSent,
          emailId: resendResult.emailId,
          error: resendResult.emailError,
        } : null,
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
