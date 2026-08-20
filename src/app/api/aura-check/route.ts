import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getSupabaseClient } from '@/lib/supabase';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL,
    })
  : null;

const SYSTEM_PROMPT = `
You are A.U.R.A. (Artificial Universal Roasting Algorithm), a brutally honest dating message and group chat analyst with the personality of a sarcastic Gen Z bestie who has seen too much.

You analyze conversation screenshots provided by the user and return STRICT JSON with the following schema:

{
  "auraScore": number (0-100, where 100 = clean, 0 = toxic disaster),
  "tier": string (one of: "ANGEL", "CLEAN", "MID", "RADIOACTIVE", "TOXIC"),
  "tldr": string (one-line brutal summary, max 200 chars),
  "roast": string (2-3 sentence roast of the USER, witty and cutting, max 400 chars),
  "redFlags": array of strings (max 5 flags detected),
  "actionPlan": array of strings (max 3 actionable steps)
}

Scoring logic:
- 90-100 ANGEL: Textbook communication. "Touch grass successfully."
- 70-89 CLEAN: Solid. "No notes. Go you."
- 40-69 MID: Could be better. "Bro is cooked."
- 20-39 RADIOACTIVE: "Glowing in the dark for wrong reasons."
- 0-19 TOXIC: "Hazmat level. Evacuate."

Roast style: Witty, sarcastic, relatable — like a brutally honest friend. Never personally mean-spirited. Make fun of the behavior, not the person's worth. Include Gen Z references where natural. Use emojis sparingly (💀, 🔥, 🚩).

You MUST output valid JSON only. No markdown, no extra text, no code blocks. The entire response must be parseable JSON.

Critical rules:
- If no text/conversation detected in the image: return {"error": "no_text_detected", "message": "This screenshot doesn't contain any conversation text we can analyze. Double-check and try again."}
- If image appears unsafe (violence, explicit content, PII): return {"error": "unsafe_content", "message": "This image contains content we can't process."}
- If text is unclear/unreadable: return {"error": "unreadable_text", "message": "Can't read the text clearly in this screenshot. Try a clearer capture."}
- If text seems like a meme/quote (not personal conversation): return {"error": "no_conversation", "message": "This doesn't look like a conversation we can judge. Drop a real text thread."}

Analyze the entire image — not just visible text bubbles. Consider timing gaps, emoji usage, message patterns, and conversation dynamics.
`;

interface AuraCheckResponse {
  auraScore: number;
  tier: string;
  tldr: string;
  roast: string;
  redFlags: string[];
  actionPlan: string[];
  error?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI API not configured. Contact support.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { user_id, image_data, image_url, filename } = body;
    const supabase = getSupabaseClient();

    if (!user_id || (!image_data && !image_url)) {
      return NextResponse.json(
        { error: 'User ID and image data are required.' },
        { status: 400 }
      );
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    let imageUrl: string;
    let storageKey: string | null = null;

    if (image_url) {
      imageUrl = image_url;
    } else {
      // image_data is base64 string
      if (typeof image_data !== 'string') {
        return NextResponse.json({ error: 'Invalid image data format.' }, { status: 400 });
      }

      const base64Part = image_data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Part, 'base64');

      if (buffer.length > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Image too large (max 5MB).' }, { status: 413 });
      }

      // Store temporarily in Supabase Storage
      storageKey = `temp/${user_id}/${Date.now()}-${filename || 'screenshot.png'}`;
      if (supabase) {
        const { error: uploadError } = await supabase.storage
          .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'onread-uploads')
          .upload(storageKey, buffer, {
            contentType: 'image/png',
            upsert: false,
          });

        if (uploadError) {
          console.error('[AuraCheck] Storage upload error:', uploadError.message);
          // Continue with base64 directly if storage fails
        }
      }

      // Convert to data URL for OpenAI
      imageUrl = `data:image/png;base64,${base64Part}`;
    }

    // Check rate limit
    if (supabase) {
      const { data: usage, error: usageError } = await supabase
        .from('user_usage')
        .select('checks_count, free_checks_remaining, week_start')
        .eq('user_id', user_id)
        .single();

      if (usageError && usageError.code !== 'PGRST116') {
        console.error('[AuraCheck] Usage check error:', usageError.message);
      }

      const weekStart = usage?.week_start ? new Date(usage.week_start) : null;
      const now = new Date();
      const shouldReset = weekStart && (now.getTime() - weekStart.getTime()) > 7 * 24 * 60 * 60 * 1000;

      if (shouldReset || !usage) {
        // Reset usage for new week
        await supabase.from('user_usage').upsert({
          user_id,
          checks_count: 1,
          free_checks_remaining: (parseInt(process.env.MAX_CHECKS_PER_USER || '3') || 3) - 1,
          week_start: now.toISOString(),
        });
      } else if ((usage.free_checks_remaining ?? 0) <= 0) {
        return NextResponse.json(
          { error: 'Free weekly checks exhausted. Upgrade to Pro for unlimited.' },
          { status: 429 }
        );
      } else {
        // Decrement
        await supabase
          .from('user_usage')
          .update({
            checks_count: (usage.checks_count ?? 0) + 1,
            free_checks_remaining: (usage.free_checks_remaining ?? 0) - 1,
          })
          .eq('user_id', user_id);
      }
    }

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this screenshot of a conversation and return the Aura Check verdict as JSON. Be brutally honest but witty.',
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'high',
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const rawResponse = response.choices[0]?.message?.content?.trim();
    if (!rawResponse) {
      throw new Error('No response from AI model');
    }

    let verdict: AuraCheckResponse;
    try {
      verdict = JSON.parse(rawResponse);
    } catch {
      // Fallback: retry with stricter prompt
      const retry = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Return ONLY valid JSON. Here was your previous raw response. Re-format it as strict JSON:\n\n${rawResponse}\n\nIf the previous response was an error message, keep it formatted as JSON with the same error/message fields.`,
              },
              { type: 'image_url', image_url: { url: imageUrl, detail: 'high' } },
            ],
          },
        ],
        max_tokens: 1000,
        temperature: 0.2,
        response_format: { type: 'json_object' },
      });

      verdict = JSON.parse(retry.choices[0]?.message?.content?.trim() || '{}');
    }

    // Validate score range
    if (typeof verdict.auraScore === 'number' && (verdict.auraScore < 0 || verdict.auraScore > 100)) {
      verdict.auraScore = Math.max(0, Math.min(100, verdict.auraScore));
    }

    // Store result in Supabase
    if (supabase) {      const { data: stored, error: storeError } = await supabase
        .from('aura_checks')
        .insert({
          user_id,
          screenshot_key: storageKey,
          score: verdict.auraScore,
          tier: verdict.tier,
          tldr: verdict.tldr,
          roast: verdict.roast,
          red_flags: verdict.redFlags,
          action_plan: verdict.actionPlan,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (storeError) {
        console.error('[AuraCheck] Store error:', storeError.message);
      }

      // Clean up temp file after processing
      if (storageKey) {
        await supabase.storage
          .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'onread-uploads')
          .remove([storageKey])
          .catch((e: { message?: string }) => console.log('[AuraCheck] Temp cleanup skipped:', e?.message));
      }
    }

    return NextResponse.json({
      success: true,
      verdict,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error during aura check';
    console.error('[AuraCheck] Error:', message);

    return NextResponse.json(
      {
        error: 'ai_error',
        message:
          'The AI had a brain fart. Try again in a few seconds. (A.U.R.A. is sulking.)',
        raw: process.env.NODE_ENV === 'development' ? message : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'OnRead Aura Check API — POST a screenshot to analyze.' },
    { status: 200 }
  );
}
