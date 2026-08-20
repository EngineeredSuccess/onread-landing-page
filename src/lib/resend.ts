import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
const audienceId = process.env.RESEND_AUDIENCE_ID || '';

export const isResendConfigured = Boolean(resendApiKey);

export const resend = isResendConfigured ? new Resend(resendApiKey) : null;

export async function addContactToResend(email: string, source: string = 'landing_page') {
  if (!resend) {
    return { success: false, message: 'Resend API key not configured' };
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    // 1. Add or update contact in Resend
    // Supports both specific audienceId (if set) and default audience
    const payload: {
      email: string;
      unsubscribed: boolean;
      audienceId?: string;
    } = {
      email: normalizedEmail,
      unsubscribed: false,
    };

    if (audienceId) {
      payload.audienceId = audienceId;
    }

    const { data: contactData, error: contactError } = await resend.contacts.create(payload);

    if (contactError) {
      console.warn('Resend contacts create warning:', contactError);
    }

    // 2. Optional: Send Welcome / Confirmation Email if RESEND_FROM_EMAIL is set
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (fromEmail) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: normalizedEmail,
          subject: "💀 You're in Drop #01 — OnRead Aura Judge",
          html: `
            <div style="background-color: #0A0A0A; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px; border-radius: 12px; max-width: 520px; margin: 0 auto; border: 1px solid #FF006E;">
              <h1 style="color: #FF006E; font-size: 26px; margin-bottom: 8px; text-transform: uppercase;">You're on the list.</h1>
              <p style="color: #39FF14; font-weight: bold; font-family: monospace; font-size: 14px;">+100 AURA BONUS CLAIMED ⚡</p>
              <p style="color: #E0E0E0; font-size: 15px; line-height: 1.6; margin-top: 16px;">
                Prepare your most toxic screenshots and dating app disasters. We are opening the doors to the first 500 waitlist members soon.
              </p>
              <div style="background-color: #141414; border: 1px solid #282828; padding: 16px; border-radius: 8px; margin: 24px 0;">
                <p style="margin: 0; color: #BC13FE; font-style: italic; font-size: 14px;">
                  "Bro really thought sending a 3rd text would fix it 💀"
                </p>
              </div>
              <p style="color: #888888; font-size: 12px; font-family: monospace; margin-top: 24px;">
                OnRead Drop #01 • Priority Queue Confirmed
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn('Resend welcome email failed to send (check verified domain):', emailErr);
      }
    }

    return { success: true, contactData };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown Resend error';
    console.error('Resend service error:', errorMsg);
    return { success: false, error: errorMsg };
  }
}
