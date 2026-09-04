/* ==========================================================================
   services.js — accordion built from SERVICES.

   Height is animated by measuring the panel and setting max-height in pixels,
   then releasing it to `none` once the transition ends so the panel can still
   reflow when the window is resized. Closed panels are `inert`, so keyboard
   focus never lands inside something you cannot see.
   ========================================================================== */

window.initServices = function () {
  'use strict';

  var U = window.PF;
  var root = U.$('#servicesAcc');
  var items = U.list('SERVICES');
  if (!root) return;

  if (!items.length) {
    root.remove();
    return;
  }

  /* ---------- Markup ------------------------------------------------------ */
  function group(label, values) {
    if (!values || !values.length) return '';
    return '<div class="acc__group"><h4>' + U.esc(label) + '</h4>' +
      U.tags(values) + '</div>';
  }

  root.innerHTML = items.map(function (s, i) {
    var n = String(i + 1);
    var num = (n.length < 2 ? '0' : '') + n;
    var btnId = 'accBtn' + num;
    var panelId = 'accPanel' + num;

    return '' +
      '<div class="acc__item">' +
        '<h3 class="acc__h">' +
          '<button class="acc__trigger" type="button" id="' + btnId + '" ' +
            'aria-expanded="false" aria-controls="' + panelId + '">' +
            '<span class="acc__idx mono">' + num + '</span>' +
            '<span class="acc__ico"><i class="' + U.esc(s.icon || 'ri-shapes-line') +
              '" aria-hidden="true"></i></span>' +
            '<span class="acc__title">' + U.accent(s.title) + '</span>' +
            '<span class="acc__chev"><i class="ri-arrow-down-s-line" aria-hidden="true"></i></span>' +
          '</button>' +
        '</h3>' +
        '<div class="acc__panel" id="' + panelId + '" role="region" ' +
          'aria-labelledby="' + btnId + '">' +
          '<div class="acc__inner">' +
            '<p class="acc__desc">' + U.accent(s.desc) + '</p>' +
            group('Key skills', s.skills) +
            group('Tools', s.tools) +
          '</div>' +
        '</div>' +
      '</div>';
  }).join('');

  /* ---------- Behaviour --------------------------------------------------- */
  var panels = U.$$('.acc__panel', root);
  var triggers = U.$$('.acc__trigger', root);

  panels.forEach(function (panel) {
    panel.style.maxHeight = '0px';
    panel.inert = true;
  });

  function close(panel, item, trigger) {
    /* Come back from `none` to a real number before animating to zero. */
    panel.style.maxHeight = panel.scrollHeight + 'px';
    /* Reading offsetHeight forces the browser to apply that value first. */
    void panel.offsetHeight;

    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0px';
    panel.inert = true;
  }

  function open(panel, item, trigger) {
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.inert = false;
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  triggers.forEach(function (trigger) {
    var item = trigger.closest('.acc__item');
    var panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!item || !panel) return;

    /* Once open, drop the fixed height so long text can still reflow. */
    U.on(panel, 'transitionend', function (e) {
      if (e.propertyName !== 'max-height') return;
      if (item.classList.contains('is-open')) panel.style.maxHeight = 'none';
    });

    U.on(trigger, 'click', function () {
      var isOpen = item.classList.contains('is-open');

      /* One open row at a time keeps the list short and scannable. */
      triggers.forEach(function (other) {
        if (other === trigger) return;
        var otherItem = other.closest('.acc__item');
        var otherPanel = document.getElementById(other.getAttribute('aria-controls'));
        if (otherItem && otherPanel && otherItem.classList.contains('is-open')) {
          close(otherPanel, otherItem, other);
        }
      });

      if (isOpen) close(panel, item, trigger);
      else open(panel, item, trigger);
    });
  });

  /* Open the first row so the section never reads as an empty list. */
  if (triggers.length) triggers[0].click();
};
