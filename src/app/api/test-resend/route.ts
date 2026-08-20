import { NextRequest, NextResponse } from 'next/server';
import { addContactToResend } from '@/lib/resend';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({
      error: 'Please pass an email in the query parameters, e.g. /api/test-resend?email=your-email@example.com',
      envStatus: {
        hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
        resendApiKeyPrefix: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.slice(0, 7) + '...' : null,
        resendFromEmail: process.env.RESEND_FROM_EMAIL || 'OnRead <onboarding@resend.dev> (default)',
        resendAudienceId: process.env.RESEND_AUDIENCE_ID || null,
      },
    });
  }

  const result = await addContactToResend(email, 'test_endpoint');

  return NextResponse.json({
    message: 'Test email execution completed',
    targetEmail: email,
    envStatus: {
      hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
      resendApiKeyPrefix: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.slice(0, 7) + '...' : null,
      resendFromEmail: process.env.RESEND_FROM_EMAIL || 'OnRead <onboarding@resend.dev> (default)',
      resendAudienceId: process.env.RESEND_AUDIENCE_ID || null,
    },
    result,
  });
}
