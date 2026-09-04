/* ==========================================================================
   scroll.js — back-to-top button with a progress ring, plus the section
   reveal animations.
   ========================================================================== */

window.initScroll = function () {
  'use strict';

  var U = window.PF;

  /* ---------- Back to top -------------------------------------------------- */
  var btn = U.$('#toTop');
  var bar = U.$('#toTopBar');

  if (btn) {
    var CIRCUMFERENCE = 2 * Math.PI * 20;   /* r="20" in the markup */

    if (bar) {
      bar.style.strokeDasharray = CIRCUMFERENCE.toFixed(2);
      bar.style.strokeDashoffset = CIRCUMFERENCE.toFixed(2);
    }

    var update = U.rafThrottle(function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var y = window.scrollY || doc.scrollTop || 0;
      var progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      /* Appears once there is something to scroll back up to. */
      btn.classList.toggle('is-visible', y > window.innerHeight * 0.6);

      if (bar) {
        bar.style.strokeDashoffset = (CIRCUMFERENCE * (1 - progress)).toFixed(2);
      }
    });

    U.on(window, 'scroll', update, { passive: true });
    U.on(window, 'resize', update);
    update();

    U.on(btn, 'click', function () {
      window.scrollTo({ top: 0, behavior: U.reduced() ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Reveal on scroll --------------------------------------------- */
  var motion = U.config().motion || {};
  if (motion.scrollReveal === false) return;
  if (U.reduced() || typeof window.ScrollReveal === 'undefined') return;

  /* Deliberately applied to headings, cards and blocks — not to every node,
     which would feel twitchy. */
  var sr = window.ScrollReveal({
    origin: 'bottom',
    distance: '1.25rem',
    duration: 700,
    easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    opacity: 0,
    viewFactor: 0.12,
    reset: false,
    cleanup: true
  });

  sr.reveal('[data-reveal]', { interval: 70 });
};
