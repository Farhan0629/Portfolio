/* ==========================================================================
   main.js — drops your details into the page, then starts each component.

   Every init is wrapped: if one feature throws, the rest of the site still
   works and the problem is reported once in the console instead of taking
   the page down.
   ========================================================================== */

(function () {
  'use strict';

  var U = window.PF;
  if (!U) return;

  var person = U.personal();

  /* ---------- Text bindings ------------------------------------------------ */
  function bind(name, apply) {
    U.$$('[data-bind="' + name + '"]').forEach(apply);
  }

  bind('location', function (el) {
    if (person.location) el.textContent = person.location;
  });

  bind('emailLink', function (el) {
    if (!person.email) { el.hidden = true; return; }
    el.textContent = person.email;
    el.setAttribute('href', 'mailto:' + person.email);
  });

  /* ---------- Social rows (header panel, contact, footer) ------------------ */
  var socialMarkup = U.socialList();
  ['#navSocials', '#contactSocials', '#footerSocials'].forEach(function (sel) {
    var list = U.$(sel);
    if (!list) return;
    if (!socialMarkup) { list.remove(); return; }
    list.innerHTML = socialMarkup;
  });

  /* ---------- Contact cards ------------------------------------------------ */
  var info = U.$('#contactInfo');

  if (info) {
    var mapUrl = person.mapUrl ||
      (person.location
        ? 'https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent(person.location)
        : '');

    var cards = [
      {
        icon: 'ri-mail-line',
        label: 'Email',
        value: person.email,
        href: person.email ? 'mailto:' + person.email : '',
        external: false
      },
      {
        icon: 'ri-phone-line',
        label: 'Phone',
        value: person.phone,
        href: person.phoneHref ? 'tel:' + person.phoneHref : '',
        external: false
      },
      {
        icon: 'ri-map-pin-line',
        label: 'Location',
        value: person.location,
        href: mapUrl,
        external: true
      }
    ];

    info.innerHTML = cards.filter(function (c) {
      return c.value && c.href;          /* no card without a working link */
    }).map(function (c) {
      return '' +
        '<a class="info card" href="' + U.esc(c.href) + '"' +
          (c.external ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
          '<span class="info__ico"><i class="' + c.icon + '" aria-hidden="true"></i></span>' +
          '<span>' +
            '<span class="info__label mono">' + U.esc(c.label) + '</span>' +
            '<span class="info__value">' + U.esc(c.value) + '</span>' +
          '</span>' +
          '<span class="arrow-btn arrow-btn--ghost" aria-hidden="true">' +
            '<i class="ri-arrow-right-up-line"></i></span>' +
        '</a>';
    }).join('');
  }

  /* ---------- Résumé button (hidden until you add a file) ----------------- */
  var resume = U.$('#resumeBtn');
  if (resume && person.resumeUrl) {
    resume.setAttribute('href', person.resumeUrl);
    resume.setAttribute('target', '_blank');
    resume.setAttribute('rel', 'noopener noreferrer');
    resume.hidden = false;
  }

  /* ---------- Footer year -------------------------------------------------- */
  var year = U.$('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Components --------------------------------------------------
     Order matters in one place only: the reveal animations run last, so they
     can see the cards the other components have just rendered. */
  var boot = [
    ['navigation', window.initNav],
    ['cursor', window.initCursor],
    ['hero', window.initHero],
    ['projects', window.initProjects],
    ['services', window.initServices],
    ['skills', window.initSkills],
    ['education', window.initEducation],
    ['contact form', window.initContact],
    ['scroll', window.initScroll]
  ];

  boot.forEach(function (entry) {
    if (typeof entry[1] !== 'function') return;
    try {
      entry[1]();
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.error('[portfolio] ' + entry[0] + ' failed to start:', err);
    }
  });
})();
