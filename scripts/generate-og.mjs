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

  // 배경 그라데이션
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0,   '#0a2070');
  bg.addColorStop(0.5, '#0D2D84');
  bg.addColorStop(1,   '#1640a8');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 장식 원 (우상단)
  ctx.beginPath();
  ctx.arc(1120, -30, 280, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(1120, -30, 180, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fill();

  // 장식 원 (좌하단)
  ctx.beginPath();
  ctx.arc(80, 680, 220, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  ctx.fill();

  // 파티클 점
  const dots = [
    [920,480],[960,510],[900,530],[980,480],
    [240,120],[200,160],[260,150],[220,100],
  ];
  dots.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fill();
  });

  // 왼쪽 포인트 바
  const bar = ctx.createLinearGradient(0, 200, 0, 430);
  bar.addColorStop(0, '#f472b6');
  bar.addColorStop(1, 'rgba(244,114,182,0)');
  ctx.fillStyle = bar;
  ctx.fillRect(80, 200, 5, 230);

  // 이름 "임윤서"
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 108px "Apple SD Gothic Neo", "AppleGothic", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('임윤서', 112, 318);

  // 핑크 구분선
  ctx.strokeStyle = 'rgba(244,114,182,0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(112, 345);
  ctx.lineTo(560, 345);
  ctx.stroke();

  // "금융전문가"
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.font = '52px "Apple SD Gothic Neo", "AppleGothic", sans-serif';
  ctx.fillText('금융전문가', 112, 415);

  // 소속
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '28px "Apple SD Gothic Neo", "AppleGothic", sans-serif';
  ctx.fillText('숙명여자대학교 경제학부', 112, 470);

  // 우측 뱃지 카드
  roundRect(ctx, 800, 220, 310, 180, 16);
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fill();
  roundRect(ctx, 800, 220, 310, 180, 16);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = 'rgba(244,114,182,0.9)';
  ctx.font = 'bold 22px "Apple SD Gothic Neo", "AppleGothic", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('RESUME', 955, 295);

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '18px "Apple SD Gothic Neo", "AppleGothic", sans-serif';
  ctx.fillText('alicelimti.github.io/day3', 955, 335);

  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = '15px "Apple SD Gothic Neo", "AppleGothic", sans-serif';
  ctx.fillText('2026', 955, 370);

  // 하단 바
  const footer = ctx.createLinearGradient(0, 0, W, 0);
  footer.addColorStop(0, '#f472b6');
  footer.addColorStop(0.5, '#4169E1');
  footer.addColorStop(1, '#0D2D84');
  ctx.fillStyle = footer;
  ctx.fillRect(0, 610, W, 20);

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
