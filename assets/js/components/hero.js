/* ==========================================================================
   hero.js — the "Currently …" typewriter line.

   Roles come from PERSONAL.roles, speeds from SITE_CONFIG.typed. If Typed.js
   is unavailable, or the visitor prefers reduced motion, the first role is
   shown as plain text instead — the line is never empty.
   ========================================================================== */

window.initHero = function () {
  'use strict';

  var U = window.PF;
  var target = U.$('#heroTyped');
  if (!target) return;

  var roles = U.personal().roles || [];
  if (!roles.length) return;

  /* Screen readers get one stable sentence instead of a stream of updates. */
  target.setAttribute('aria-hidden', 'true');
  var sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = roles.join(', ') + '.';
  target.parentNode.appendChild(sr);

  function staticFallback() {
    target.textContent = roles[0];
  }

  if (U.reduced() || typeof window.Typed === 'undefined') {
    staticFallback();
    return;
  }

  var cfg = U.config().typed || {};

  try {
    new window.Typed(target, {
      strings: roles.map(function (r) { return String(r); }),
      typeSpeed: cfg.typeSpeed || 55,
      backSpeed: cfg.backSpeed || 26,
      startDelay: cfg.startDelay || 450,
      backDelay: cfg.backDelay || 1900,
      smartBackspace: cfg.smartBackspace !== false,
      loop: cfg.loop !== false,
      showCursor: true,
      cursorChar: '|',
      /* Roles are plain strings, so no HTML parsing is needed. */
      contentType: 'null'
    });
  } catch (err) {
    staticFallback();
  }
};
