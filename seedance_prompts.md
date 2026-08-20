# Seedance 2.5 Prompts — OnRead Figma Cards → AI Video

Framework and optimized prompts for converting your Figma mockups into 30-second AI videos using Seedance 2.5's image-to-video + text-to-video with timestamp control.

---

## Seedance Workflow: Figma → AI Video → CapCut

### Step 1: Export Key Figma Cards
From your Figma file, export these specific frames as **high-res PNGs** (2x, transparent):

| Card | File | Used As Reference For |
|------|------|----------------------|
| `figma_upload_empty.png` | Frame 1 - Empty state | Hook intro scene |
| `figma_upload_filled.png` | Frame 1 - With screenshot | "before" mood |
| `figma_analyzing_67.png` | Frame 2 - Progress | AI analysis animation |
| `figma_verdict_toxic.png` | Frame 3 - Toxic variant | Verdict reveal (Script 1) |
| `figma_verdict_radioactive.png` | Frame 3 - Radioactive | Verdict reveal (Scripts 2-5) |
| `figma_verdict_mid.png` | Frame 3 - Mid | Verdict reveal (Script 2) |
| `figma_verdict_angel.png` | Frame 3 - Angel | Verdict reveal (positive tone) |

---

## Prompt Framework (Copy → Paste → Customize)

```
[STYLE REF]: [Upload frame PNG]
[VISUAL REF]: [Verdict card PNG]
A [SECONDS]s AI-generated video showing [HOOK/SCENE DESCRIPTION].
[ACTION BEAT 1] at 00:XXX. [ACTION BEAT 2] at 00:XXX. [ACTION BEAT 3] at 00:XXX.
Style: [NEON CYBERPUNK / BRAZILIAN STREET STYLE / etc]. Mood: [AGGRESSIVE / DRAMATIC / PLAYFUL].
Camera: [SHOT DESCRIPTION]. Lighting: [NEON PINK + GREEN GLOW]. Motion: [SMOOTH / GLITCHY / SHARP CUTS].
End with [CTA/OUTCALL]. --video-length 30 --aspect 9:16 --reference-strength high
```

---

## Script 1: Triple Text Roast — Seedance Prompt

**References to upload:**
- `figma_upload_filled.png` (visual reference for the chat app UI)
- `figma_verdict_toxic.png` (visual reference for verdict card style)

**Seedance Prompt:**
```
STYLE REFERENCE: figma_upload_filled.png
VISUAL REFERENCE: figma_verdict_toxic.png
A 30s cinematic AI video. Opens on a phone screen in darkness (matching upload frame style), showing a green text message bubble chain: "hey" → "you there?" → "hello???" → "seen 6:42 AM". The phone shakes slightly as the 4th message is sent. At 00:05 user flips open the OnRead app (logo flashes neon pink). At 00:08 scanning animation begins — terminal green text scrolls: "> parsing image...", "> OCR: 247 chars", "> sentiment: -0.82". Progress bar fills to 67% by 00:18. At 00:20 screen flashes white — glitch effect. At 00:22 verdict card materializes with spring physics: huge neon pink "17" score pulses, "TOXIC" badge glows red. At 00:25 brutal roast text types out word-by-word in neon purple: "Bro really said 'hey' three times like a notification bell with separation anxiety". At 00:28 score pulses twice, final frame holds. 
Style: Neon cyberpunk brutality, deep black backgrounds, aggressive high contrast, Gen Z dating drama aesthetic. Mood: Brutal yet entertaining. Camera: phone screen POV, subtle zoom during verdict reveal. Lighting: Neon pink/green/purple dominant, deep shadows. Motion: Sharp digital glitches, smooth text reveals, springy card animations.
End with app logo + "onread.app" watermark in bottom corner. --video-length 30 --aspect 9:16 --reference-strength high --motion-strength medium
```

---

## Script 2: Pregaming Disaster — Seedance Prompt

**References to upload:**
- `figma_upload_filled.png` (chat messsages style)
- `figma_verdict_mid.png` (Mid-tier verdict card style)

**Seedance Prompt:**
```
STYLE REFERENCE: figma_upload_filled.png
VISUAL REFERENCE: figma_verdict_mid.png
A 30s high-energy AI video. Opens on group chat UI (green/blue bubbles, matches upload frame) showing chaotic pregaming panic messages: "u up?" → "she said hi to me in chem" → "what do i tell her??" → "what if she breathes oxygen?" → "what if she's already talking to someone??" Messages arrive rapidly with notification spam sounds. At 00:08 all 8 message bubbles flash and the phone screen goes chaotic static. At 00:12 phone flips to OnRead app (neon pink logo slam). At 00:15 scanning sequence with terminal output, progress jumps 15→67→100%, status cycles "DETECTING CRINGE" → "CONSULTING THE VOID". At 00:22 full glitch-flash to white. At 00:24 verdict card slams in (Mid tier, amber glow): "45 — MID" score pulses, "bro, you're overthinking this" roast text appears. At 00:28 phone gets dropped, screen cracks slightly, final frame freezes on verdict. 
Style: Neon brutalist chaos, high saturation, Gen Z panic attack aesthetic. Mood: Chaotic and funny. Camera: rapid cuts, phone screen POV, Dutch angles during panic. Lighting: Strobe-like message flashes, amber/green terminal glow. Motion: Bouncy, chaotic, sharp cuts with glitch transitions.
End with cracked phone + "onread.app" watermark. --video-length 30 --aspect 9:16 --reference-strength high --motion-strength high
```

---

## Script 3: Ghosted — Seedance Prompt

**References to upload:**
- `figma_upload_empty.png` (phone-in-dark mood)
- `figma_verdict_radioactive.png` (painful scoring card style)

**Seedance Prompt:**
```
STYLE REFERENCE: figma_upload_empty.png
VISUAL REFERENCE: figma_verdict_radioactive.png
A 30s moody cinematic AI video. Opens on a phone screen glowing in darkness (matching upload frame style). Text thread: "hey beautiful" (00:03) → "waiting by phone rn 💘" (00:06) → "..." typing indicator appears (00:09) → dots vanish, no "seen" receipt, phone slowly fades to blue dawn light (00:12). At 00:14 user's face shown: sad expression, eyes on phone (use reference for lighting style). At 00:18 phone flips to OnRead, screen pulses with neon. At 00:20 analyzing sequence: terminal logs scroll in green, progress bar stuck at 67% longer, "CONSULTING THE VOID" cycles ominously. At 00:25 full blackout → instant verdict reveal (00:26): "31 — TOXIC" card with deep red glow, roast text fades in slowly: "Bro sent 'beautiful' and waited like a dog with a wifi collar. Bro... she's not your dispatcher." At 00:29 score pulses dimly.
Style: Moody neon noir, blue dawn lighting mixing with aggressive app glows, emotional weight. Mood: Painful but honest, dramatic. Camera: close-ups on phone and face, shallow depth of field. Lighting: Blue ambient phone glow, then neon pink/green analysis burst. Motion: Slow build, then snappy verdict reveal with spring animation.
End with "onread.app" watermark glowing against dawn light. --video-length 30 --aspect 9:16 --reference-strength high --motion-strength low
```

---

## Script 4: "We Need to Talk" — Seedance Prompt

**References to upload:**
- `figma_upload_empty.png` (anxiety/dread aesthetic)
- `figma_verdict_toxic.png` (hard-hitting verdict style)

**Seedance Prompt:**
```
STYLE REFERENCE: figma_upload_empty.png
VISUAL REFERENCE: figma_verdict_toxic.png
A 30s intense AI video. Opens at 3 AM: phone screen lights up with "we need to talk" notification (00:02). Phone shakes in user's trembling hand. At 00:05 quick cuts of panic reactions: checking chat history, staring at ceiling, checking call logs. At 00:12 screen zooms to OnRead app icon (neon pink glow intensifies). At 00:15 scanning sequence begins — intense terminal output, red warning flashes "> AURA SPECTRUM: CRITICAL", progress bar jumps erratically to 100%. At 00:20 screen flashes red/black — glitch storm. At 00:22 verdict card CRASHES in with impact: "12 — TOXIC" with hazard stripes, skull emoji 💀 appears next to score. At 00:25 roast text slams: "She said 'we need to talk' — that's code for 'you done messed up.' Your aura is currently a crime scene. 🚔" At 00:28 police siren flash + final frame freeze.
Style: High-tension thriller meets dating app brutality, red/amber warning palette, cinematic contrast. Mood: Intense, high-stakes, edge-of-your-seat drama. Camera: Handheld shake, rapid cuts, Dutch angle during panic, dramatic low-angle for verdict card entrance. Lighting: Blue-white phone glow, amber hazard lighting, red emergency flashes. Motion: Jittery panic, then sudden freeze-frame at verdict.
End with "OnRead — because your friends won't tell you this" + watermark. --video-length 30 --aspect 9:16 --reference-strength high --motion-strength high
```

---

## Script 5: Group Chat Menace — Seedance Prompt

**References to upload:**
- `figma_upload_filled.png` (multi-chat participant style)
- `figma_verdict_mid.png` (social awkwardness scoring)

**Seedance Prompt:**
```
STYLE REFERENCE: figma_upload_filled.png
VISUAL REFERENCE: figma_verdict_mid.png
A 30s comedic AI video. Opens on group chat with 6 participants (matching upload frame style) (00:00). User types "hey guys what are we doing tonight" (00:03). Responses flood in rapidly: "idk" → "work tomorrow" → "same" → "boring" → "u pick" → "idc" (00:08). User replies confidently "how about dave & busters??" (00:11). Dead silence. At 00:13 "dave & busters??" → reaction emojis flood in: 💀💀💀💀💀 + "bro that's for kids" → "💀😭💀💀💀" (00:16). Phone screen glitches/distorts from embarrassment (00:18). At 00:20 zooms to OnRead logo (neon pink). At 00:22 scan sequence — comedic this time: "red_flags: 8 detected", "desperation_level: MAXIMUM", "roast_engine: OVERHEAT". At 00:25 verdict card bounces in with comedic spring: "45 — MID (child at a casino)" → roast appears: "Suggested 'Dave & Busters' in a group chat. Bro thinks he's still 14 and the prize is a stuffed animal." At 00:28 emoji tears fall from phone + final frame.
Style: Comedy-focused, bright neon but with roast card brutality, group chat UI prominence. Mood: Funny roast, social cringe comedy. Camera: Group chat UI centered, comedic zoom-ins on reaction emojis, bouncy verdict card. Lighting: Bright phone screen, neon scan effects, carnival-style amber during verdict. Motion: Bouncy, exaggerated reactions, cartoonish glitch effects.
End with "onread.app/save-this-before-friends-see-it" watermark. --video-length 30 --aspect 9:16 --reference-strength high --motion-strength high
```

---

## Universal Modifier Flags (Add to Any Prompt)

| Flag | Purpose | Use When |
|------|---------|----------|
| `--video-length 30` | Max clip duration | Always (native 2.5 feature) |
| `--aspect 9:16` | Vertical format | TikTok/Reels output |
| `--reference-strength high` | Strong adherence to Figma frames | UI accuracy matters |
| `--reference-strength medium` | Blend reference + creativity | Creative interpretation OK |
| `--motion-strength low` | Subtle movement | Emotional/dramatic scenes |
| `--motion-strength medium` | Moderate animation | Standard reveals |
| `--motion-strength high` | Chaotic/exaggerated | Comedy/chaos scenes |
| `--seedance-2.5` | Engine selector | Explicitly use 2.5 |
| `--extension-mode extend` | Use extension workflow | Need continuity after generation |
| `--green-screen subject-isolated` | Remove bg | Compositing Figma card overlays |

---

## Batch Workflow for All 5 Scripts

### Step 1: Prepare Figma Exports
```
📁 seedance_inputs/
  figma_upload_empty.png  ← export Frame 1 empty state
  figma_upload_filled.png  ← export Frame 1 with thumbnail
  figma_analyzing_67.png   ← export Frame 2 at progress midpoint
  figma_verdict_toxic.png  ← export Frame 3 toxic variant
  figma_verdict_radioactive.png
  figma_verdict_mid.png
  figma_verdict_angel.png
```

### Step 2: Launch Seedance 2.5 (CapCut PC → AI Video)
For each script:
1. **Upload 2 reference images** (style + visual ref)
2. **Paste prompt** from above
3. **Set flags:** `--video-length 30 --aspect 9:16 --reference-strength high`
4. **Pick motion strength:** `--motion-strength medium` (default)
5. **Generate** — pick best take from 3 variations

### Step 3: Review + Refine

**On desktop in CapCut PC:**
| Check | Good Output | Needs Fix |
|-------|-------------|-----------|
| UI consistency | App logo visible, neon colors match Figma | Logo wrong color, UI distorted |
| Timing | Beats hit at right timestamps | Roast too fast/slow, need timing edit |
| Quality | Smooth motion, no artifacts | Jagged text, glitch artifacts in wrong places |

**Region-level edits** (if needed):
- Adjust score number timing
- Fix color palette drift
- Extend verdict card hold time
- Smooth glitch transitions

### Step 4: Export for CapCut
```
📁 seedance_outputs/
  script01_triple_text_raw.mp4   ← generated scene
  script02_pregaming_raw.mp4
  script03_ghosted_raw.mp4
  script04_talk_drama_raw.mp4
  script05_group_chat_raw.mp4
```

Import these into your CapCut project templates — they're your base scene. Then add the caption overlays, SFX, and final edits per your existing CapCut guide.

---

## Quick Prompt Generator (Fill in the blanks)

```
STYLE REFERENCE: [upload_frame].png
VISUAL REFERENCE: [verdict_frame].png
A 30s [MOOD] AI video. Opens on [HOOK]. Action 1 at [TIME]: [WHAT HAPPENS]. Action 2 at [TIME]: [NEXT BEAT]. Action 3 at [TIME]: [VERDICT REVEAL].
Style: [AESTHETIC]. Mood: [EMOTION]. Camera: [SHOT TYPE]. Lighting: [LIGHTING]. Motion: [MOTION STYLE].
End with [CTA]. --video-length 30 --aspect 9:16 --reference-strength high --motion-strength [low/medium/high]
```

---

## Pro Tips for Figma → Seedance → CapCut

✅ **Pre-export Figma as 2x PNG** — Seedance reads details better at higher resolution  
✅ **Use Frame 3 (verdict) variants as primary visual ref** — strongest color/style signal  
✅ **Match mood to tier:** TOXIC = red/black tension | MID = amber chaos | ANGEL = soft green glow  
✅ **Timestamp beats precisely** — Seedance 2.5 does time-based scene control better than ever  
✅ **Generate 3 takes per script** — pick cleanest motion/verdict timing  
✅ **Use `--motion-strength low` for Scripts 3 & 4** — emotional weight matters  
✅ **Use `--motion-strength high` for Scripts 2 & 5** — chaos/comedy needs exaggeration  

---

## Credits Estimator

| Prompt | Avg Generate Time | Est. Credits (at $0.10/sec) |
|--------|-------------------|-------------------------------|
| Script 1 (30s) | ~60–90 sec | ~3 credits |
| Script 2 (30s) | ~60–90 sec | ~3 credits |
| Script 3 (30s) | ~60–90 sec | ~3 credits |
| Script 4 (30s) | ~60–90 sec | ~3 credits |
| Script 5 (30s) | ~60–90 sec | ~3 credits |
| **Total (3 takes each)** | ~8 min | ~45 credits (~$4.50) |

Plus extension/regenerate iterations: budget **~100 credits ($10)** for the full batch.