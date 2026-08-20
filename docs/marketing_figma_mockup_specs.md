# Figma Mockup Specs — OnRead Marketing Videos
**Style:** Neon brutalism, high contrast, aggressive energy, Gen Z coded

---

## Global Design System

### Colors
| Role | Hex | Usage |
|------|-----|-------|
| **Neon Pink** | `#FF006E` | Primary CTAs, Aura Score numbers, scan lines |
| **Neon Green** | `#39FF14` | "Pass" indicators, success states, terminal text |
| **Neon Purple** | `#BC13FE` | Accent glows, roast text highlights |
| **Deep Black** | `#0A0A0A` | Background (not pure #000 — softer) |
| **Dark Gray** | `#1A1A1A` | Card surfaces, input fields |
| **Mid Gray** | `#2A2A2A` | Borders, dividers |
| **White** | `#FFFFFF` | Primary text |
| **Dim White** | `#B3B3B3` | Secondary text, timestamps |
| **Error Red** | `#FF2D2D` | Red flags, warnings, "ROASTED" stamp |
| **Warning Amber** | `#FFB800` | "Analyzing..." state, mid-tier scores |

### Typography
| Element | Font | Size | Weight | Style |
|---------|------|------|--------|-------|
| **Display / Aura Score** | Space Grotesk / Outfit | 72–96px | 700 Bold | Tracking: -2px, neon glow |
| **Headlines** | Space Grotesk | 28–32px | 600 SemiBold | Uppercase, letter-space: 2px |
| **Body** | Inter / DM Sans | 16px | 400 Regular | Line height 1.5 |
| **Caption / Terminal** | JetBrains Mono / Fira Code | 13px | 400 | Monospace, neon green |
| **Roast Text** | Space Grotesk | 20px | 500 Medium | Italic, neon purple accent |

### Effects (Apply as Figma Effects)
- **Neon Glow:** Drop shadow: `0 0 20px [neon color]`, `0 0 40px [neon color]@50%`
- **Scan Lines:** Overlay pattern: 1px horizontal lines, 15% opacity, animate in prototype
- **Glitch:** Duplicate layer, offset 2px, clip-path animation (prototype only)
- **Card Shadow:** `0 8px 32px rgba(0,0,0,0.4)`, `0 0 0 1px rgba(255,0,110,0.2)`

### Spacing System
- Base unit: **8px**
- Card padding: 24px (3×)
- Section gap: 32px (4×)
- Element gap: 16px (2×)

---

## Frame 1: UPLOAD SCREEN — "Drop the Receipts"

### Canvas: 1080×1920 (9:16, Reels/TikTok safe)

### Layout (Top → Bottom)

```
┌─────────────────────────────────────┐
│  STATUS BAR (iOS/Android)           │  44px / 48px
├─────────────────────────────────────┤
│  ONREAD LOGO + "AURA CHECK"         │  80px height
│  [neon pink logo]  [neon green text]│
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │    DROP ZONE (320×400)      │    │  ← Centered, 40px from top
│  │  [dashed neon pink border]  │    │
│  │                             │    │
│  │   📸  TAP OR DROP SCREENSHOT │    │  ← Inter 16, dim white
│  │                             │    │
│  │   [preview thumbnail        │    │  ← Shows after selection
│  │    appears here,            │    │
│  │    16:9 aspect,             │    │
│  │    rounded 12px]            │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│  [SCAN BUTTON]                      │  56px h, full width - 48px margins
│  "SCAN MY AURA"                     │  Space Grotesk 18, Bold
│  Neon pink fill, black text         │  Neon glow active
│  Rounded 16px                       │
├─────────────────────────────────────┤
│  "3 FREE CHECKS LEFT THIS WEEK"     │  13px mono, neon green, center
├─────────────────────────────────────┤
│  BOTTOM NAV (inactive)              │  88px
│  [History] [Scan] [Profile]         │
└─────────────────────────────────────┘
```

### Key Details
- **Drop zone border:** 2px dashed `#FF006E`, animated dash-offset (prototype: 2s linear infinite)
- **Thumbnail preview:** Replaces placeholder text, subtle scale-in (200ms ease-out)
- **Scan button:** Disabled state = `#2A2A2A` bg, `#555` text. Active = neon pink, press = scale 0.97
- **Safe zones:** Keep all interactive elements 48px from bottom (home indicator), 32px from top

### Variants Needed
1. **Empty state** (above)
2. **Thumbnail selected** — preview visible, scan button active
3. **Loading overlay** — full-screen, see Frame 2

---

## Frame 2: ANALYZING — "The Judgement Chamber"

### Canvas: 1080×1920

### Layout (Full-screen overlay on Frame 1)

```
┌─────────────────────────────────────┐
│  DEEP BLACK BG (#0A0A0A)            │
│  + subtle animated scan lines       │
├─────────────────────────────────────┤
│                                     │
│     [CENTERED VERTICAL STACK]       │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  ◢ SCANNING AURA ◣          │    │  ← JetBrains Mono 14, neon green
│  │  [animated brackets]        │    │     Blinking cursor "_"
│  └─────────────────────────────┘    │
│           │                         │
│  ┌─────────────────────────────┐    │
│  │  ████████████░░░░░░░░░░  67% │    │  ← Progress bar
│  │  [neon pink fill,           │    │     Mono 13, amber
│  │   dark gray track,          │    │
│  │   rounded 4px, 280px wide]  │    │
│  └─────────────────────────────┘    │
│           │                         │
│  ┌─────────────────────────────┐    │
│  │  EXTRACTING TEXT...         │    │  ← Rotating status lines
│  │  DETECTING RED FLAGS...     │    │     (cycle every 1.5s)
│  │  CALCULATING CRINGE...      │    │
│  │  CONSULTING THE VOID...     │    │
│  └─────────────────────────────┘    │
│           │                         │
│  ┌─────────────────────────────┐    │
│  │  [TERMINAL LOG]             │    │  ← Mono 11, dim white
│  │  > parsing image...         │    │     Auto-scroll, fade top
│  │  > OCR complete: 247 chars  │    │
│  │  > sentiment: -0.82         │    │
│  │  > red_flags: 4 detected    │    │
│  │  > roast_engine: warming up │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

### Animation Specs (for CapCut reference)
- **Progress bar:** Not linear. Steps: 15% → 35% → 67% → 89% → 100% (ease-out each)
- **Status text:** Cross-fade 300ms, stagger 1.5s
- **Terminal log:** Typewriter effect (50ms/char), auto-scroll, 4 lines visible
- **Scan lines:** Continuous 0.5s cycle, 10% opacity
- **Total duration:** 3.5–4.5s (feel fast, not instant)

### Variants Needed
1. **Start** (0%)
2. **Mid** (67% — "CALCULATING CRINGE...")
3. **Near done** (89% — "CONSULTING THE VOID...")
4. **Complete** → auto-transition to Frame 3

---

## Frame 3: VERDICT CARD — "The Roast Receipt"

### Canvas: 1080×1920 (Shareable 9:16 card)

### Layout (Top → Bottom)

```
┌─────────────────────────────────────┐
│  STATUS BAR                         │
├─────────────────────────────────────┤
│  ONREAD WATERMARK (subtle)          │  40px
│  "RATED BY ONREAD" • QR CODE        │  Mono 10, dim white
│  [tiny bottom right]                │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │  AURA SCORE                 │    │  ← Card: #1A1A1A, 16px radius
│  │                             │    │     Neon pink 1px border
│  │       2 3                   │    │     Padding: 24px
│  │    ┌───┐                    │    │
│  │    │100│  ← SCORE (large)   │    │  ← Space Grotesk 96, Bold
│  │    └───┘                    │    │     Neon pink + glow
│  │                             │    │
│  │  "RADIOACTIVE"              │    │  ← Tier label, 16px, neon purple
│  │  [tier: TOXIC / RADIOACTIVE │    │
│  │   / MID / CLEAN / ANGEL]    │    │
│  └─────────────────────────────┘    │
│           16px gap                  │
│  ┌─────────────────────────────┐    │
│  │  TL;DR                      │    │  ← Card
│  │  "You triple-texted someone │    │
│  │   who left you on delivered │    │
│  │   for 6 hours. Main         │    │
│  │   character energy ❌"       │    │  ← Inter 16, white, 1.5 line
│  └─────────────────────────────┘    │
│           16px gap                  │
│  ┌─────────────────────────────┐    │
│  │  THE ROAST                  │    │  ← Card
│  │  "Bro really said 'hey'     │    │
│  │   three times like a        │    │  ← Space Grotesk 20, Medium
│  │   notification bell with    │    │     Italic, neon purple
│  │   separation anxiety"       │    │     Highlight key phrases
│  └─────────────────────────────┘    │
│           16px gap                  │
│  ┌─────────────────────────────┐    │
│  │  RED FLAGS DETECTED         │    │  ← Card
│  │  🚩 Triple texting          │    │
│  │  🚩 Zero reciprocity        │    │  ← Flex row: icon + label
│  │  🚩 Desperation energy      │    │     14px, dim white
│  │  🚩 6hr response gap        │    │     Red flag icon = #FF2D2D
│  └─────────────────────────────┘    │
│           16px gap                  │
│  ┌─────────────────────────────┐    │
│  │  ACTION PLAN                │    │  ← Card
│  │  1. Phone down. Walk away.  │    │
│  │  2. Touch grass (literally) │    │  ← Numbered, 14px
│  │  3. If they reply: match    │    │     Green check = #39FF14
│  │     energy, don't exceed    │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│  SHARE ROW (fixed bottom)           │  88px
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │ INSTA   │ │ TIKTOK  │ │ SAVE   │ │  ← Equal width, 12px gaps
│  │ STORY   │ │ SHARE   │ │ IMAGE  │ │     Icon + label, 14px
│  └─────────┘ └─────────┘ └────────┘ │
└─────────────────────────────────────┘
```

### Tier System (Score → Label → Border Color)
| Score | Tier | Border/Glow | Vibe |
|-------|------|-------------|------|
| 90–100 | ANGEL | Neon Green | "Touching grass successfully" |
| 70–89 | CLEAN | Neon Green (dim) | "Solid. No notes." |
| 40–69 | MID | Warning Amber | "Could be worse. Could be better." |
| 20–39 | RADIOACTIVE | Neon Purple | "Glowing in the dark for wrong reasons" |
| 0–19 | TOXIC | Error Red | "Hazardous. Evacuate immediately." |

### Share Card Variants
1. **Full card** (above) — for Save Image
2. **Story crop** — 1080×1920, no bottom share row, "Swipe Up" hint
3. **TikTok thumbnail** — 1080×1920, larger score, minimal text, "POV:" overlay

---

## Component Library (Create as Figma Components)

### Atoms
- [ ] Neon Button (default, disabled, loading, pressed)
- [ ] Neon Border Input / Drop Zone
- [ ] Progress Bar (animated)
- [ ] Terminal Log Line
- [ ] Red Flag Chip (icon + text)
- [ ] Tier Badge
- [ ] Share Button (Insta, TikTok, Save, Copy Link)
- [ ] QR Code Placeholder
- [ ] Scan Line Overlay
- [ ] Glitch Text Effect

### Molecules
- [ ] Upload Drop Zone (empty + filled states)
- [ ] Analyzing Modal (full screen)
- [ ] Verdict Score Card
- [ ] Verdict Section Card (TL;DR, Roast, Red Flags, Action Plan)
- [ ] Bottom Share Row

### Organisms
- [ ] Upload Screen (full)
- [ ] Analyzing Screen (full)
- [ ] Verdict Screen (full)

---

## Prototype Flow (Figma Prototype)

```
Upload (Empty) 
  → Tap drop zone → System image picker (external)
  → Thumbnail appears → Scan button enabled
  → Tap Scan → Analyzing (0%)
  → Auto-advance: 15% → 35% → 67% → 89% → 100% (3.5s total)
  → Smart animate → Verdict Card (scale in 300ms, spring)
  → Verdict: Tap Share buttons → (external share sheet)
  → Tap "New Check" (floating) → Reset to Upload Empty
```

---

## Export Checklist (for CapCut)

| Asset | Format | Size | Notes |
|-------|--------|------|-------|
| Upload screen empty | PNG | 1080×1920 | Transparent bg for overlay |
| Upload screen filled | PNG | 1080×1920 | With sample thumbnail |
| Analyzing frames (4) | PNG | 1080×1920 | Progress steps |
| Verdict card full | PNG | 1080×1920 | With sample data |
| Verdict card story crop | PNG | 1080×1920 | No share row |
| Verdict card TikTok thumb | PNG | 1080×1920 | Minimal text |
| Neon pink glow overlay | PNG | 1080×1920 | Alpha channel |
| Scan lines overlay | MP4 | 1080×1920 | 3s loop, transparent |
| Glitch transition | MP4 | 1080×1920 | 0.5s, transparent |
| QR code placeholder | SVG | 200×200 | Replace per video |

---

## Sample Data for Mockups

**Conversation Context:** "Triple text after 6hr leave on delivered"
```
User: hey
User: you there?
User: hello???
[6 hours later]
Them: yeah sorry was busy
```

**AI Verdict Output:**
```json
{
  "auraScore": 23,
  "tier": "RADIOACTIVE",
  "tldr": "You triple-texted someone who left you on delivered for 6 hours. Main character energy ❌",
  "roast": "Bro really said 'hey' three times like a notification bell with separation anxiety",
  "redFlags": ["Triple texting", "Zero reciprocity", "Desperation energy", "6hr response gap"],
  "actionPlan": [
    "Phone down. Walk away.",
    "Touch grass (literally)",
    "If they reply: match energy, don't exceed"
  ]
}
```

---

## Figma File Structure

```
📁 OnRead Marketing Mockups
  📁 01 Design System
    🎨 Colors, Typography, Effects, Spacing, Components
  📁 02 Screens
    📄 Upload - Empty
    📄 Upload - Filled
    📄 Analyzing - 0%
    📄 Analyzing - 35%
    📄 Analyzing - 67%
    📄 Analyzing - 100%
    📄 Verdict - Full
    📄 Verdict - Story Crop
    📄 Verdict - TikTok Thumb
  📁 03 Prototype Flow
  📁 04 Export Assets (frames marked for export)
```