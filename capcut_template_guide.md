# CapCut Template Guide — OnRead Marketing Videos

**Goal:** Create plug-and-play CapCut project templates for all 5 scripts. Change text/images, export, post.

---

## Master Project Structure

```
📁 OnRead_Master_Template
  📁 Assets
    📁 SFX
      📁 transitions/
      📁 messages/
      📁 scan/
      📁 verdict/
      📁 roast/
      📁 score/
    📁 Overlays
      📁 scan_lines/
      📁 glitch/
      📁 vhs_noise/
      📁 terminal/
    📁 Fonts
      📁 SpaceGrotesk-Bold.ttf
      📁 SpaceGrotesk-Medium.ttf
      📁 JetBrainsMono-Regular.ttf
      📁 Inter-Regular.ttf
      📁 Inter-Bold.ttf
    📁 Icons
      📁 red_flag.svg
      📁 instagram.svg
      📁 tiktok.svg
      📁 save.svg
    📁 Backgrounds
      📁 deep_black/
      📁 scan_gradient/
  📁 Timeline Presets
    📄 _01_conversation_preset.cc preset
    📄 _02_phone_reveal_preset.cc preset
    📄 _03_analyzing_preset.cc preset
    📄 _04_verdict_reveal_preset.cc preset
    📄 _05_roast_text_preset.cc preset
    📄 _06_score_preset.cc preset
    📄 _07_red_flags_preset.cc preset
    📄 _08_cta_preset.cc preset
    📄 _09_final_frame_preset.cc preset
  📁 Text Presets
    📄 _caption_style.cc preset
    📄 _roast_style.cc preset
    📄 _score_style.cc preset
    📄 _tier_style.cc preset
    📄 _cta_style.cc preset
  📁 Effects Presets
    📄 _glitch_transition.eff
    📄 _scan_line_overlay.eff
    📄 _typewriter.appear
    📄 _number_roll.eff
    📄 _spring_zoom.eff
    📄 _shake_on_impact.eff
```

---

## Text Template Library

Create these as **Text Presets** in CapCut. Apply to any text block with one click.

### 1. `_tts_dynamic_captions` (Main Dialogue)
```
Font: Inter Bold
Size: 64
Color: White (#FFFFFF)
Outline: 2px, Black (#000000)
Position: Center bottom, Y = -200
Effects:
  - Shadow: 0 4px 8px rgba(0,0,0,0.6)
  - Animation: None (word-by-word via CaptionFlow import)
  - Line height: 1.1
  - Letter spacing: 1
Style: Word-by-word dynamic caption
```

### 2. `_roast_text` (Key Punchlines)
```
Font: Space Grotesk Italic
Size: 56
Color: Neon Purple (#BC13FE)
Outline: 1px, #4A005E
Position: Center, Y = 0
Effects:
  - Glow: 0 0 20px #BC13FE, 0 0 40px #BC13FE@50%
  - Animation: Slide in from left (0.3s) + slight shake on key words
  - Line height: 1.3
  - Letter spacing: 0.5
Style: Highlighted, dramatic reveal
Highlight: Wrap key phrases in **asterisks** for glow
```

### 3. `_score_number` (Aura Score)
```
Font: Space Grotesk Bold
Size: 96
Color: Neon Pink (#FF006E)
Outline: None
Position: Center
Effects:
  - Glow: 0 0 30px #FF006E, 0 0 60px #FF006E@40%
  - Animation: Number roll 0→target (via keyframe), then pulse (scale 1→1.1→1, 1s loop)
  - Track Matt: On (tight)
  - Shadow: 0 0 10px rgba(0,0,0,0.8) behind for dark screens
Style: Dominant, attention-grabbing
```

### 4. `_tier_label` (Toxic / Radioactive / etc)
```
Font: Space Grotesk SemiBold
Size: 28
Color: Matches score (green/purple/red)
Outline: 1px, darker variant
Position: Above score
Effects:
  - Text stroke: 1px inside
  - Background: Pill shape (88×32) with 30% opacity fill
  - Animation: Fade in with score
Style: Badge, compact, tier-appropriate
```

### 5. `_cta_text` (Call to Action)
```
Font: Inter Bold
Size: 48
Color: White (#FFFFFF)
Outline: 2px, Black (#000000)
Position: Center bottom, Y = -100
Effects:
  - Shadow: 0 2px 8px rgba(0,0,0,0.8)
  - Background: Neon pink rounded bar (width auto, height 64px)
  - Padding: 12px horizontal
  - Animation: Gentle scale pulse (1→1.03→1, 2s loop)
Style: Button-like, clickable feel
```

### 6. `_emoji_reaction` (Emoji overlays)
```
Font: SF Pro / Emoji compatible
Size: 80
Color: Default
Outline: None
Position: Floating (keyframed)
Effects:
  - Animation: Pop in (scale 0→1.3→1, 0.4s) + drift up
  - Optional: Random rotation (-10 to +10 degrees)
Style: Reaction emoji, bounces
```

---

## Timeline Layer Organization

Each video should use this **layer order** (bottom to top):

```
Layer 1:  Background (solid color or gradient)
Layer 2:  Background Image / Video (optional)
Layer 3:  Character / Scene footage
Layer 4:  App mockup (Figma PNG, use for overlay screens)
Layer 5:  Scan line / VHS overlay (video, 15% opacity)
Layer 6:  Glitch effect (on transitions)
Layer 7:  Dynamic text (captions, roast)
Layer 8:  Static text (CTA, tier labels)
Layer 9:  Score / Tier (highest visual priority)
Layer 10: Effects (particles, lens flares)
Layer 11: Final frame (logo + CTA)
```

---

## Script-Specific Template Setups

### Template: `_conversation_intro` (Scripts 1-5)
**Duration:** 4–8s
**Layers:**
1. BG: #0A0A0A
2. Text message bubbles (import as PNG or use native text)
   - Animate each bubble: `slide_right + fade` (0.3s stagger)
   - "seen" / "delivered" stamps: small text top right, appear 0.5s after message
3. Overlay: Subtle scan lines (video layer, 10% opacity)
4. SFX: `message_send.wav` + `message_send_2.wav` etc.
5. Captions: `_tts_dynamic_captions` applied per line

**CapCut Tip:** Use "Overlay" mode for text bubbles → set to slide in from right

---

### Template: `_phone_to_app` (Scripts 1-5)
**Duration:** 1.5s
**Layers:**
1. Character footage (phone in hand, or stock footage)
2. Screen placeholder (rectangle mask, animate phone rotation)
3. App icon PNG (OnRead logo) — appears in screen area
4. SFX: `whoosh.wav` + `screen_unlock.wav`
5. Transition: `_glitch_transition` (0.3s)

**Keyframes:**
- T=0: Phone face down / dark screen
- T=0.5s: Phone tilts up (rotate 3D, 45°→0°)
- T=1s: Screen lights up (brightness from 0→100%)
- T=1.2s: App icon slides in from bottom
- T=1.4s: Screen tap (zoom to app window)
- T=1.5s: Glitch → next scene

---

### Template: `_scanning_sequence` (Scripts 1-3)
**Duration:** 4–8s
**Layers:**
1. BG: Deep black + gradient scan (green to black overlay)
2. Terminal log text (JetBrains Mono, 13px, neon green)
   - Keyframed typewriter animation (50ms/char)
   - Lines appear one at a time, auto-scroll
   - Visible lines: 4-6 max
3. Progress bar (neon pink fill, dark gray track)
   - 3 keyframes: 15%, 67%, 89% → 100%
   - Each step: ease-out 0.5s
4. Status text (mono, amber): cycles every 1.5s
   - "EXTRACTING TEXT..." → "DETECTING RED FLAGS..." → "CALCULATING CRINGE..." → "CONSULTING THE VOID..."
5. Scan lines overlay (video, 15% opacity, 0.5s cycle)
6. SFX: `terminal_beep.mp3` (looped, volume builds), `scan_zap.wav` at each step

**Terminal log sample content:**
```
> parsing image...
> OCR complete: 247 chars
> sentiment: -0.82
> red_flags: 4 detected
> roast_engine: warming up
> aura_spectrum: unstable
> verdict: pending
```

---

### Template: `_verdict_reveal` (Scripts 1-5)
**Duration:** 3–6s (depends on roast length)
**Layers:**
1. BG: #0A0A0A
2. Verdict card PNG (Figma export, #1A1A1A bg, neon pink 1px border, 16px radius)
3. Score: separate large text layer (use `_score_number` style)
4. Tier label: separate text layer (use `_tier_label` style)
5. TL;DR: `_tts_dynamic_captions` style
6. ROAST: `_roast_text` style (highlighted words get extra glow)
7. Red flags: icon + text, each on own layer, staggered pop-in (0.3s)
8. Action plan: numbered list, mono style, green checks
9. Glows: soft neon overlays behind score (video, 30% opacity)
10. Effects: `spring_zoom` on card, `shake_on_impact` on "ROAST"

**Card layout (keyframed appearance):**
- T=0: Card drops from top (scale 0→1, spring)
- T=0.3s: Score appears (number roll)
- T=0.5s: Tier label fades in
- T=0.7s: TL;DR appears (fade up)
- T=1.0s: "THE ROAST" header
- T=1.2s: Roast text appears (dramatic pause, then typewriter)
- T=3.0s+: Red flags and action plan (staggered)

---

### Template: `_score_focus` (Scripts)
**Duration:** 1.5s
**Layers:**
1. Score number (full screen, huge)
2. Background glow (neon pink circle, blurred)
3. SFX: `slot_machine_roll.mp3` → `coin_drop.wav` → `heartbeat.mp3`
4. Animation: Number rolls 0→target (0.8s), then pulses (1→1.2→1, 0.7s loop)

**Number roll technique:**
- Create a tall text block with numbers 0-10 stacked
- Mask: 1 row visible (height of score text)
- Keyframe: scroll down to correct row over 0.8s
- Then switch to static number with pulse effect

---

### Template: `_final_cta` (Scripts 1-5)
**Duration:** 2–3s
**Layers:**
1. BG: Deep black
2. App logo (centered, large)
3. "onread.app" text (CTA style)
4. QR code (waitslist link) — bottom right corner
5. Waitlist badge: "JOIN THE LIST" neon pink pill
6. SFX: `positive_ding.wav` + `notification_ping.wav`
7. Effects: `_glitch_transition` in, logo glow, subtle VHS noise

**Animation:**
- Logo: springs in from bottom (bounce)
- Text: fade + slide up
- QR: pulses gently (1→1.1→1)
- Badge: neon glow + 1s loop

---

## CapCut Plugin Recommendations

| Plugin | Purpose | Where to get |
|--------|---------|-------------|
| **CaptionFlow** | Auto-captions with custom styling | captionflow.xyz / App Store |
| **Glitcher** (CapCut native) | Glitch transitions | CapCut effects browser |
| **VHS Noise** | Retro scan lines | CapCut overlays |
| **Typewriter Pro** | Text animation | CapCut text effects |
| **Neon Glow** | Score/roast glows | CapCut effects |
| **Scan Overlay** | Terminal aesthetic | Search "scan line" in overlays |
| **Spring Physics** | Bouncy reveals | CapCut animations |

---

## Export Settings (TikTok / Reels)

```
Resolution: 1080 × 1920 (9:16)
FPS: 30 (24 if cinematic mood desired)
Format: MP4 (H.264)
Bitrate: 15–20 Mbps
Duration: 15–30s per video
Safe Zones: All text within 960×1440 center, 72px bottom/top margins
```

**CapCut export preset name:** `_onread_ig_tt_export`

---

## Batch Workflow

1. **Start from:** `_Master_Template` → duplicate for each script
2. **Swap:** Text content in layers, update SFX per script
3. **Timeline preset:** Apply script-specific preset from Timeline Presets folder
4. **Captions:** Import CaptionFlow output → apply `_tts_dynamic_captions` style
5. **Export:** Use `_onread_ig_tt_export` preset → save to 📁 exported/

**Pro tip:** Keep the master template open. New videos = duplicate master → swap assets 3. Done.

---

## Quick Action Checklist

- [ ] Install fonts in CapCut → Settings → Fonts → Import
- [ ] Add SFX to 📁 Assets\SFX → preload all
- [ ] Create text presets → save with `_` prefix
- [ ] Import Figma mockups → export as PNG layers
- [ ] Set up scan line video → loop, 15% opacity overlay
- [ ] Create glitch transition → save as template
- [ ] Build terminal log animation → save as preset
- [ ] Test export → check safe zones, resolution, bitrate
- [ ] Duplicate → 5 copies labeled `Script_01` through `Script_05`

---

## Hashtag & Caption Presets (Save in CapCut)

**High-energy roast:**
```
#AuraCheck #Roasted #OnRead #TextRoast #RedFlag #Relatable #Cringe #DatingApp
```
Template: `_hashtags_roast`

**Emotional/Pain:**
```
#Ghosted #OnRead #AuraCheck #DatingTips #DoubleText #TextingFail #LeftOnRead
```
Template: `_hashtags_pain`

**Group/chat:**
```
#GroupChat #SocialSkills #OnRead #AuraCheck #Roasted #Friendgroup #Relatable
```
Template: `_hashtags_group`

**Default caption structure:**
```
Bro really thinks [scenario].
OnRead exposed them instantly.
Download → see your own aura score.

onread.app — waitlist open ⬇️
```
Template: `_caption_default`