/* ==========================================================================
   education.js — the study timeline and the certification cards.
   ========================================================================== */

window.initEducation = function () {
  'use strict';

  var U = window.PF;
  var timeline = U.$('#eduTimeline');
  var certList = U.$('#certList');

  /* ---------- Timeline ---------------------------------------------------- */
  var entries = U.list('EDUCATION');

  if (timeline) {
    if (!entries.length) {
      timeline.remove();
    } else {
      timeline.innerHTML = entries.map(function (e) {
        return '' +
          '<li class="timeline__item">' +
            '<span class="timeline__dot" aria-hidden="true"></span>' +
            '<p class="timeline__meta">' + U.esc(e.meta) + '</p>' +
            '<h4 class="timeline__title">' + U.accent(e.title) + '</h4>' +
            '<p class="timeline__desc">' + U.accent(e.desc) + '</p>' +
            U.tags(e.tags) +
          '</li>';
      }).join('');
    }
  }

  /* ---------- Certifications ---------------------------------------------- */
  var certs = U.list('CERTIFICATIONS');

  if (!certList) return;

  if (!certs.length) {
    certList.remove();
    return;
  }

  certList.innerHTML = certs.map(function (c) {
    var title = U.accent(c.title);

    /* Only becomes a link when you have added a verification URL. */
    if (c.url) {
      title = '<a href="' + U.esc(c.url) + '" target="_blank" rel="noopener noreferrer">' +
        title + '<span class="sr-only"> (opens in a new tab)</span></a>';
    }

    return '' +
      '<li class="cert card">' +
        '<span class="cert__ico"><i class="' + U.esc(c.icon || 'ri-award-line') +
          '" aria-hidden="true"></i></span>' +
        '<div>' +
          '<h4 class="cert__title">' + title + '</h4>' +
          '<span class="cert__meta mono">' + U.esc(c.meta) + '</span>' +
        '</div>' +
        (c.tag ? '<span class="tag">' + U.esc(c.tag) + '</span>' : '') +
      '</li>';
  }).join('');
};
