# Export Guide — OnRead Mockups from Figma to CapCut

Complete workflow for getting your Figma screens into CapCut-ready formats.

---

## Option 1: Manual Export (Quick Start)

### Step 1: Select Export Frames
In Figma → select each frame → in right panel → **Export** tab:

| Frame Name | Format | Size | Suffix |
|------------|--------|------|--------|
| Upload - Empty | PNG | 1080×1920 | `@1x` |
| Upload - Filled | PNG | 1080×1920 | `@1x` |
| Analyzing - 0% | PNG | 1080×1920 | `@1x` |
| Analyzing - 35% | PNG | 1080×1920 | `@1x` |
| Analyzing - 67% | PNG | 1080×1920 | `@1x` |
| Analyzing - 89% | PNG | 1080×1920 | `@1x` |
| Analyzing - 100% | PNG | 1080×1920 | `@1x` |
| Verdict - TOXIC | PNG | 1080×1920 | `@1x` |
| Verdict - RADIOACTIVE | PNG | 1080×1920 | `@1x` |
| Verdict - MID | PNG | 1080×1920 | `@1x` |
| Verdict - CLEAN | PNG | 1080×1920 | `@1x` |
| Verdict - ANGEL | PNG | 1080×1920 | `@1x` |

### Step 2: Export Settings
- **Format:** PNG (transparency for overlays)
- **Constraint:** Scale 1× (no resizing)
- **Suffix:** Use frame name suffix (`_upload_empty`, `_analyzing_67`, etc.)
- **Include in export:** Check all layers you'll animate separately in CapCut

### Step 3: Name Files for CapCut
```
📁 onread_exports/
  📁 frames/
    upload_empty.png
    upload_filled.png
    analyzing_00.png
    analyzing_35.png
    analyzing_67.png
    analyzing_89.png
    analyzing_100.png
    verdict_toxic.png
    verdict_radioactive.png
    verdict_mid.png
    verdict_clean.png
    verdict_angel.png
  📁 components/
    logo_neon.png
    neon_border.png
    scan_lines.png
    glitch_overlay.png
    score_number_0.png
    score_number_1.png
    score_number_7.png
    tier_radioactive.png
    red_flag_icon.png
    instagram_icon.png
    tiktok_icon.png
    save_icon.png
    qr_placeholder.png
    progress_bar_0.png
    progress_bar_67.png
    terminal_lines.png
```

### Step 4: Batch Export Trick
1. Hold `Shift` → click all frames you want to export
2. In Export panel → click the 3 dots (⋯) → **"Export all frames as PNG"**
3. Figma creates a zip → unzip → rename files to match your CapCut template structure

---

## Option 2: Automated Export with Figma Plugins

### Best Plugins for Batch Export

**1. "Export All" Plugin**
- Install: Plugins → Browse plugins → search "Export All"
- Usage: Select all frames → Plugins → Export All
- Output: Custom folder structure, filenames from layer names

**2. "TinyImage Compressor"**
- Exports + auto-compresses PNGs
- Great for reducing CapCut import file size
- Use: Select frames → Plugins → TinyImage → Export

**3. "Image Optimizer"**
- Strips metadata, converts to WebP where supported
- Reduces CapCut project file bloat

### Plugin Workflow
```
1. Plugins → Export All
2. Set output: PNG, 1x, transparent
3. Naming: "layer name" → auto-replaces spaces with underscores
4. Destination: Local folder (create "onread_exports")
```

**Pro tip:** Use layer names like `upload_empty`, `analyzing_67`, `verdict_radioactive` so filenames auto-match your CapCut template.

---

## Option 3: Figma CLI / API Automation

For repeatable exports (especially if you update the mockups), use the Figma API.

### Setup (Node.js script)
```bash
npm install node-fetch sharp
```

### `export-figma.js`
```javascript
const fetch = require('node-fetch');
const fs = require('fs');
const sharp = require('sharp');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = 'your-file-id';
const NODE_IDS = {
  'upload_empty': '0:1',
  'upload_filled': '0:2',
  'analyzing_0': '0:3',
  'analyzing_35': '0:4',
  'analyzing_67': '0:5',
  'analyzing_89': '0:6',
  'analyzing_100': '0:7',
  'verdict_radioactive': '0:8',
  'verdict_toxic': '0:9',
};

async function exportImage(nodeId, name) {
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${nodeId}&format=png&scale=2`;
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN }
  });
  const data = await res.json();
  const imageUrl = data.images[nodeId];
  
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();
  
  // Convert to 1080x1920 PNG
  await sharp(buffer)
    .resize(1080, 1920)
    .png()
    .toFile(`onread_exports/${name}.png`);
  
  console.log(`Exported: ${name}.png`);
}

async function exportAll() {
  fs.mkdirSync('onread_exports', { recursive: true });
  for (const [name, nodeId] of Object.entries(NODE_IDS)) {
    await exportImage(nodeId, name);
  }
  console.log('✅ All exports complete!');
}

exportAll().catch(console.error);
```

### Usage
```bash
FIGMA_TOKEN=your-token-here node export-figma.js
```

### Finding Your File Key & Node IDs
```bash
curl -H "X-Figma-Token: TOKEN" \
  "https://api.figma.com/v1/files/FILE_KEY" \
  | jq '.document.children[].id, .document.children[].name'
```

---

## Option 4: CapCut Direct Integration

If your Figma file is published to Figma Community:
1. Figma → Share → "Publish to Community"
2. In CapCut → "Templates" → Import from Figma Community
3. CapCut reads Figma layers and creates editable template

**More reliable:**
- Download as PNG → Upload to CapCut as overlay
- Use Figma's "Copy as PNG" → paste directly into CapCut timeline

---

## File Organization for CapCut

### Recommended Structure
```
📁 capcut_project_onread/
  📁 video_templates/          ← CapCut .cprj files
    template_master.cc preset
    script_01_triple_text.cprj
    script_02_pregaming.cprj
    script_03_ghosted.cprj
    script_04_talk_drama.cprj
    script_05_group_chat.cprj
  📁 assets/
    📁 ui_frames/              ← Figma exports
      upload_empty.png
      upload_filled.png
      analyzing_*.png
      verdict_*.png
    📁 components/             ← Individual elements
      logo.png
      icons/
      overlays/
    📁 sfx/                    ← Sound effects
      scan_sequence.mp3
      text_send.wav
      roast_sting.wav
      score_roll.wav
    📁 fonts/                  ← Custom fonts
      SpaceGrotesk-Bold.ttf
      Inter-Bold.ttf
      JetBrainsMono-Regular.ttf
  📁 exports/                  ← Final videos
    YYYY-MM-DD_onread_roast_01.mp4
    YYYY-MM-DD_onread_roast_02.mp4
```

### Import Workflow
1. **Create new CapCut project** → 1080×1920, 30fps
2. **Import folder** → Select entire `assets/` folder → CapCut auto-sorts
3. **Overlay method:** Drag UI frames to timeline → set to "Overlay" → add blend modes
4. **Text replacement:** Edit text layers → apply `_caption_style` preset from guide
5. **Animation:** Apply saved keyframes/effects from `_Master_Template`

---

## Quick Export Checklist

- [ ] Frames named consistently (Figma → right panel → frame name)
- [ ] Export panel → set all to PNG, 1x scale
- [ ] Mark components for individual export (icons, logo, overlays)
- [ ] Create separate export folder: `📁 onread_exports/`
- [ ] Use batch export (select multiple frames ← Shift-click)
- [ ] Verify dimensions: all 1080×1920 (not 2x or 0.5x)
- [ ] Check transparency: PNG with checkerboard = transparency preserved
- [ ] Rename files to match CapCut template layer names
- [ ] Compress: use TinyImage plugin for faster CapCut imports

---

## File Size Optimization Tips

| Element | Optimization | Expected Size |
|---------|--------------|---------------|
| Full screens | PNG → WebP (if CapCut supports) | 200–500KB |
| Icons/UI | PNG-8 with alpha | 10–50KB |
| Scan line overlay | GIF/looped MP4 | 50–100KB |
| Glitch effects | Short MP4 | 50KB |
| Progress bars | PNG sequence (strip) | 50KB |

**Total project size target:** < 5MB for clean CapCut import speed