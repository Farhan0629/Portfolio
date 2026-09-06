/* ==========================================================================
   bg-canvas.js — seven scroll-reactive background visual modes.

   Each section of the portfolio has a unique visual that fades in when the
   section enters view and fades out when the visitor scrolls away.

   Modes:
     0  Hero      — Network Constellation (connected floating nodes)
     1  About     — Gradient Mesh Breathing (slow lava-lamp gradients)
     2  Works     — Floating Grid Plane (perspective wireframe)
     3  Services  — Circuit Pulse (flowing data along circuit paths)
     4  Skills    — Hexagonal Mesh (honeycomb tessellation)
     5  Education — Topographic Lines (morphing contour waves)
     6  Contact   — Particle Drift (sparse glowing embers rising)

   Mouse interaction on desktop: nodes/particles gently repel from cursor,
   and faint connection lines draw from cursor to nearby elements.

   Performance: canvas renders at 50–75 % native resolution and is upscaled
   via CSS. Particle counts are halved on mobile. Animation pauses when the
   tab is hidden. Respects prefers-reduced-motion.
   ========================================================================== */

window.initBgCanvas = function () {
  'use strict';

  var canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  /* Respect reduced-motion: draw nothing */
  if (window.PF && window.PF.reduced && window.PF.reduced()) return;

  /* ---------- Config ------------------------------------------------------ */
  var ALPHA     = 0.095;               /* 9.5 % master opacity               */
  var MOBILE    = window.innerWidth < 768;
  var RES       = MOBILE ? 0.5 : 0.75; /* canvas resolution scale            */
  var FADE_SPD  = 0.03;                /* cross-fade speed per frame          */
  var AR = 85, AG = 242, AB = 62;      /* accent colour channels              */

  var W, H, cW, cH;                    /* viewport + canvas pixel sizes       */

  /* ---------- Mouse ------------------------------------------------------- */
  var mx = -9999, my = -9999, mOn = false;

  /* ---------- State ------------------------------------------------------- */
  var cur = 0, nxt = 0, fade = 1;      /* mode indices + transition alpha     */
  var time = 0, sY = 0, alive = true;

  var SECTS = ['home', 'about', 'works', 'services', 'skills', 'education', 'contact'];

  /* ---------- Helpers ----------------------------------------------------- */
  function rgba(a) { return 'rgba(' + AR + ',' + AG + ',' + AB + ',' + a + ')'; }
  function dist(ax, ay, bx, by) { var dx = ax - bx, dy = ay - by; return Math.sqrt(dx * dx + dy * dy); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function rnd(lo, hi) { return Math.random() * (hi - lo) + lo; }
  function cmx() { return mx * RES; }
  function cmy() { return my * RES; }

  /* ---------- Sizing ------------------------------------------------------ */
  function resize() {
    W  = window.innerWidth;
    H  = window.innerHeight;
    cW = Math.round(W * RES);
    cH = Math.round(H * RES);
    canvas.width  = cW;
    canvas.height = cH;
    MOBILE = W < 768;
    initMode0(); initMode3(); initMode6();
  }

  /* ---------- Section detection ------------------------------------------- */
  function detect() {
    var mid = sY + H * 0.45;
    for (var i = SECTS.length - 1; i >= 0; i--) {
      var el = document.getElementById(SECTS[i]);
      if (el && el.offsetTop <= mid) return i;
    }
    return 0;
  }

  /* ========================================================================
     MODE 0 — Network Constellation (Hero)
     ======================================================================== */
  var n0 = [];
  var N0_CT = MOBILE ? 25 : 50;
  var N0_LINK = 120;
  var N0_MR   = 120;

  function initMode0() {
    n0 = [];
    for (var i = 0; i < (MOBILE ? 25 : 50); i++) {
      n0.push({ x: rnd(0, cW), y: rnd(0, cH),
                vx: rnd(-0.3, 0.3), vy: rnd(-0.3, 0.3), r: rnd(1, 2.5) });
    }
  }

  function drawMode0(a) {
    var link = N0_LINK * RES, mr = N0_MR * RES;
    var cx = cmx(), cy = cmy();
    var i, j, n, m, d;

    for (i = 0; i < n0.length; i++) {
      n = n0[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < -10) n.x = cW + 10;
      if (n.x > cW + 10) n.x = -10;
      if (n.y < -10) n.y = cH + 10;
      if (n.y > cH + 10) n.y = -10;

      /* Mouse repulsion */
      if (mOn && !MOBILE) {
        d = dist(n.x, n.y, cx, cy);
        if (d < mr && d > 1) {
          var f = (1 - d / mr) * 0.9;
          n.x += (n.x - cx) / d * f;
          n.y += (n.y - cy) / d * f;
        }
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, 6.283);
      ctx.fillStyle = rgba(a * 0.8);
      ctx.fill();

      /* Connections */
      for (j = i + 1; j < n0.length; j++) {
        m = n0[j]; d = dist(n.x, n.y, m.x, m.y);
        if (d < link) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = rgba(a * (1 - d / link) * 0.4);
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }

      /* Mouse connections */
      if (mOn && !MOBILE) {
        d = dist(n.x, n.y, cx, cy);
        if (d < link * 1.3) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y); ctx.lineTo(cx, cy);
          ctx.strokeStyle = rgba(a * (1 - d / (link * 1.3)) * 0.35);
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }

    /* Mouse glow */
    if (mOn && !MOBILE) {
      var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30 * RES);
      g.addColorStop(0, rgba(a * 0.5));
      g.addColorStop(1, rgba(0));
      ctx.beginPath(); ctx.arc(cx, cy, 30 * RES, 0, 6.283);
      ctx.fillStyle = g; ctx.fill();
    }
  }

  /* ========================================================================
     MODE 1 — Gradient Mesh Breathing (About)
     ======================================================================== */
  var blobs = [
    { ph: 0,   spd: 0.0004, rx: 0.3, ry: 0.4 },
    { ph: 2.1, spd: 0.0003, rx: 0.7, ry: 0.3 },
    { ph: 4.2, spd: 0.00035, rx: 0.5, ry: 0.7 }
  ];

  function drawMode1(a) {
    for (var i = 0; i < blobs.length; i++) {
      var b = blobs[i];
      var t = time * b.spd + b.ph;
      var bx = cW * (b.rx + Math.sin(t) * 0.15);
      var by = cH * (b.ry + Math.cos(t * 0.7) * 0.12);
      var br = cW * (0.28 + Math.sin(t * 0.5) * 0.08);

      var g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      g.addColorStop(0,   rgba(a * 0.35));
      g.addColorStop(0.5, rgba(a * 0.12));
      g.addColorStop(1,   rgba(0));
      ctx.beginPath(); ctx.arc(bx, by, br, 0, 6.283);
      ctx.fillStyle = g; ctx.fill();
    }

    /* Mouse glow */
    if (mOn && !MOBILE) {
      var g2 = ctx.createRadialGradient(cmx(), cmy(), 0, cmx(), cmy(), 60 * RES);
      g2.addColorStop(0, rgba(a * 0.25));
      g2.addColorStop(1, rgba(0));
      ctx.beginPath(); ctx.arc(cmx(), cmy(), 60 * RES, 0, 6.283);
      ctx.fillStyle = g2; ctx.fill();
    }
  }

  /* ========================================================================
     MODE 2 — Floating Grid Plane (Works)
     ======================================================================== */
  function drawMode2(a) {
    var sp = (MOBILE ? 50 : 35) * RES;
    var cols = Math.ceil(cW / sp) + 1;
    var rows = Math.ceil(cH / sp) + 1;
    var ofsX = (time * 0.008) % sp;
    var ofsY = (time * 0.005) % sp;

    ctx.lineWidth = 0.4;

    /* Vertical lines */
    for (var c = -1; c <= cols; c++) {
      var x = c * sp - ofsX;
      var pulse = Math.sin(time * 0.0008 + c * 0.6) * 0.5 + 0.5;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, cH);
      ctx.strokeStyle = rgba(a * (0.06 + pulse * 0.08));
      ctx.stroke();
    }

    /* Horizontal lines */
    for (var r = -1; r <= rows; r++) {
      var y = r * sp - ofsY;
      var pulse2 = Math.sin(time * 0.0006 + r * 0.5) * 0.5 + 0.5;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cW, y);
      ctx.strokeStyle = rgba(a * (0.06 + pulse2 * 0.08));
      ctx.stroke();
    }

    /* Intersection dots */
    for (var cr = -1; cr <= rows; cr++) {
      for (var cc = -1; cc <= cols; cc++) {
        var ix = cc * sp - ofsX;
        var iy = cr * sp - ofsY;
        var dp = Math.sin(time * 0.001 + cc * 0.4 + cr * 0.3) * 0.5 + 0.5;
        ctx.beginPath(); ctx.arc(ix, iy, 1.2, 0, 6.283);
        ctx.fillStyle = rgba(a * (0.1 + dp * 0.15));
        ctx.fill();
      }
    }

    /* Mouse glow at intersections */
    if (mOn && !MOBILE) {
      var g = ctx.createRadialGradient(cmx(), cmy(), 0, cmx(), cmy(), 50 * RES);
      g.addColorStop(0, rgba(a * 0.3));
      g.addColorStop(1, rgba(0));
      ctx.beginPath(); ctx.arc(cmx(), cmy(), 50 * RES, 0, 6.283);
      ctx.fillStyle = g; ctx.fill();
    }
  }

  /* ========================================================================
     MODE 3 — Circuit Pulse (Services)
     ======================================================================== */
  var cir3 = [], pul3 = [];

  function initMode3() {
    cir3 = []; pul3 = [];
    var ct = MOBILE ? 8 : 15;
    for (var i = 0; i < ct; i++) {
      var segs = [], sx = rnd(cW * 0.05, cW * 0.95), sy = rnd(cH * 0.05, cH * 0.95);
      var px = sx, py = sy;
      for (var s = 0, sc = Math.floor(rnd(3, 7)); s < sc; s++) {
        var horiz = s % 2 === 0;
        var len = rnd(30, 100) * RES;
        var ex = horiz ? px + (Math.random() > 0.5 ? len : -len) : px;
        var ey = horiz ? py : py + (Math.random() > 0.5 ? len : -len);
        segs.push({ x1: px, y1: py, x2: ex, y2: ey });
        px = ex; py = ey;
      }
      cir3.push(segs);
    }
  }

  function drawMode3(a) {
    var i, s, seg;
    ctx.lineWidth = 0.7;

    /* Draw paths */
    for (i = 0; i < cir3.length; i++) {
      for (s = 0; s < cir3[i].length; s++) {
        seg = cir3[i][s];
        ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2);
        ctx.strokeStyle = rgba(a * 0.18);
        ctx.stroke();
        /* Junction node */
        ctx.beginPath(); ctx.arc(seg.x1, seg.y1, 1.8, 0, 6.283);
        ctx.fillStyle = rgba(a * 0.25); ctx.fill();
      }
      /* End node */
      var last = cir3[i][cir3[i].length - 1];
      ctx.beginPath(); ctx.arc(last.x2, last.y2, 1.8, 0, 6.283);
      ctx.fillStyle = rgba(a * 0.25); ctx.fill();
    }

    /* Spawn pulses */
    if (Math.random() < 0.025 && pul3.length < 10) {
      pul3.push({ ci: Math.floor(rnd(0, cir3.length)), p: 0, spd: rnd(0.006, 0.018) });
    }

    /* Draw pulses */
    for (i = pul3.length - 1; i >= 0; i--) {
      var pu = pul3[i]; pu.p += pu.spd;
      if (pu.p > 1) { pul3.splice(i, 1); continue; }
      var segs2 = cir3[pu.ci];
      var si = Math.min(Math.floor(pu.p * segs2.length), segs2.length - 1);
      var sp = (pu.p * segs2.length) - si;
      seg = segs2[si];
      var ppx = lerp(seg.x1, seg.x2, sp);
      var ppy = lerp(seg.y1, seg.y2, sp);

      var g = ctx.createRadialGradient(ppx, ppy, 0, ppx, ppy, 14 * RES);
      g.addColorStop(0, rgba(a * 1.2));
      g.addColorStop(1, rgba(0));
      ctx.beginPath(); ctx.arc(ppx, ppy, 14 * RES, 0, 6.283);
      ctx.fillStyle = g; ctx.fill();
    }

    /* Mouse glow */
    if (mOn && !MOBILE) {
      var g3 = ctx.createRadialGradient(cmx(), cmy(), 0, cmx(), cmy(), 40 * RES);
      g3.addColorStop(0, rgba(a * 0.3));
      g3.addColorStop(1, rgba(0));
      ctx.beginPath(); ctx.arc(cmx(), cmy(), 40 * RES, 0, 6.283);
      ctx.fillStyle = g3; ctx.fill();
    }
  }

  /* ========================================================================
     MODE 4 — Hexagonal Mesh (Skills)
     ======================================================================== */
  function drawMode4(a) {
    var hr = (MOBILE ? 32 : 24) * RES;
    var hw = hr * 2;
    var hh = Math.sqrt(3) * hr;
    var cols = Math.ceil(cW / (hw * 0.75)) + 2;
    var rows = Math.ceil(cH / hh) + 2;
    var zoom = 1 + Math.sin(time * 0.00012) * 0.04;

    ctx.lineWidth = 0.5;

    for (var r = -1; r < rows; r++) {
      for (var c = -1; c < cols; c++) {
        var hx = c * hw * 0.75;
        var hy = r * hh + (c % 2 ? hh / 2 : 0);

        /* Zoom from center */
        hx = cW / 2 + (hx - cW / 2) * zoom;
        hy = cH / 2 + (hy - cH / 2) * zoom;

        if (hx < -hr * 2 || hx > cW + hr * 2 || hy < -hr * 2 || hy > cH + hr * 2) continue;

        var glow = Math.sin(time * 0.0007 + c * 0.5 + r * 0.7) * 0.5 + 0.5;
        ctx.beginPath();
        for (var v = 0; v < 6; v++) {
          var ang = Math.PI / 3 * v - Math.PI / 6;
          var vx = hx + hr * zoom * Math.cos(ang);
          var vy = hy + hr * zoom * Math.sin(ang);
          if (v === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
        }
        ctx.closePath();
        ctx.strokeStyle = rgba(a * (0.06 + glow * 0.12));
        ctx.stroke();
      }
    }

    /* Mouse highlight hex */
    if (mOn && !MOBILE) {
      var g = ctx.createRadialGradient(cmx(), cmy(), 0, cmx(), cmy(), hr * 3);
      g.addColorStop(0, rgba(a * 0.2));
      g.addColorStop(1, rgba(0));
      ctx.beginPath(); ctx.arc(cmx(), cmy(), hr * 3, 0, 6.283);
      ctx.fillStyle = g; ctx.fill();
    }
  }

  /* ========================================================================
     MODE 5 — Topographic Lines (Education)
     ======================================================================== */
  function drawMode5(a) {
    var lc = MOBILE ? 7 : 12;
    var pts = MOBILE ? 50 : 100;
    var step = cW / pts;

    ctx.lineWidth = 0.8;

    for (var l = 0; l < lc; l++) {
      var baseY = cH * (l + 1) / (lc + 1);
      ctx.beginPath();

      for (var p = 0; p <= pts; p++) {
        var x = p * step;
        var w1 = Math.sin(x * 0.008 + time * 0.0003 + l * 1.2) * 28 * RES;
        var w2 = Math.sin(x * 0.015 + time * 0.0002 - l * 0.8) * 16 * RES;
        var w3 = Math.cos(x * 0.005 + time * 0.00015 + l * 2) * 22 * RES;
        var y = baseY + w1 + w2 + w3;
        if (p === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = rgba(a * (0.12 + Math.sin(time * 0.0004 + l) * 0.05));
      ctx.stroke();
    }

    /* Mouse ripple */
    if (mOn && !MOBILE) {
      var g = ctx.createRadialGradient(cmx(), cmy(), 0, cmx(), cmy(), 55 * RES);
      g.addColorStop(0, rgba(a * 0.2));
      g.addColorStop(1, rgba(0));
      ctx.beginPath(); ctx.arc(cmx(), cmy(), 55 * RES, 0, 6.283);
      ctx.fillStyle = g; ctx.fill();
    }
  }

  /* ========================================================================
     MODE 6 — Particle Drift (Contact)
     ======================================================================== */
  var p6 = [];

  function initMode6() {
    p6 = [];
    for (var i = 0, ct = MOBILE ? 12 : 22; i < ct; i++) {
      p6.push({ x: rnd(0, cW), y: rnd(0, cH),
                vy: -rnd(0.12, 0.38), r: rnd(1, 3), ph: rnd(0, 6.283) });
    }
  }

  function drawMode6(a) {
    var i, p;
    for (i = 0; i < p6.length; i++) {
      p = p6[i];
      p.y += p.vy;
      p.x += Math.sin(time * 0.0005 + p.ph) * 0.15;
      if (p.y < -10) { p.y = cH + 10; p.x = rnd(0, cW); }

      /* Mouse repel */
      if (mOn && !MOBILE) {
        var d = dist(p.x, p.y, cmx(), cmy());
        if (d < 80 * RES && d > 1) {
          p.x += (p.x - cmx()) / d * 0.4;
          p.y += (p.y - cmy()) / d * 0.4;
        }
      }

      var pulse = Math.sin(time * 0.001 + p.ph) * 0.3 + 0.7;

      /* Glow */
      var gr = p.r * 5;
      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
      g.addColorStop(0, rgba(a * pulse * 0.5));
      g.addColorStop(1, rgba(0));
      ctx.beginPath(); ctx.arc(p.x, p.y, gr, 0, 6.283);
      ctx.fillStyle = g; ctx.fill();

      /* Core */
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = rgba(a * pulse * 0.9);
      ctx.fill();
    }

    /* Mouse glow */
    if (mOn && !MOBILE) {
      var g2 = ctx.createRadialGradient(cmx(), cmy(), 0, cmx(), cmy(), 35 * RES);
      g2.addColorStop(0, rgba(a * 0.35));
      g2.addColorStop(1, rgba(0));
      ctx.beginPath(); ctx.arc(cmx(), cmy(), 35 * RES, 0, 6.283);
      ctx.fillStyle = g2; ctx.fill();
    }
  }

  /* ========================================================================
     MODE DISPATCH
     ======================================================================== */
  var drawFn = [drawMode0, drawMode1, drawMode2, drawMode3,
                drawMode4, drawMode5, drawMode6];

  /* ========================================================================
     ANIMATION LOOP
     ======================================================================== */
  var last = 0;

  function loop(ts) {
    if (!alive) { requestAnimationFrame(loop); return; }

    var dt = ts - last; last = ts;
    if (dt > 100) dt = 16;         /* cap after tab-switch */
    time += dt;

    /* Detect section */
    var det = detect();
    if (det !== nxt) nxt = det;

    /* Cross-fade */
    if (cur !== nxt) {
      fade -= FADE_SPD;
      if (fade <= 0) { cur = nxt; fade = 0; }
    } else if (fade < 1) {
      fade += FADE_SPD;
      if (fade > 1) fade = 1;
    }

    /* Clear */
    ctx.clearRect(0, 0, cW, cH);

    /* Draw active mode(s) */
    if (cur !== nxt) {
      drawFn[cur](ALPHA * fade);
      drawFn[nxt](ALPHA * (1 - fade));
    } else {
      drawFn[cur](ALPHA * fade);
    }

    requestAnimationFrame(loop);
  }

  /* ========================================================================
     EVENTS & INIT
     ======================================================================== */
  resize();

  window.addEventListener('resize', resize);

  var sTick = null;
  window.addEventListener('scroll', function () {
    if (!sTick) {
      sTick = requestAnimationFrame(function () {
        sY = window.pageYOffset || document.documentElement.scrollTop;
        sTick = null;
      });
    }
  }, { passive: true });

  if (!MOBILE) {
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY; mOn = true;
    });
    document.addEventListener('mouseleave', function () { mOn = false; });
  }

  document.addEventListener('visibilitychange', function () {
    alive = !document.hidden;
  });

  requestAnimationFrame(loop);
};
