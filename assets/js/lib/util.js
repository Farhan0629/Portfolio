/* ==========================================================================
   util.js — tiny helpers shared by every component.

   Plain scripts, no build step, no modules: the site works when you simply
   double-click index.html. Everything hangs off one global, PF.
   ========================================================================== */

window.PF = (function () {
  'use strict';

  var U = {};

  /* ---------- DOM --------------------------------------------------------- */
  U.$ = function (sel, root) {
    return (root || document).querySelector(sel);
  };

  U.$$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  U.on = function (target, type, fn, opts) {
    if (target) target.addEventListener(type, fn, opts || false);
  };

  /* ---------- Text -------------------------------------------------------- */
  /* Always escape data before it goes near innerHTML. */
  U.esc = function (value) {
    return String(value === null || value === undefined ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  /* Escapes, then turns *starred words* into neon-green spans.
     Write "secure *by default*" in any data file to highlight a phrase. */
  U.accent = function (value) {
    return U.esc(value).replace(/\*([^*]+)\*/g, '<span class="accent">$1</span>');
  };

  /* A value is "filled in" if it exists and is not an unedited placeholder. */
  U.filled = function (value) {
    if (!value) return false;
    var v = String(value).trim();
    return v !== '' && v.indexOf('VITE_') !== 0;
  };

  /* ---------- Preferences ------------------------------------------------- */
  U.reduced = function () {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  U.coarse = function () {
    return window.matchMedia('(hover: none), (pointer: coarse)').matches;
  };

  /* ---------- Config / data (never throw if a file is missing) ------------ */
  U.config = function () {
    return window.SITE_CONFIG || {};
  };

  U.personal = function () {
    return window.PERSONAL || {};
  };

  U.list = function (name) {
    return Array.isArray(window[name]) ? window[name] : [];
  };

  /* ---------- Scheduling -------------------------------------------------- */
  /* Collapses a burst of scroll/mouse events into one frame. */
  U.rafThrottle = function (fn) {
    var queued = false;
    var lastArgs;
    return function () {
      lastArgs = arguments;
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        fn.apply(null, lastArgs);
      });
    };
  };

  /* ---------- Small builders ---------------------------------------------- */
  U.tags = function (items, extraClass) {
    if (!items || !items.length) return '';
    var cls = 'tag' + (extraClass ? ' ' + extraClass : '');
    return '<ul class="tag-list">' + items.map(function (t) {
      return '<li class="' + cls + '">' + U.esc(t) + '</li>';
    }).join('') + '</ul>';
  };

  U.socialList = function () {
    var socials = U.personal().socials || [];
    return socials.map(function (s) {
      if (!s || !s.url) return '';
      return '<li><a class="social" href="' + U.esc(s.url) + '" target="_blank" ' +
        'rel="noopener noreferrer" aria-label="' + U.esc(s.label) + '">' +
        '<i class="' + U.esc(s.icon || 'ri-link') + '" aria-hidden="true"></i></a></li>';
    }).join('');
  };

  return U;
})();
