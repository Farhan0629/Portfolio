/* ==========================================================================
   personal.js — your details. Everything here is real markup-free text, so
   you can edit it without touching HTML.

   Anything that becomes a clickable link uses a real, working value, so no
   link on the site is ever dead. Set a value to '' and the element that
   would have used it hides itself instead.
   ========================================================================== */

window.PERSONAL = {
  /* Shown next to "Hi! I'm Farhan Naser — based in …" and on the location
     card. The name itself lives in index.html (search for "Farhan Naser"). */
  location: 'Kolkata, India',

  /* ---------- Contact card 1: email -------------------------------------- */
  email: 'farhannaser06@gmail.com',

  /* ---------- Contact card 2: phone -------------------------------------
     "phone" is what people see, "phoneHref" is what the dialler receives
     (digits and a leading + only). Set both to '' to hide the card. */
  phone: '+91 90389 52449',
  phoneHref: '+919038952449',

  /* ---------- Contact card 3: location ----------------------------------
     Empty, so it links to a Google Maps search for the location above. */
  mapUrl: '',

  /* ---------- Résumé -----------------------------------------------------
     PDF rather than the .docx: it opens in the browser instead of
     downloading, and keeps its layout on any machine. The .docx you sent is
     still in assets/ — re-export the PDF after you edit it. */
  resumeUrl: 'assets/Farhan_Naser_Resume.pdf',

  /* ---------- Social links ------------------------------------------------
     Only the two you gave me. To add another, copy a line and pick an icon
     from https://remixicon.com — e.g. 'ri-discord-fill', 'ri-medium-fill'. */
  socials: [
    { label: 'GitHub',   url: 'https://github.com/Farhan0629', icon: 'ri-github-fill' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/farhan-naser-a427942a2', icon: 'ri-linkedin-box-fill' }
  ],

  /* ---------- Hero typewriter lines --------------------------------------
     Read as "Currently ______". Each one points at something you have
     actually built, so nothing here overstates the work. */
  roles: [
    'building web applications',
    'writing security tooling',
    'learning offensive security',
    'breaking things on purpose',
    'shipping side projects'
  ]
};
