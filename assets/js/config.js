/* ==========================================================================
   config.js — the only file you need to touch to connect the site up.
   Nothing here is secret: a public key is meant to be public. Never put an
   EmailJS *private* key in front-end code.
   ========================================================================== */

window.SITE_CONFIG = {
  /* ---------- Contact form (https://dashboard.emailjs.com) ----------------
     1. Create an email service            -> copy the Service ID
     2. Create a template with the fields  -> copy the Template ID
        {{name}}, {{email}}, {{message}}
     3. Account -> General                 -> copy the Public Key
     Replace the three strings below. While they still start with "VITE_",
     the form stays switched off and says so instead of pretending to send. */
  emailjs: {
    publicKey: 'saWykRxJDkfF6cLG_',
    serviceId: 'service_3kx2rrj',
    templateId: 'template_teqtuta'
  },

  /* ---------- Technology logos --------------------------------------------
     Chip logos are pulled from the Simple Icons CDN at runtime and tinted
     with CSS, so no image files are bundled. If a slug is wrong or you are
     offline, that chip falls back to a small monogram — it never breaks.

     Want them fully offline? Download the SVGs you use into
     assets/img/logos/ and set: logoBase: 'assets/img/logos/' */
  logoBase: 'https://cdn.jsdelivr.net/npm/simple-icons@13/icons/',

  /* ---------- Hero typewriter (Typed.js) --------------------------------- */
  typed: {
    typeSpeed: 55,
    backSpeed: 26,
    startDelay: 450,
    backDelay: 1900,
    loop: true,
    smartBackspace: true
  },

  /* ---------- Motion -----------------------------------------------------
     Both are ignored automatically when the visitor has asked their system
     to reduce motion. */
  motion: {
    scrollReveal: true,
    cursorGlow: true
  },

  /* ---------- Projects carousel ----------------------------------------- */
  carousel: {
    loop: true,
    autoplay: false
  }
};
