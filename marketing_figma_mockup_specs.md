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
| **Deep Black** | `#0A0A0A` | Background |
| **Dark Gray** | `#1A1A1A` | Card surfaces, input fields |
| **Mid Gray** | `#2A2A2A` | Borders, dividers |
| **White** | `#FFFFFF` | Primary text |
| **Dim White** | `#B3B3B3` | Secondary text, timestamps |
| **Error Red** | `#FF2D2D` | Red flags, warnings, "ROASTED" stamp |
| **Warning Amber** | `#FFB800` | "Analyzing..." state |

### Typography
| Element | Font | Size | Weight | Style |
|---------|------|------|--------|-------|
| **Display / Score** | Space Grotesk | 72–96px | 700 Bold | -2px tracking, neon glow |
| **Headlines** | Space Grotesk | 28–32px | 600 SemiBold | Uppercase |
| **Body** | Inter | 16px | 400 Regular | 1.5 line height |
| **Caption / Terminal** | JetBrains Mono | 13px | 400 | Neon green |
| **Roast Text** | Space Grotesk | 20px | 500 Medium | Italic |

### Effects
- **Neon Glow:** `0 0 20px [color]`, `0 0 40px [color]@50%`
- **Scan Lines:** 1px horizontal lines, 15% opacity
- **Glitch:** Offset 2px, clip-path animation
- **Card Shadow:** `0 8px 32px rgba(0,0,0,0.4)`

### Spacing (base unit: 8px)
- Card padding: 24px
- Section gap: 32px
- Element gap: 16px

---

## Frame 1: UPLOAD SCREEN — "Drop the Receipts"
**Canvas:** 1080×1920 (9:16)

```
┌─────────────────────────────────────┐
│  STATUS BAR                         │  44px
├─────────────────────────────────────┤
│  ONREAD LOGO  "AURA CHECK"          │  80px
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │  DROP ZONE (320×400)         │    │
│  │  [dashed neon pink border]   │    │
│  │  "TAP OR DROP SCREENSHOT"    │    │
│  │  [thumbnail appears here]    │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│  "SCAN MY AURA" button              │  56px h, full width - 48px
│  Neon pink fill, black text         │
│  Rounded 16px, glowing            │
├─────────────────────────────────────┤
│  "3 FREE CHECKS LEFT THIS WEEK"     │  13px mono, neon green
├─────────────────────────────────────┤
│  BOTTOM NAV                         │  88px
└─────────────────────────────────────┘
```

### Key Details
- Drop zone: 2px dashed `#FF006E`, animated dash-offset
- Thumbnail: scale-in 200ms ease-out
- Scan button: disabled = `#2A2A2A` bg; active = neon pink
- Safe zones: 48px bottom, 32px top

### Variants
1. Empty state
2. Thumbnail selected (active button)
3. Loading overlay

---

## Frame 2: ANALYZING — "The Judgement Chamber"
**Canvas:** 1080×1920 (overlay on Frame 1)

```
┌─────────────────────────────────────┐
│  DEEP BLACK BG (#0A0A0A)            │
│  + animated scan lines             │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │  ◢ SCANNING AURA ◣          │    │
│  │  [brackets]                 │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  ████████████░░░░░░░░░░  67% │    │
│  │  [neon pink fill]          │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  EXTRACTING TEXT...         │    │  ← rotating status
│  │  DETECTING RED FLAGS...     │    │
│  │  CALCULATING CRINGE...      │    │
│  │  CONSULTING THE VOID...     │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  > parsing image...         │    │
│  │  > OCR complete: 247 chars  │    │
│  │  > sentiment: -0.82         │    │
│  │  > red_flags: 4 detected    │    │
│  │  > roast_engine: warming up │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

### Animation Specs
- Progress bar: 15% → 35% → 67% → 89% → 100% (ease-out each)
- Status text: cross-fade 300ms, 1.5s cycle
- Terminal log: typewriter 50ms/char, auto-scroll
- Scan lines: 0.5s cycle, 10% opacity
- Duration: 3.5–4.5s

### Variants
1. Start (0%)
2. Mid (67% — "CALCULATING CRINGE...")
3. Near done (89% — "CONSULTING THE VOID...")
4. Complete (100%)

---

## Frame 3: VERDICT CARD — "The Roast Receipt"
**Canvas:** 1080×1920 (shareable)

```
┌─────────────────────────────────────┐
│  STATUS BAR                         │
├─────────────────────────────────────┤
│  "RATED BY ONREAD" • QR CODE        │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │  AURA SCORE                 │    │
│  │                             │    │
│  │       2 3                   │    │  ← Space Grotesk 96
│  │    ┌───┐                    │    │
│  │    │100│                    │    │
│  │    └───┘                    │    │
│  │  "RADIOACTIVE"              │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  TL;DR                      │    │
│  │  "You triple-texted..."     │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  THE ROAST                  │    │
│  │  "Bro really said 'hey'..." │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  RED FLAGS DETECTED         │    │
│  │  🚩 Triple texting          │    │
│  │  🚩 Zero reciprocity        │    │
│  │  🚩 Desperation energy      │    │
│  │  🚩 6hr response gap        │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  ACTION PLAN                │    │
│  │  1. Phone down. Walk away.  │    │
│  │  2. Touch grass (literally) │    │
│  │  3. If they reply: match    │    │
│  │     energy, don't exceed    │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│  SHARE ROW                          │  88px
│  [Insta] [TikTok] [Save]            │
└─────────────────────────────────────┘
```

### Tier System
| Score | Tier | Border | Vibe |
|-------|------|--------|------|
| 90–100 | ANGEL | Neon Green | Touching grass |
| 70–89 | CLEAN | Neon Green (dim) | Solid, no notes |
| 40–69 | MID | Warning Amber | Could be worse |
| 20–39 | RADIOACTIVE | Neon Purple | Glowing wrong |
| 0–19 | TOXIC | Error Red | Hazmat level |

### Share Card Variants
1. Full card (with share row)
2. Story crop (no share row)
3. TikTok thumbnail (minimal text, big score)

---

## Component Library

### Atoms
- [ ] Neon Button (default, disabled, loading, pressed)
- [ ] Neon Border Drop Zone
- [ ] Progress Bar
- [ ] Terminal Log Line
- [ ] Red Flag Chip (icon + text)
- [ ] Tier Badge
- [ ] Share Button (Insta/TikTok/Save)
- [ ] QR Code
- [ ] Scan Line Overlay
- [ ] Glitch Text Effect

### Molecules
- [ ] Upload Drop Zone (empty + filled)
- [ ] Analyzing Modal
- [ ] Verdict Score Card
- [ ] Verdict Section Cards
- [ ] Bottom Share Row

### Figma File Structure
```
📁 OnRead Marketing Mockups
  📁 01 Design System
    🎨 Colors, Typography, Effects, Components
  📁 02 Screens
    📄 Upload - Empty
    📄 Upload - Filled
    📄 Analyzing - 0%
    📄 Analyzing - 67%
    📄 Analyzing - 100%
    📄 Verdict - Full
    📄 Verdict - Story Crop
    📄 Verdict - TikTok Thumb
  📁 03 Export Assets
  📁 04 Prototype Flow
```

---

## Sample Data
```json
{
  "auraScore": 23,
  "tier": "RADIOACTIVE",
  "tldr": "You triple-texted someone who left you on delivered for 6 hours.",
  "roast": "Bro really said 'hey' three times like a notification bell",
  "redFlags": ["Triple texting", "Zero reciprocity", "Desperation energy"],
  "actionPlan": ["Phone down", "Touch grass", "Match energy if they reply"]
}
```

---

## Export Checklist
| Asset | Format | Size |
|-------|--------|------|
| Upload screen | PNG | 1080×1920 |
| Analyzing frames | PNG | 1080×1920 |
| Verdict card | PNG | 1080×1920 |
| Glitch overlay | PNG | 1080×1920 (alpha) |
| Scan lines | MP4 | 1080×1920 (loop) |
| Icons | SVG | 200×200 |
| QR placeholder | SVG | 200×200 |