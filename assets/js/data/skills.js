/* ==========================================================================
   skills.js — the four Skills cards.

   Every entry below is backed by either your résumé or one of your projects.
   Nothing here is a guess: the scaffolding chips I had written before you
   sent your details (Tailwind, MongoDB, PostgreSQL, MySQL, Metasploit, Burp
   Suite, TryHackMe, Hack The Box, Docker, Postman, Figma, Vercel) are gone,
   because an interviewer picking a chip and asking about it is the whole
   point of this section. Add any of them back once it is true.

   Two kinds of chip:
     { name, slug }  real brand logo, fetched from the Simple Icons CDN and
                     tinted with CSS. "slug" is the icon's file name — look it
                     up at https://simpleicons.org (click an icon, the slug is
                     in the URL). "alt" is an optional second slug to try if
                     the first one 404s after a version bump.
     { name, ri }    a concept or a tool with no logo in Simple Icons — uses
                     a Remix Icon instead.

   "brand" is only used for the hover tint. Leave it off for very dark brands
   (GitHub, OWASP…) and the chip tints neon green instead.
   ========================================================================== */

window.SKILLS = [
  {
    icon: 'ri-code-s-slash-line',
    title: 'Languages',
    blurb: 'Languages I use for development and coursework.',
    items: [
      { name: 'C',          slug: 'c',          brand: '#A8B9CC' },
      { name: 'C++',        slug: 'cplusplus',  brand: '#00599C' },
      { name: 'Java',       slug: 'openjdk',    alt: 'java' },
      { name: 'Python',     slug: 'python',     brand: '#3776AB' },
      { name: 'JavaScript', slug: 'javascript', brand: '#F7DF1E' }
    ]
  },
  {
    icon: 'ri-window-line',
    title: 'Frontend & Mobile',
    blurb: 'Building responsive and interactive interfaces across web and mobile.',
    items: [
      { name: 'HTML5',   slug: 'html5', brand: '#E34F26' },
      { name: 'CSS',     slug: 'css',   alt: 'css3', brand: '#1572B6' },
      { name: 'React',   slug: 'react', brand: '#61DAFB' },
      { name: 'Vite',    slug: 'vite',  brand: '#646CFF' },
      { name: 'Flutter', slug: 'flutter', brand: '#02569B' },
      { name: 'Accessibility', ri: 'ri-universal-access-line' }
    ]
  },
  {
    icon: 'ri-tools-line',
    title: 'Backend & Tooling',
    blurb: 'Building APIs, backend systems, and development workflows.',
    items: [
      { name: 'Node.js',    slug: 'nodedotjs', alt: 'nodejs', brand: '#5FA04E' },
      { name: 'Express',    slug: 'express' },
      { name: 'Streamlit',  slug: 'streamlit', brand: '#FF4B4B' },
      { name: 'Git',        slug: 'git',       brand: '#F05032' },
      { name: 'GitHub',     slug: 'github' },
      { name: 'VS Code',    slug: 'visualstudiocode', brand: '#007ACC' },
      { name: 'Linux',      slug: 'linux',      brand: '#FCC624' },
      { name: 'VirtualBox', slug: 'virtualbox', brand: '#2F61B4' },
      { name: 'VMware',     slug: 'vmware',     brand: '#607078' }
    ]
  },
  {
    icon: 'ri-shield-keyhole-line',
    title: 'Cybersecurity',
    blurb: 'Cybersecurity is my academic specialization, with a growing interest ' +
           'in application security, networks, secure development, and security fundamentals.',
    items: [
      { name: 'Kali Linux', slug: 'kalilinux', brand: '#557C94' },
      { name: 'Nmap',       slug: 'nmap' },
      { name: 'Wireshark',  slug: 'wireshark', brand: '#1679A7' },
      { name: 'Nikto',              ri: 'ri-scan-2-line' },
      { name: 'OSINT',              ri: 'ri-search-eye-line' },
      { name: 'Networking',         ri: 'ri-router-line' },
      { name: 'Web security',       ri: 'ri-bug-line' },
      { name: 'Packet analysis',    ri: 'ri-pulse-line' },
      { name: 'Intrusion detection', ri: 'ri-radar-line' }
    ]
  }
];
