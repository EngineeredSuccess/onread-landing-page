#!/bin/bash
# export_onread.sh — Batch export OnRead Figma frames → CapCut-ready PNGs

# Usage: 
#   1. Fill in FIGMA_TOKEN and FILE_KEY below
#   2. Install deps: npm install node-fetch sharp
#   3. Run: chmod +x export_onread.sh && ./export_onread.sh

set -e

echo "🚀 OnRead Figma → CapCut Export Pipeline"

FIGMA_TOKEN="${FIGMA_TOKEN:-'YOUR_TOKEN_HERE'}"
FILE_KEY="${FILE_KEY:-'YOUR_FILE_KEY_HERE'}"
OUTPUT_DIR="onread_exports"

# Check dependencies
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required. Install from nodejs.org"
    exit 1
fi

if ! npm list sharp &> /dev/null 2>&1; then
    echo "📦 Installing dependencies (node-fetch, sharp)..."
    npm install node-fetch sharp --silent
fi

# Create output directories
mkdir -p "$OUTPUT_DIR/frames"
mkdir -p "$OUTPUT_DIR/components"

echo "🎨 Exporting frames from Figma..."

node - << 'SCRIPT'
const fetch = require('node-fetch');
const sharp = require('sharp');
const fs = require('fs');

const TOKEN = process.env.FIGMA_TOKEN || 'YOUR_TOKEN_HERE';
const FILE_KEY = process.env.FILE_KEY || 'YOUR_FILE_KEY_HERE';

const EXPORTS = [
  // Full screens
  { id: '0:10', name: 'frames/upload_empty', format: 'png' },
  { id: '0:11', name: 'frames/upload_filled', format: 'png' },
  { id: '0:12', name: 'frames/analyzing_0', format: 'png' },
  { id: '0:13', name: 'frames/analyzing_35', format: 'png' },
  { id: '0:14', name: 'frames/analyzing_67', format: 'png' },
  { id: '0:15', name: 'frames/analyzing_89', format: 'png' },
  { id: '0:16', name: 'frames/analyzing_100', format: 'png' },
  { id: '0:20', name: 'frames/verdict_angel', format: 'png' },
  { id: '0:21', name: 'frames/verdict_clean', format: 'png' },
  { id: '0:22', name: 'frames/verdict_mid', format: 'png' },
  { id: '0:23', name: 'frames/verdict_radioactive', format: 'png' },
  { id: '0:24', name: 'frames/verdict_toxic', format: 'png' },
  
  // Components for CapCut overlays
  { id: '0:30', name: 'components/logo_neon', format: 'png' },
  { id: '0:31', name: 'components/scan_lines', format: 'png' },
  { id: '0:32', name: 'components/glitch_overlay', format: 'png' },
  { id: '0:33', name: 'components/progress_track', format: 'png' },
  { id: '0:34', name: 'components/red_flag_icon', format: 'png' },
  { id: '0:35', name: 'components/icon_instagram', format: 'png' },
  { id: '0:36', name: 'components/icon_tiktok', format: 'png' },
  { id: '0:37', name: 'components/icon_save', format: 'png' },
  { id: '0:38', name: 'components/qr_placeholder', format: 'png' },
  { id: '0:40', name: 'components/score_0', format: 'png' },
  { id: '0:41', name: 'components/score_1', format: 'png' },
  { id: '0:42', name: 'components/score_2', format: 'png' },
  { id: '0:43', name: 'components/score_3', format: 'png' },
  { id: '0:44', name: 'components/score_7', format: 'png' },
  { id: '0:45', name: 'components/score_toxic', format: 'png' },
  { id: '0:46', name: 'components/tier_radioactive', format: 'png' },
];

async function exportImage(nodeId, name) {
  try {
    const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${nodeId}&format=png&scale=2&suffix=1`;
    const res = await fetch(url, {
      headers: { 'X-Figma-Token': TOKEN }
    });
    const data = await res.json();
    
    if (!data.images || !data.images[nodeId]) {
      console.log(`⚠️  No image for: ${name} (id: ${nodeId})`);
      return;
    }
    
    const imageUrl = data.images[nodeId];
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    
    // Optimize: resize to 1080x1920, strip metadata, compress
    const outputPath = `onread_exports/${name}.png`;
    
    await sharp(buffer)
      .resize(1080, 1920, { fit: 'inside' })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`✅ ${name}.png (${sizeKB}KB)`);
  } catch (err) {
    console.log(`❌ Failed: ${name} — ${err.message}`);
  }
}

async function run() {
  console.log('\n🎬 Starting export...');
  for (const exp of EXPORTS) {
    await exportImage(exp.id, exp.name);
  }
  console.log('\n✨ Export complete! Files in /onread_exports/');
  console.log('Next: Import PNGs into CapCut → apply _Master_Template');
}

run();
SCRIPT

echo ""
echo "📁 Exported to: $OUTPUT_DIR/"
echo "📊 File summary:"
find "$OUTPUT_DIR" -name "*.png" | wc -l | xargs -I {} echo "   PNG files: {}"
echo ""
echo "📱 Next steps:"
echo "  1. Review PNGs — open a few to verify dimensions"
echo "  2. Import into CapCut → drag to timeline as overlays"
echo "  3. Apply saved animations from _Master_Template"
echo "  4. Replace text layers with _tts_dynamic_captions style"
