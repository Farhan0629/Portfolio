/* ==========================================================================
   nav.js — sticky header, mobile panel, and the neon dot that marks the
   section you are currently looking at.
   ========================================================================== */

window.initNav = function () {
  'use strict';

  var U = window.PF;
  var header = U.$('#header');
  var nav = U.$('#nav');
  var toggle = U.$('#navToggle');
  var close = U.$('#navClose');
  var links = U.$$('#navList .nav__link');

  /* ---------- Condense the header once the page moves -------------------- */
  if (header) {
    var setStuck = U.rafThrottle(function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    });
    U.on(window, 'scroll', setStuck, { passive: true });
    setStuck();
  }

  /* ---------- Mobile panel ------------------------------------------------ */
  var isOpen = false;

  /* returnFocus is false when the panel closes because the visitor followed a
     link: focus belongs with the destination, not back on the hamburger. */
  function setMenu(open, returnFocus) {
    if (!nav || !toggle) return;
    isOpen = open;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    /* Stop the page behind the panel from scrolling. */
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && close) close.focus();
    else if (!open && returnFocus !== false) toggle.focus();
  }

  U.on(toggle, 'click', function () { setMenu(!isOpen); });
  U.on(close, 'click', function () { setMenu(false); });

  U.on(document, 'keydown', function (e) {
    if (e.key === 'Escape' && isOpen) setMenu(false);
  });

  /* Tapping a link should navigate *and* close. */
  links.forEach(function (link) {
    U.on(link, 'click', function () {
      if (isOpen) setMenu(false, false);
    });
  });

  /* If the viewport grows past the mobile breakpoint while the panel is open,
     drop the scroll lock — the panel is no longer on screen. */
  var desktop = window.matchMedia('(min-width: 1024px)');
  var onBreakpoint = function () {
    if (desktop.matches && isOpen) setMenu(false, false);
  };
  if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
  else if (desktop.addListener) desktop.addListener(onBreakpoint);

  /* ---------- Active section dot ----------------------------------------- */
  var targets = [];
  var byId = {};

  links.forEach(function (link) {
    var id = (link.getAttribute('href') || '').replace('#', '');
    var section = id ? document.getElementById(id) : null;
    if (!section) return;
    targets.push(section);
    byId[id] = link;
  });

  if (!targets.length) return;

  function markActive(id) {
    links.forEach(function (link) {
      if (link === byId[id]) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if (!('IntersectionObserver' in window)) return;

  var headerH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10
  ) || 78;

  /* The band is the strip just under the header: whichever section owns that
     strip is the one the reader is in. When two sections overlap the band, the
     lower one has just taken over the larger share of it, so it wins. */
  var inBand = {};

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      inBand[entry.target.id] = entry.isIntersecting;
    });

    for (var i = targets.length - 1; i >= 0; i--) {
      if (inBand[targets[i].id]) { markActive(targets[i].id); return; }
    }
  }, {
    rootMargin: '-' + (headerH + 8) + 'px 0px -62% 0px',
    threshold: 0
  });

  targets.forEach(function (section) { observer.observe(section); });

  /* The last section can be too short to ever fill the band, so give the
     bottom of the page to the final nav item. */
  var atBottom = U.rafThrottle(function () {
    var scrolled = window.scrollY + window.innerHeight;
    if (scrolled >= document.documentElement.scrollHeight - 4) {
      markActive(targets[targets.length - 1].id);
    }
  });
  U.on(window, 'scroll', atBottom, { passive: true });
};
