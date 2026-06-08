import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import { writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');

// ── 한글 폰트 등록 ──────────────────────────────────────
const fontPaths = [
  '/System/Library/Fonts/AppleSDGothicNeo.ttc',
  '/System/Library/Fonts/Supplemental/AppleGothic.ttf',
  '/Library/Fonts/NanumGothicBold.ttf',
];
for (const p of fontPaths) {
  if (existsSync(p)) {
    GlobalFonts.registerFromPath(p);
    break;
  }
}

// ── 유틸 ────────────────────────────────────────────────
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// ════════════════════════════════════════════════════════
//  OG IMAGE  1200 × 630
// ════════════════════════════════════════════════════════
function generateOG() {
  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // 로얄블루 단색 배경
  ctx.fillStyle = '#4169E1';
  ctx.fillRect(0, 0, W, H);

  // "임윤서입니다" 중앙 정렬
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 148px "Apple SD Gothic Neo", "AppleGothic", sans-serif';
  ctx.fillText('임윤서입니다', W / 2, H / 2);

  writeFileSync(`${publicDir}/og-image.png`, canvas.toBuffer('image/png'));
  console.log('✅ og-image.png 생성 완료');
}

// ════════════════════════════════════════════════════════
//  FAVICON  64 × 64
// ════════════════════════════════════════════════════════
function generateFavicon() {
  const S = 64;
  const canvas = createCanvas(S, S);
  const ctx = canvas.getContext('2d');

  // 원형 배경
  const bg = ctx.createLinearGradient(0, 0, S, S);
  bg.addColorStop(0, '#1540a8');
  bg.addColorStop(1, '#0D2D84');
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
  ctx.fill();

  // "임" 글자
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 34px "Apple SD Gothic Neo", "AppleGothic", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('임', S / 2, S / 2 + 1);

  writeFileSync(`${publicDir}/favicon.png`, canvas.toBuffer('image/png'));
  console.log('✅ favicon.png 생성 완료');
}

generateOG();
generateFavicon();
