# Portfolio — Farhan Naser

A hand-built dark, neon-green portfolio for a Computer Science student working
in web development and cybersecurity. Plain HTML, CSS and JavaScript: no build
step, no `npm install`, nothing to compile. Open it and it runs.

## Run it

Double-click `index.html`. That is genuinely all — the site is written with
classic `<script defer>` tags rather than ES modules precisely so that it works
from `file://`.

For a slightly more realistic local setup (and to keep the browser's URL bar
honest), serve the folder instead:

```bash
python -m http.server 8000      # then open http://localhost:8000
```

Fonts, icons and the four libraries (Swiper, Typed.js, ScrollReveal, EmailJS)
load from a CDN, so the first load needs a connection. Offline, every one of
them degrades on purpose instead of breaking — see *If a CDN fails* below.

## The one rule for editing

**Visible prose lives in `index.html`. Repeating collections live in
`assets/js/data/`.**

Headings, the hero paragraph, the About text, section leads and the footer are
real HTML, so the page still says something meaningful with JavaScript
disabled and search engines can read it. Anything that repeats — projects,
services, skills, education, certifications, social links, contact details —
is data, so you add a project by adding an object, not by copying markup.

## File map

| I want to change… | Edit this |
| --- | --- |
| My name, hero heading, About paragraphs, section titles, footer | `index.html` |
| City, email, phone, résumé link, social links, typed hero lines | `assets/js/data/personal.js` |
| Work carousel cards | `assets/js/data/projects.js` |
| Services accordion rows | `assets/js/data/services.js` |
| Skills cards and technology chips | `assets/js/data/skills.js` |
| Education timeline and certifications | `assets/js/data/education.js` |
| EmailJS keys, motion switches, carousel options | `assets/js/config.js` |
| Colours, fonts, spacing, radii, timings | `assets/css/variables.css` |
| A specific section's styling | the matching file in `assets/css/` |
| Behaviour of one feature | the matching file in `assets/js/components/` |

## What is left to do

Your details, education, certifications, the hackathon award, skills and the
five real projects are all in. These are the gaps that remain, roughly in
order of how much they matter:

1. **Project links.** Every `repo` and `demo` in
   `assets/js/data/projects.js` is empty, so the diagonal arrow button and the
   "Source" row are hidden on all five cards. Paste the GitHub URL for each
   project and they appear. This is the single biggest thing missing — a
   recruiter's first instinct is to click through to the code.
2. **Project screenshots.** All five still use the geometric placeholder SVGs
   in `assets/img/projects/`. Drop in real images (about 1200×800) and change
   both `image` **and** `alt` together, or the alt text stops being true.
3. **A larger portrait.** `assets/img/portrait.jpg` is 200×200, and the hero
   frame renders it around 400×500, so it is being upscaled about 2.5× and
   will look soft. Any photo 900px tall or more fixes it — same filename, no
   code change needed.
4. **The contact form.** Three EmailJS IDs in `assets/js/config.js` (next
   section). Until then the form honestly reports that it is not connected.
5. **Certificate links.** Each entry in `CERTIFICATIONS` has `url: ''`, so the
   titles are plain text. Add a verification URL and the title becomes a link.
   The two Jobaaj Learnings entries also have no year in their `meta`.
6. **Check the skills list.** Everything in `skills.js` is backed by your
   résumé or one of your projects, and the guesses I had written earlier are
   gone. If anything there is still shaky, delete it.

## Connecting the contact form

The form uses [EmailJS](https://dashboard.emailjs.com), which sends mail from
the browser without a backend. In the dashboard: add an email service and copy
its **Service ID**; create a template whose body uses `{{name}}`, `{{email}}`
and `{{message}}` and copy its **Template ID**; then open Account → General and
copy your **Public Key**.

Put all three in `assets/js/config.js`:

```js
emailjs: {
  publicKey: 'your_public_key',
  serviceId: 'service_xxxxxxx',
  templateId: 'template_xxxxxxx'
}
```

The form input names (`name`, `email`, `message`) already match those template
variables, so nothing else needs wiring.

Until you replace them, the placeholder values still start with `VITE_`, and
the form treats that as "not configured": submitting shows a neutral message
saying nothing was sent and offering your email address instead. It never
claims success it cannot prove — if EmailJS is unreachable or rejects the
request, you get an error state with the reason, not a tick.

A public key is meant to be public; it is safe in front-end code. Never put an
EmailJS **private** key in this file.

## Images

Your portrait is `assets/img/portrait.jpg`, referenced once in `index.html`. It
is currently the 200×200 photo you sent, and the hero frame renders it at
roughly 400×500, so it is upscaled and soft. A portrait-orientation crop around
900×1200 sits best in the tilted card — overwrite the same filename and nothing
else needs to change. (`portrait.svg` is still there as the original
placeholder; it is unused and can be deleted.)

Project artwork lives in `assets/img/projects/` and is referenced from
`projects.js` — landscape, roughly 3:2, 1200×800 is plenty, and every entry
needs an `alt` line that describes the picture rather than repeating the title.
All five are still the placeholder SVGs. Images are lazy-loaded and carry
explicit `width`/`height`, so keep the aspect ratio close to 3:2 or the card
will letterbox.

The favicon is `assets/img/favicon.svg`. The social preview is
`assets/img/og-card.png`, a 1200×630 card built from your name, tagline and
photo — regenerate or replace it if your details change, and make the
`og:image` path absolute once the site is deployed.

## Technology logos

Skill chips pull real brand SVGs from the Simple Icons CDN at runtime and tint
them with CSS, so no logo files are bundled and nothing is redistributed.

Each chip is `{ name: 'React', slug: 'react', brand: '#61DAFB' }`. The `slug` is
the icon's filename — find it at [simpleicons.org](https://simpleicons.org),
where the slug appears in the URL when you click an icon. `brand` only sets the
hover tint; leave it off for very dark logos (GitHub, OWASP) and the chip tints
neon green instead. `alt` is an optional second slug, tried if the first 404s
after a Simple Icons major version bump.

If a slug is wrong, or you are offline, that one chip falls back to a small
monogram of its name. Nothing errors, nothing paints a grey block — but a
monogram where you expected a logo means the slug needs checking.

For a chip with no real logo (a concept rather than a product), use a Remix
Icon instead: `{ name: 'Cryptography', ri: 'ri-key-2-line' }`.

To cut the CDN out entirely, download the SVGs you use into
`assets/img/logos/` keeping their filenames, then set
`logoBase: 'assets/img/logos/'` in `assets/js/config.js`.

## Highlighting words in green

Inside `index.html`, wrap a word in `<span class="accent">`. Inside the data
files there is no markup, so wrap it in asterisks instead:

```js
blurb: 'My main focus: how systems *fail*, and how to make them fail less.'
```

Text from the data files is HTML-escaped first and the stars are converted
afterwards, so a stray `<` in your copy is printed, not executed. The stars
work in the fields that hold sentences — project `title` and `desc`, service
`title` and `desc`, skills `title` and `blurb`, education `title` and `desc`,
and certification `title`. In short labels such as `tech`, `tools`, `skills`
and `tags` an asterisk stays an asterisk.

## What the site claims, and why

Nothing personal has been invented — no fake employers, clients, certificates,
awards or testimonials. Every fact on the page came from you or from your own
résumé: JIS University 2024–2028 and CGPA 9.05, ISC 77.25% and ICSE 82.0%, the
four certifications, third place at the NAH-X college hackathon, Class
Representative and Media Team, and the five projects.

Two consequences worth knowing:

The **skills chips** are restricted to tools your résumé or your projects
prove. Tailwind, MongoDB, PostgreSQL, MySQL, Burp Suite, Metasploit, OWASP ZAP,
TryHackMe, Hack The Box, Docker, Postman, Figma and Vercel were scaffolding I
had written before you sent your details, and they are gone. Add any of them
back the moment it is true — the header comment in `skills.js` says the same
thing. The `tools` lists in `services.js` follow the same rule, which is why
GSAP and Framer Motion are no longer there.

**Empty means hidden, never broken.** No value on this site is a fake link.
Leave `resumeUrl` empty and the Résumé button disappears; leave a project's
`demo` empty and its "Live" link goes; leave a certificate's `url` empty and
the title is plain text instead of a link. That is also why five project cards
currently have no arrow button: you have not given me their repository URLs, so
there is nothing to point at yet.

## Motion and accessibility

Everything is keyboard reachable, with a visible focus ring and a skip link.
The carousel, the accordion and the form are wired with the ARIA that those
patterns need, headings run in order, and no state is signalled by colour
alone — form errors carry an icon and a sentence, the active nav item gets a
dot as well as a colour.

`prefers-reduced-motion: reduce` is respected properly rather than nominally:
transitions and keyframes are cut, the cursor glow is not created at all, the
hero prints its first role instead of typing, reveal animations are skipped so
content is simply visible, and smooth scrolling becomes an instant jump.

You can also switch the two headline effects off for everyone in
`assets/js/config.js` by setting `motion.cursorGlow` or `motion.scrollReveal`
to `false`.

## If a CDN fails

Each library is checked before use, so a blocked or offline CDN degrades rather
than errors. Without Swiper, the carousel becomes a native scroll-snap strip
with the same cards and the arrows hide themselves. Without Typed.js, the hero
shows the first role as static text. Without ScrollReveal, content stays
visible with no entrance animation. Without EmailJS, the form says the service
could not be reached and offers your email address. Without the Remix Icon
webfont, icon glyphs are missing but every label is still real text.

## Changing the design

`assets/css/variables.css` is the single source of truth. Change `--accent` and
the whole site follows: buttons, links, the nav dot, project numbers, icons,
glows, focus rings and the progress ring all derive from it. `--bg` sets the
near-black green-tinted background, `--text` and `--muted` the two type
colours, and the `--accent-05/10/16/24` steps are the translucent fills used
for hovers and tinted panels.

Type and spacing are fluid: `--fs-hero`, `--fs-h2` and the rest are `clamp()`
expressions, so sizes scale with the viewport instead of jumping at
breakpoints. `--container` sets the shared max width, and `--header-h` is used
both by the sticky header and by `scroll-padding-top`, so anchor links never
land underneath it. If you change the header height, change that variable
rather than hard-coding a new value anywhere else.

Section-specific styling lives in its own file, and `assets/css/responsive.css`
holds only the per-breakpoint exceptions.

## Structure

```
index.html
assets/
  css/    variables → base → layout → ui → overlays → per-section → responsive
  img/    portrait, favicon, project artwork
  js/
    config.js          keys and switches
    data/              personal, projects, services, skills, education
    lib/util.js        shared helpers on one global, PF
    components/        nav, cursor, hero, projects, services, skills,
                       education, contact, scroll
    main.js            fills in your details, then starts each component
```

The stylesheet order in `<head>` matters, and so does the script order: config
and data first, then `util.js`, then components, then `main.js`. `main.js` is
the only file that calls the component initialisers, each in its own
`try`/`catch` so one broken feature cannot take the page down — a failure is
reported once in the console and everything else keeps working.

## Deploying

It is a static folder, so anything will host it. Push to GitHub and enable
Pages on the default branch, or drag the folder into Netlify or Vercel. There
is no build command and no output directory. EmailJS works from any of them, as
long as you add the deployed domain to the allowed list in your EmailJS
dashboard.

## Known limits

The site was written and checked statically — every JavaScript file parses,
every local asset it references exists, and every class used in the markup has
a rule behind it — but it has not been opened in a browser from here, so the
visual polish, the nine target viewports and the real behaviour of the
carousel, accordion and cursor glow are worth a look on your own machine before
you send the link anywhere.

Two details to sanity-check first: Simple Icons slugs drift between major
versions (a monogram chip is the tell), and EmailJS needs your deployed domain
allow-listed before the form will send from the live URL.

Interaction patterns are adapted from the ideas in bedimcode's responsive
portfolio work; no markup, styles or content were copied from it or from anyone
else's site.





