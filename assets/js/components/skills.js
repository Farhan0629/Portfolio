/* ==========================================================================
   skills.js — the four category cards.

   Brand logos are real SVGs from the Simple Icons CDN, used as a CSS mask so
   they take on the site's colours. Each one is probed first: if the request
   fails (wrong slug, offline, blocked) the chip keeps its monogram instead of
   showing a broken square.
   ========================================================================== */

window.initSkills = function () {
  'use strict';

  var U = window.PF;
  var grid = U.$('#skillsGrid');
  var cats = U.list('SKILLS');
  if (!grid || !cats.length) return;

  function monogram(name) {
    return String(name).replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase();
  }

  function pad(n) {
    return (String(n).length < 2 ? '0' : '') + n;
  }

  /* ---------- Markup ------------------------------------------------------ */
  grid.innerHTML = cats.map(function (cat) {
    var items = cat.items || [];

    var chips = items.map(function (item) {
      var style = item.brand ? ' style="--brand:' + U.esc(item.brand) + '"' : '';

      var slot = item.ri
        ? '<i class="chip__ri ' + U.esc(item.ri) + '" aria-hidden="true"></i>'
        : '<span class="chip__logo" aria-hidden="true" data-mono="' +
          U.esc(monogram(item.name)) + '"' +
          ' data-slug="' + U.esc(item.slug || '') + '"' +
          ' data-alt="' + U.esc(item.alt || '') + '"></span>';

      return '<li class="chip"' + style + '>' + slot + U.esc(item.name) + '</li>';
    }).join('');

    return '' +
      '<article class="card s-card' + (cat.featured ? ' s-card--featured' : '') + '"' +
        ' data-reveal>' +
        '<div class="s-card__head">' +
          '<span class="s-card__ico"><i class="' + U.esc(cat.icon || 'ri-stack-line') +
            '" aria-hidden="true"></i></span>' +
          '<div>' +
            '<h3 class="s-card__title">' + U.accent(cat.title) + '</h3>' +
            '<span class="s-card__count mono">' + pad(items.length) + ' skills</span>' +
            (cat.featured
              ? '<span class="tag tag--accent s-card__flag">Main focus</span>'
              : '') +
            (cat.blurb ? '<p class="s-card__blurb">' + U.accent(cat.blurb) + '</p>' : '') +
          '</div>' +
        '</div>' +
        '<ul class="s-card__list">' + chips + '</ul>' +
      '</article>';
  }).join('');

  /* ---------- Logo loading ------------------------------------------------- */
  var base = U.config().logoBase || '';
  if (!base) return;

  U.$$('.chip__logo', grid).forEach(function (slot) {
    var queue = [];
    if (slot.dataset.slug) queue.push(base + slot.dataset.slug + '.svg');
    if (slot.dataset.alt) queue.push(base + slot.dataset.alt + '.svg');

    (function attempt() {
      if (!queue.length) return;            /* monogram stays — nothing breaks */
      var url = queue.shift();
      var probe = new Image();

      probe.onload = function () {
        slot.style.setProperty('--logo', 'url("' + url + '")');
        slot.classList.add('has-logo');
      };
      probe.onerror = attempt;               /* try the alternate slug, then stop */
      probe.src = url;
    })();
  });
};
