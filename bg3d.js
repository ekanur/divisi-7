/**
 * DIVISI 7 (Seven-Layer Corps) - Game Visual Canvas Engine
 * - Scene 1 Background: Ruang Kerja Detektif dengan animasi sorot lampu gantung yang berayun ke kanan dan kiri
 * - Scene 2 Visuals: 3D X-Ray Capsule & Cable Loop
 */
class Divisi7VisualEngine {
  constructor() {
    this.bgCanvas = document.getElementById('bg3dCanvas');
    this.bgCtx = this.bgCanvas ? this.bgCanvas.getContext('2d') : null;

    // Load background image asset (assets/bg.png)
    this.bgImage = new Image();
    this.bgImageLoaded = false;
    this.bgImage.onload = () => {
      this.bgImageLoaded = true;
    };
    this.bgImage.src = 'assets/bg.png';

    this.capsuleCanvas = document.getElementById('xrayCapsuleCanvas');
    this.capsuleCtx = this.capsuleCanvas ? this.capsuleCanvas.getContext('2d') : null;

    this.cableCanvas = document.getElementById('cableLoopCanvas');
    this.cableCtx = this.cableCanvas ? this.cableCanvas.getContext('2d') : null;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.time = 0;
    this.currentScene = 1;
    this.mode = 'normal';
    this.activeLayer = 7;
    this.animBoxStep = 1;
    this.labMode = 'encap';

    this.dustMotes = [];
    this.initDustMotes();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.bgCanvas) {
      this.bgCanvas.width = this.width;
      this.bgCanvas.height = this.height;
    }
  }

  initDustMotes() {
    this.dustMotes = [];
    for (let i = 0; i < 55; i++) {
      this.dustMotes.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.0003,
        vy: -(Math.random() * 0.0004 + 0.0001),
        alpha: Math.random() * 0.45 + 0.15
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.time += 0.022;
    this.drawDetectiveOfficeWithSwingingLamp();
    this.drawXrayCapsule();
    this.drawCableLoop();
  }

  /* ==========================================================================
     BACKGROUND RUANG KERJA DETEKTIF + SOROT LAMPU GANTUNG BERAYUN KANAN-KIRI
     ========================================================================== */
  drawDetectiveOfficeWithSwingingLamp() {
    if (!this.bgCtx) return;
    const ctx = this.bgCtx;
    const w = this.width;
    const h = this.height;
    ctx.clearRect(0, 0, w, h);

    // 1. Gambar Background dari assets/bg.png (Cover fit untuk semua scene)
    if (this.bgImageLoaded || (this.bgImage && this.bgImage.complete && this.bgImage.naturalWidth > 0)) {
      const imgW = this.bgImage.naturalWidth || 1920;
      const imgH = this.bgImage.naturalHeight || 1080;
      const imgRatio = imgW / imgH;
      const canvasRatio = w / h;
      let drawW, drawH, drawX, drawY;
      if (canvasRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }
      ctx.drawImage(this.bgImage, drawX, drawY, drawW, drawH);
    } else {
      // Fallback gelap saat aset gambar sedang dimuat
      const wallGrad = ctx.createLinearGradient(0, 0, 0, h);
      wallGrad.addColorStop(0, '#040811');
      wallGrad.addColorStop(0.65, '#091324');
      wallGrad.addColorStop(1, '#050a14');
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, w, h);
    }

    // 2. ANIMASI LAMPU GANTUNG & SOROT CAHAYA BERAYUN KE KANAN DAN KIRI (Pendulum Swing)
    const pivotX = w * 0.48;
    const pivotY = 0; // Ceiling mount
    const cordLength = h * 0.17;
    // Smooth pendulum swing angle (-0.32 rad to +0.32 rad)
    const swingAngle = Math.sin(this.time * 0.95) * 0.3;

    const lampX = pivotX + Math.sin(swingAngle) * cordLength;
    const lampY = pivotY + Math.cos(swingAngle) * cordLength;

    ctx.save();
    // Draw lamp cord from ceiling to lamp shade
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(lampX, lampY);
    ctx.stroke();

    // Rotate context around the lamp bulb to aim the light cone & shade
    ctx.translate(lampX, lampY);
    ctx.rotate(-swingAngle * 0.92);

    // Volumetric Light Cone (Sorot cahaya lampu gantung)
    const coneHeight = h * 1.15;
    const coneHalfWidth = w * 0.44;
    const coneGrad = ctx.createRadialGradient(0, 10, 6, 0, coneHeight * 0.55, coneHeight * 0.85);
    coneGrad.addColorStop(0, 'rgba(254, 240, 138, 0.42)');
    coneGrad.addColorStop(0.25, 'rgba(56, 189, 248, 0.18)');
    coneGrad.addColorStop(0.65, 'rgba(14, 116, 144, 0.07)');
    coneGrad.addColorStop(1, 'rgba(3, 8, 18, 0)');

    ctx.fillStyle = coneGrad;
    ctx.beginPath();
    ctx.moveTo(-18, 6);
    ctx.lineTo(-coneHalfWidth, coneHeight);
    ctx.lineTo(coneHalfWidth, coneHeight);
    ctx.lineTo(18, 6);
    ctx.closePath();
    ctx.fill();

    // Metal Detective Lamp Shade
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-12, -10);
    ctx.lineTo(12, -10);
    ctx.lineTo(32, 10);
    ctx.lineTo(-32, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing Bulb inside Lamp Shade
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#fef08a';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(0, 10, 9, 0, Math.PI);
    ctx.fill();
    ctx.restore();

    // 4. Floating dust particles illuminated by the swinging light beam
    ctx.save();
    for (const d of this.dustMotes) {
      d.x += d.vx;
      d.y += d.vy;
      if (d.y < 0) d.y = 1;
      if (d.x < 0) d.x = 1;
      if (d.x > 1) d.x = 0;
      const px = d.x * w;
      const py = d.y * h;
      ctx.fillStyle = `rgba(254, 240, 138, ${d.alpha * 0.65})`;
      ctx.beginPath();
      ctx.arc(px, py, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  /* ==========================================================================
     SCENE 2: ANIMASI KOTAK "DATA" ENKAPSULASI X-RAY
     Dimulai dari Layer 7 (kotak kecil bertulis Data) lalu membesar sampai Layer 1 (kotak paling besar)
     ========================================================================== */
  drawXrayCapsule() {
    if (!this.capsuleCtx || !this.capsuleCanvas) return;
    const ctx = this.capsuleCtx;
    const w = this.capsuleCanvas.width;
    const h = this.capsuleCanvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.5;

    // Layer 7 -> step 1 (kotak paling kecil), Layer 1 -> step 7 (kotak paling besar)
    const activeLayer = this.activeLayer || 7;
    const targetStep = 8 - activeLayer; // 1..7
    if (typeof this.animBoxStep !== 'number') this.animBoxStep = targetStep;
    this.animBoxStep += (targetStep - this.animBoxStep) * 0.14;

    const minW = 86;
    const minH = 44;
    const maxW = w * 0.91;
    const maxH = h * 0.84;

    // Ukuran kotak utama yang membesar dari Layer 7 (kecil) ke Layer 1 (paling besar)
    const progress = (this.animBoxStep - 1) / 6; // 0 pada Layer 7 -> 1 pada Layer 1
    const pulse = Math.sin(this.time * 2.4) * 2;
    const mainW = minW + progress * (maxW - minW) + pulse;
    const mainH = minH + progress * (maxH - minH) + pulse * 0.6;
    const mainX = cx - mainW / 2;
    const mainY = cy - mainH / 2;

    // Garis bantu X-Ray halus di latar
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();
    ctx.restore();

    // Gambar lapisan-lapisan pembungkus dari luar (Layer aktif) ke dalam (Layer 7)
    for (let s = targetStep; s >= 1; s--) {
      const stepT = (s - 1) / 6;
      const bw = s === targetStep ? mainW : minW + stepT * (maxW - minW);
      const bh = s === targetStep ? mainH : minH + stepT * (maxH - minH);
      const bx = cx - bw / 2;
      const by = cy - bh / 2;
      const layerNum = 8 - s;
      const isOuterActive = s === targetStep;

      ctx.save();
      if (isOuterActive) {
        const boxGrad = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
        boxGrad.addColorStop(0, 'rgba(6, 78, 115, 0.72)');
        boxGrad.addColorStop(0.5, 'rgba(8, 47, 73, 0.82)');
        boxGrad.addColorStop(1, 'rgba(14, 116, 144, 0.72)');
        ctx.fillStyle = boxGrad;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 18;
        ctx.fillRect(bx, by, bw, bh);

        ctx.strokeStyle = '#67e8f9';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(bx, by, bw, bh);

        // Label Header dan Bentuk Data (PDU) pada kotak yang sedang aktif
        const pduMap = {
          7: 'DATA',
          6: 'DATA',
          5: 'DATA',
          4: this.activeScenario === 'udp' ? 'DATAGRAM' : 'SEGMENT',
          3: 'PACKET',
          2: 'FRAME',
          1: 'BITS (BINER)'
        };
        if (layerNum < 7 && layerNum > 1) {
          ctx.fillStyle = '#fef08a';
          ctx.font = 'bold 10px "Consolas", monospace';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          ctx.fillText(`+ Header L${layerNum}`, bx + 7, by + 5);
        }
        if (bw > 130) {
          ctx.fillStyle = '#67e8f9';
          ctx.font = 'bold 10px "Consolas", monospace';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'top';
          ctx.fillText(`PDU: ${pduMap[layerNum] || 'DATA'}`, bx + bw - 7, by + 5);
        }
      } else {
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(bx, by, bw, bh);
      }
      ctx.restore();
    }

    // Pada Layer 1 (Physical), animasi "Data" berubah menjadi animasi biner (deretan 0 dan 1)
    if (activeLayer === 1) {
      ctx.save();
      // Klip di dalam kotak paling besar agar animasi biner rapi di dalam kotak
      ctx.beginPath();
      ctx.rect(mainX + 6, mainY + 20, Math.max(40, mainW - 12), Math.max(30, mainH - 26));
      ctx.clip();

      const bitRows = [
        '10110010 01001000 11010110 00101101',
        '01011010 11100101 01001100 10110011',
        '11001011 00110101 10101001 01101010',
        '00110110 10101100 01110010 11001001'
      ];
      const scrollOffset = (this.time * 48) % 140;

      ctx.font = 'bold 13px "Consolas", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      bitRows.forEach((rowStr, rIdx) => {
        const ry = mainY + 42 + rIdx * 28;
        const dir = rIdx % 2 === 0 ? -1 : 1;
        const shiftX = dir * scrollOffset;

        // Tampilkan deretan biner bergerak dengan kilau sian & hijau
        ctx.fillStyle = rIdx % 2 === 0 ? '#67e8f9' : '#4ade80';
        ctx.shadowColor = rIdx % 2 === 0 ? '#00e5ff' : '#22c55e';
        ctx.shadowBlur = 8;

        const dynamicBits = rowStr
          .split('')
          .map((ch, cIdx) => {
            if (ch === ' ') return ' ';
            const flip = Math.floor(this.time * 5 + rIdx * 3 + cIdx) % 7 === 0;
            return flip ? (ch === '1' ? '0' : '1') : ch;
          })
          .join('');

        ctx.fillText(dynamicBits + '   ' + dynamicBits, mainX - 90 + shiftX, ry);
      });

      // Sinyal gelombang kotak digital (Square Wave) di bagian bawah kotak Layer 1
      const waveY = mainY + mainH - 18;
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      const stepW = 16;
      const phase = Math.floor(this.time * 8);
      for (let x = mainX + 12, i = 0; x < mainX + mainW - 12; x += stepW, i++) {
        const isHigh = (i + phase) % 2 === 0;
        const yLevel = isHigh ? waveY - 8 : waveY + 4;
        if (i === 0) ctx.moveTo(x, yLevel);
        else ctx.lineTo(x, yLevel);
        ctx.lineTo(Math.min(x + stepW, mainX + mainW - 12), yLevel);
      }
      ctx.stroke();

      // Badge label "BINER (BITS)" di tengah
      ctx.fillStyle = 'rgba(2, 10, 22, 0.82)';
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1.5;
      ctx.fillRect(cx - 64, cy - 16, 128, 32);
      ctx.strokeRect(cx - 64, cy - 16, 128, 32);

      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 10;
      ctx.font = '900 15px "Consolas", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerBits = Math.floor(this.time * 4) % 2 === 0 ? '1 0 1 1 0 1 0 0' : '0 1 0 0 1 0 1 1';
      ctx.fillText(centerBits, cx, cy);
      ctx.restore();
    } else {
      // Layer 7 s.d Layer 2: Kotak inti bertuliskan "Data" yang membesar
      ctx.save();
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ffffff';
      const fontSize = Math.round(15 + progress * 9);
      ctx.font = `900 ${fontSize}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Data', cx, cy);
      ctx.restore();
    }
  }

  /* ==========================================================================
     SCENE 2: ANIMASI PENGHUBUNG LAYER 1 (SENDER) KE LAYER 1 (RECEIVER)
     ========================================================================== */
  drawCableLoop() {
    if (!this.cableCtx || !this.cableCanvas) return;
    const ctx = this.cableCtx;
    const w = this.cableCanvas.width;
    const h = this.cableCanvas.height;
    ctx.clearRect(0, 0, w, h);

    const leftX = w * 0.21;
    const rightX = w * 0.79;
    const topY = 4;
    const midY = h * 0.56;
    const cx = w * 0.5;

    ctx.save();

    // Jalur kabel utama U-shape dari Layer 1 Sender (kiri) ke Layer 1 Receiver (kanan)
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.moveTo(leftX, topY);
    ctx.lineTo(leftX, midY - 10);
    ctx.quadraticCurveTo(leftX, midY, leftX + 12, midY);
    ctx.lineTo(rightX - 12, midY);
    ctx.quadraticCurveTo(rightX, midY, rightX, midY - 10);
    ctx.lineTo(rightX, topY);
    ctx.stroke();

    // Titik konektor pada Layer 1 Sender & Layer 1 Receiver
    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.arc(leftX, topY + 2, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(rightX, topY + 2, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Panah masuk ke Layer 1 Receiver di kanan atas (↑)
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(rightX, topY + 3);
    ctx.lineTo(rightX - 5, topY + 12);
    ctx.lineTo(rightX + 5, topY + 12);
    ctx.closePath();
    ctx.fill();

    // Animasi paket/pulsa data berjalan dari Layer 1 Sender -> Layer 1 Receiver
    const getPointOnPath = (t) => {
      // t dari 0 (Layer 1 Sender) s.d 1 (Layer 1 Receiver)
      if (t < 0.2) {
        const local = t / 0.2;
        return { x: leftX, y: topY + local * (midY - topY) };
      } else if (t < 0.8) {
        const local = (t - 0.2) / 0.6;
        return { x: leftX + local * (rightX - leftX), y: midY };
      } else {
        const local = (t - 0.8) / 0.2;
        return { x: rightX, y: midY - local * (midY - topY) };
      }
    };

    for (let i = 0; i < 4; i++) {
      const t = ((this.time * 0.42 + i * 0.25) % 1);
      const pt = getPointOnPath(t);
      ctx.save();
      ctx.fillStyle = i % 2 === 0 ? '#67e8f9' : '#facc15';
      ctx.shadowColor = i % 2 === 0 ? '#00e5ff' : '#facc15';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2);
      ctx.fill();

      // Bit biner kecil mengikuti pulsa di jalur horizontal
      if (t >= 0.22 && t <= 0.78) {
        ctx.font = 'bold 10px "Consolas", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        const bitChar = (Math.floor(this.time * 6 + i) % 2) === 0 ? '1' : '0';
        ctx.fillText(bitChar, pt.x, pt.y - 9);
      }
      ctx.restore();
    }

    // Label keterangan penghubung Layer 1 di bagian bawah jalur
    ctx.fillStyle = '#bae6fd';
    ctx.font = 'bold 10.5px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Transmisi Fisik: Layer 1 (Sender) ──[ Biner 101101 ]──► Layer 1 (Receiver)', cx, midY + 10);

    ctx.restore();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.bg3d = new Divisi7VisualEngine();
});
