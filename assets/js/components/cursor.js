/* ==========================================================================
   cursor.js — the soft green light that trails the pointer.

   Decorative only: the real cursor is never hidden, and the whole thing is
   skipped on touch devices and when reduced motion is requested.
   ========================================================================== */

window.initCursor = function () {
  'use strict';

  var U = window.PF;
  var glow = U.$('#cursorGlow');
  if (!glow) return;

  var cfg = U.config().motion || {};
  if (cfg.cursorGlow === false || U.coarse() || U.reduced()) {
    glow.remove();
    return;
  }

  var targetX = window.innerWidth / 2;
  var targetY = window.innerHeight / 2;
  var x = targetX;
  var y = targetY;
  var visible = false;
  var running = false;

  /* Anything worth reacting to gets a slightly brighter, larger glow. */
  var HOT = 'a, button, input, textarea, .card, .acc__trigger, .chip, .swiper-slide';

  function frame() {
    /* Simple exponential easing: fast enough to feel attached, slow enough
       to feel like light rather than a second cursor. */
    x += (targetX - x) * 0.14;
    y += (targetY - y) * 0.14;

    /* Transform only — this never triggers layout. */
    glow.style.transform = 'translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, 0)';

    if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) {
      requestAnimationFrame(frame);
    } else {
      running = false;
    }
  }

  function kick() {
    if (running) return;
    running = true;
    requestAnimationFrame(frame);
  }

  U.on(window, 'pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    targetX = e.clientX;
    targetY = e.clientY;

    if (!visible) {
      visible = true;
      glow.classList.add('is-visible');
    }
    kick();
  }, { passive: true });

  /* Fade out when the pointer leaves the window entirely. */
  U.on(document, 'pointerleave', function () {
    visible = false;
    glow.classList.remove('is-visible');
  });

  U.on(document, 'pointerover', function (e) {
    var hot = e.target && e.target.closest && e.target.closest(HOT);
    glow.classList.toggle('is-hot', !!hot);
  }, { passive: true });
};
