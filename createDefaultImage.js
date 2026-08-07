// ──────────────────────────────────────
// Default Test Image Generation
// ──────────────────────────────────────
function createDefaultImage() {
  const offCanvas = document.createElement('canvas');
  offCanvas.width = 800;
  offCanvas.height = 600;
  const ctx = offCanvas.getContext('2d');

  // Background - warm cream
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 600);
  bgGrad.addColorStop(0, '#f5f0e8');
  bgGrad.addColorStop(0.5, '#ede4d8');
  bgGrad.addColorStop(1, '#e8dcc8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 600);

  // Floor / table surface
  const floorGrad = ctx.createLinearGradient(0, 400, 0, 600);
  floorGrad.addColorStop(0, '#d4c5a9');
  floorGrad.addColorStop(1, '#b8a888');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 400, 800, 200);

  // Grid lines on the "wall"
  ctx.strokeStyle = 'rgba(180,160,130,0.5)';
  ctx.lineWidth = 1.5;
  for (let x = 50; x < 800; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, 390);
    ctx.stroke();
  }
  for (let y = 20; y < 400; y += 60) {
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(750, y);
    ctx.stroke();
  }

  // A "document" or "picture frame" on the wall - this is what we'll perspective-correct
  ctx.save();
  ctx.translate(200, 100);
  ctx.rotate(0.08); // Slight rotation
  // The rectangular content
  const docW = 400;
  const docH = 280;
  // White document
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur = 25;
  ctx.shadowOffsetX = 8;
  ctx.shadowOffsetY = 12;
  ctx.fillRect(0, 0, docW, docH);
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Border
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, docW - 6, docH - 6);

  // Inner content - colored rectangles
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
  for (let i = 0; i < 6; i++) {
    const rx = 30 + (i % 3) * 120;
    const ry = 30 + Math.floor(i / 3) * 90;
    ctx.fillStyle = colors[i];
    ctx.fillRect(rx, ry, 90, 65);
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx, ry, 90, 65);
  }

  // Text
  ctx.fillStyle = '#222';
  ctx.font = 'bold 26px "Helvetica Neue", sans-serif';
  ctx.fillText('PERSPECTIVE', 50, 215);
  ctx.font = '16px "Helvetica Neue", sans-serif';
  ctx.fillText('Crop Test Document', 50, 245);
  ctx.fillStyle = '#555';
  ctx.font = '12px sans-serif';
  ctx.fillText('Drag corner pins to rectify →', 50, 268);

  ctx.restore();

  // Some additional elements on the table
  ctx.fillStyle = '#6b5b3a';
  ctx.fillRect(500, 440, 160, 100);
  ctx.fillStyle = '#8b7b5a';
  ctx.fillRect(520, 420, 60, 60);

  // Convert to data URL and load as image
  const dataUrl = offCanvas.toDataURL('image/jpeg', 0.9);
  const img = new Image();
  img.src = dataUrl;
  return img;
}