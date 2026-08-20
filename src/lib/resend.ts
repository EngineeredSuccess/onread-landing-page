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
    // 1. Add contact to Resend Audiences
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
      console.warn('Resend contacts warning:', contactError.message);
    } else {
      console.log('Resend contact created successfully:', contactData?.id);
    }

    // 2. Send OnRead VIP Confirmation Email
    // Uses RESEND_FROM_EMAIL if set (e.g. "OnRead <judge@yourdomain.com>"), otherwise falls back to Resend testing sender
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'OnRead <onboarding@resend.dev>';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onread.app';

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: normalizedEmail,
      subject: "💀 You're in Drop #01 — OnRead Aura Judge",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OnRead Drop #01 Confirmation</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #050505; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 16px;">
              <tr>
                <td align="center">
                  <!-- Container -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background-color: #0F0F12; border: 2px solid #FF006E; border-radius: 16px; overflow: hidden; box-shadow: 0 0 35px rgba(255, 0, 110, 0.25);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 28px 32px 20px 32px; background: linear-gradient(180deg, rgba(255,0,110,0.12) 0%, rgba(15,15,18,0) 100%); border-bottom: 1px solid #222228;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td>
                              <span style="font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF; text-transform: uppercase;">
                                ON<span style="color: #FF006E;">READ</span>
                              </span>
                            </td>
                            <td align="right">
                              <span style="font-family: monospace; font-size: 11px; font-weight: 700; background-color: rgba(255,0,110,0.15); border: 1px solid rgba(255,0,110,0.4); color: #FF006E; padding: 4px 8px; border-radius: 4px; text-transform: uppercase;">
                                DROP #01 VIP
                              </span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                      <td style="padding: 32px;">
                        <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 800; text-transform: uppercase; color: #FFFFFF; letter-spacing: -0.5px;">
                          You're on the list.
                        </h1>

                        <!-- Aura Bonus Pill -->
                        <div style="display: inline-block; background-color: rgba(57,255,20,0.1); border: 1px solid rgba(57,255,20,0.3); padding: 6px 12px; border-radius: 6px; margin: 12px 0 20px 0;">
                          <span style="font-family: monospace; font-size: 13px; font-weight: 800; color: #39FF14; letter-spacing: 0.5px;">
                            +100 AURA BONUS CLAIMED ⚡
                          </span>
                        </div>

                        <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #D0D0D5;">
                          Your spot has been logged into the priority queue for <strong style="color: #FFFFFF;">Drop #01</strong>. We are only granting access to the first 500 waitlist entries before the beta gates close.
                        </p>

                        <!-- Brutal Quote Box -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #16161B; border-left: 4px solid #BC13FE; border-radius: 4px 8px 8px 4px; margin: 24px 0;">
                          <tr>
                            <td style="padding: 16px;">
                              <p style="margin: 0 0 6px 0; font-family: monospace; font-size: 11px; font-weight: 700; color: #BC13FE; text-transform: uppercase;">
                                🔥 PRE-FLIGHT VERDICT
                              </p>
                              <p style="margin: 0; font-size: 14px; font-style: italic; color: #F0F0F5; line-height: 1.5;">
                                &ldquo;Your friend told you they were 'just busy with work'. Our AI is going to tell you they just don't care. Prepare your receipts.&rdquo;
                              </p>
                            </td>
                          </tr>
                        </table>

                        <!-- What Happens Next -->
                        <h3 style="margin: 24px 0 12px 0; font-size: 14px; font-family: monospace; color: #888899; text-transform: uppercase; letter-spacing: 1px;">
                          What to expect next:
                        </h3>
                        
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                          <tr>
                            <td style="padding: 6px 0; font-size: 14px; color: #C5C5CE;">
                              <span style="color: #39FF14; font-weight: bold; margin-right: 8px;">1.</span> Keep your notifications on for the Drop #01 invite code.
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; font-size: 14px; color: #C5C5CE;">
                              <span style="color: #39FF14; font-weight: bold; margin-right: 8px;">2.</span> Gather your most toxic screenshots, double-texts, and dating disasters.
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; font-size: 14px; color: #C5C5CE;">
                              <span style="color: #39FF14; font-weight: bold; margin-right: 8px;">3.</span> Get your ruthless Aura Score breakdown and share the roast.
                            </td>
                          </tr>
                        </table>

                        <!-- CTA Button -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td align="center">
                              <a href="${siteUrl}" target="_blank" style="display: block; width: 100%; box-sizing: border-box; background-color: #FF006E; color: #FFFFFF; font-weight: 800; font-size: 15px; text-transform: uppercase; text-decoration: none; padding: 16px 24px; border-radius: 10px; text-align: center; box-shadow: 0 0 20px rgba(255, 0, 110, 0.4);">
                                Visit OnRead & Share Invite →
                              </a>
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 20px 32px 28px 32px; background-color: #0A0A0C; border-top: 1px solid #1A1A22; text-align: center;">
                        <p style="margin: 0 0 8px 0; font-family: monospace; font-size: 11px; color: #666675; line-height: 1.5;">
                          OnRead AI roasts are generated for entertainment and satirical purposes. Screenshots are processed via vision OCR and deleted immediately after scoring.
                        </p>
                        <p style="margin: 0; font-family: monospace; font-size: 11px; color: #555562;">
                          © ${new Date().getFullYear()} OnRead • All rights reserved.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (emailError) {
      console.error('Resend confirmation email error:', emailError);
      return { success: true, emailSent: false, error: emailError.message };
    }

    console.log('Resend confirmation email sent successfully. ID:', emailData?.id);
    return { success: true, emailSent: true, emailId: emailData?.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown Resend error';
    console.error('Resend service exception:', errorMsg);
    return { success: false, error: errorMsg };
  }
}
