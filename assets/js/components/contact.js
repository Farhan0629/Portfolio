/* ==========================================================================
   contact.js — validation and EmailJS delivery.

   Ground rule: the form only ever says "sent" when EmailJS confirms it. If
   the keys are missing, the library failed to load, or the request is
   rejected, the visitor is told plainly and given the email address instead.
   ========================================================================== */

window.initContact = function () {
  'use strict';

  var U = window.PF;
  var form = U.$('#contactForm');
  if (!form) return;

  var submit = U.$('#formSubmit');
  var label = U.$('.form__submit-label', form);
  var status = U.$('#formStatus');
  var hint = U.$('#formHint');
  var person = U.personal();

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var fields = [
    {
      input: U.$('#cfName'),
      error: U.$('#errName'),
      check: function (v) { return v.length >= 2 ? '' : 'Please enter your name.'; }
    },
    {
      input: U.$('#cfEmail'),
      error: U.$('#errEmail'),
      check: function (v) {
        if (!v) return 'Please enter your email address.';
        return EMAIL_RE.test(v) ? '' : 'That email address does not look right.';
      }
    },
    {
      input: U.$('#cfMessage'),
      error: U.$('#errMessage'),
      check: function (v) {
        return v.length >= 10 ? '' : 'Please write at least a sentence or two.';
      }
    }
  ];

  /* ---------- Keys --------------------------------------------------------- */
  var keys = U.config().emailjs || {};
  var configured = U.filled(keys.publicKey) && U.filled(keys.serviceId) &&
    U.filled(keys.templateId);

  if (configured && hint) hint.hidden = true;

  var mailto = person.email
    ? ' <a href="mailto:' + U.esc(person.email) + '">' + U.esc(person.email) + '</a>'
    : '';

  /* ---------- Status line -------------------------------------------------- */
  function setStatus(kind, html) {
    if (!status) return;
    status.className = 'form__status is-shown is-' + kind;
    /* Make the region visible first, then fill it, so assistive tech
       reliably announces the change. */
    requestAnimationFrame(function () {
      status.innerHTML = '<i class="' + (
        kind === 'ok' ? 'ri-checkbox-circle-line' :
        kind === 'bad' ? 'ri-error-warning-line' : 'ri-information-line'
      ) + '" aria-hidden="true"></i><span>' + html + '</span>';
    });
  }

  function clearStatus() {
    if (!status) return;
    status.className = 'form__status';
    status.innerHTML = '';
  }

  /* ---------- Field errors ------------------------------------------------- */
  function showError(field, message) {
    var wrap = field.input.closest('.field');
    if (wrap) wrap.classList.add('has-error');
    field.input.setAttribute('aria-invalid', 'true');
    if (field.error) {
      field.error.hidden = false;
      field.error.innerHTML = '<i class="ri-error-warning-line" aria-hidden="true"></i>' +
        '<span>' + U.esc(message) + '</span>';
    }
  }

  function clearError(field) {
    var wrap = field.input.closest('.field');
    if (wrap) wrap.classList.remove('has-error');
    field.input.removeAttribute('aria-invalid');
    if (field.error) {
      field.error.hidden = true;
      field.error.innerHTML = '';
    }
  }

  function validate() {
    var firstBad = null;

    fields.forEach(function (field) {
      if (!field.input) return;
      var message = field.check(field.input.value.trim());
      if (message) {
        showError(field, message);
        if (!firstBad) firstBad = field.input;
      } else {
        clearError(field);
      }
    });

    return firstBad;
  }

  /* Clear a field's error as soon as it becomes valid — no nagging. */
  fields.forEach(function (field) {
    if (!field.input) return;
    U.on(field.input, 'input', function () {
      if (!field.check(field.input.value.trim())) clearError(field);
    });
  });

  /* ---------- Submit ------------------------------------------------------- */
  var sending = false;

  function setBusy(busy) {
    sending = busy;
    if (!submit) return;
    submit.disabled = busy;
    submit.setAttribute('aria-busy', busy ? 'true' : 'false');
    if (label) label.textContent = busy ? 'Sending…' : 'Send message';
    var icon = U.$('i', submit);
    if (icon) icon.className = busy ? 'ri-loader-4-line' : 'ri-send-plane-line';
  }

  U.on(form, 'submit', function (e) {
    e.preventDefault();
    if (sending) return;

    clearStatus();

    var firstBad = validate();
    if (firstBad) {
      setStatus('bad', 'Please fix the highlighted fields and try again.');
      firstBad.focus();
      return;
    }

    if (!configured) {
      setStatus('info', 'This form is not connected to an email service yet, so ' +
        'nothing was sent. You can reach me directly at' + mailto + '.');
      return;
    }

    if (typeof window.emailjs === 'undefined') {
      setStatus('bad', 'The email service could not be reached, so your message ' +
        'was not sent. Please email me at' + mailto + '.');
      return;
    }

    setBusy(true);

    try {
      window.emailjs.init({ publicKey: keys.publicKey });
    } catch (err) { /* older builds initialise on send instead */ }

    window.emailjs.sendForm(keys.serviceId, keys.templateId, form)
      .then(function () {
        setBusy(false);
        setStatus('ok', 'Message sent successfully ✓ — I will get back to you soon.');
        form.reset();
        fields.forEach(clearError);
      })
      .catch(function (err) {
        setBusy(false);
        var detail = err && (err.text || err.message) ? ' (' + U.esc(err.text || err.message) + ')' : '';
        setStatus('bad', 'Your message could not be sent' + detail +
          '. Please email me at' + mailto + '.');
      });
  });
};
