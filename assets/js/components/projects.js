/* ==========================================================================
   projects.js — builds the Works cards from PROJECTS, then hands the rail to
   Swiper. If Swiper never loads the rail becomes a plain scroll-snap strip,
   so the projects are always reachable.
   ========================================================================== */

window.initProjects = function () {
  'use strict';

  var U = window.PF;
  var track = U.$('#worksTrack');
  var shell = U.$('#worksSwiper');
  var controls = U.$('.works__controls');
  var items = U.list('PROJECTS');

  if (!track || !shell) return;

  if (!items.length) {
    shell.remove();
    if (controls) controls.remove();
    return;
  }

  /* ---------- Markup ------------------------------------------------------ */
  function link(href, icon, label) {
    return '<a href="' + U.esc(href) + '" target="_blank" rel="noopener noreferrer">' +
      '<i class="' + icon + '" aria-hidden="true"></i>' + U.esc(label) +
      '<span class="sr-only"> (opens in a new tab)</span></a>';
  }

  track.innerHTML = items.map(function (p) {
    var primary = p.demo || p.repo || '';
    var links = '';

    if (p.repo) links += link(p.repo, 'ri-github-fill', 'Source');
    if (p.demo) links += link(p.demo, 'ri-external-link-line', 'Live demo');

    return '' +
      '<div class="swiper-slide">' +
        '<article class="card p-card">' +
          '<div class="p-card__media">' +
            '<img src="' + U.esc(p.image) + '" alt="' + U.esc(p.alt || p.title) + '" ' +
              'width="1200" height="800" loading="lazy" decoding="async">' +
            (p.category ? '<p class="p-card__cat">' + U.esc(p.category) + '</p>' : '') +
          '</div>' +

          (primary
            ? '<a class="arrow-btn p-card__go" href="' + U.esc(primary) + '" ' +
              'target="_blank" rel="noopener noreferrer" ' +
              'aria-label="Open ' + U.esc(p.title) + ' (opens in a new tab)">' +
              '<i class="ri-arrow-right-up-line" aria-hidden="true"></i></a>'
            : '') +

          '<div class="p-card__body">' +
            '<p class="p-card__num">' + U.esc(p.num) + '</p>' +
            '<h3 class="p-card__title">' + U.accent(p.title) + '</h3>' +
            '<p class="p-card__desc">' + U.accent(p.desc) + '</p>' +
            '<div class="p-card__tech">' + U.tags(p.tech) + '</div>' +
            (links ? '<div class="p-card__links">' + links + '</div>' : '') +
          '</div>' +
        '</article>' +
      '</div>';
  }).join('');

  /* ---------- Carousel ---------------------------------------------------- */
  if (typeof window.Swiper === 'undefined') {
    /* No library: fall back to a native horizontal scroller. */
    shell.classList.add('no-swiper');
    if (controls) controls.hidden = true;
    return;
  }

  var cfg = U.config().carousel || {};
  var autoplay = cfg.autoplay && !U.reduced()
    ? { delay: 4500, disableOnInteraction: true, pauseOnMouseEnter: true }
    : false;

  new window.Swiper(shell, {
    slidesPerView: 1.06,
    spaceBetween: 16,
    grabCursor: true,
    loop: cfg.loop !== false && items.length > 3,
    watchOverflow: true,
    autoplay: autoplay,
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: {
      enabled: true,
      prevSlideMessage: 'Previous project',
      nextSlideMessage: 'Next project',
      paginationBulletMessage: 'Go to project {{index}}'
    },
    pagination: { el: '#worksPagination', clickable: true },
    navigation: { prevEl: '#worksPrev', nextEl: '#worksNext' },
    breakpoints: {
      576: { slidesPerView: 1.3, spaceBetween: 18 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 2.25, spaceBetween: 24 },
      1200: { slidesPerView: 3, spaceBetween: 26 }
    }
  });
};
