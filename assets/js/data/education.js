/* ==========================================================================
   education.js — the Education timeline and the Certifications list.

   EDUCATION per entry:  meta (dates) · title · desc · tags[]
   CERTIFICATIONS per entry:
     icon   Remix Icon class
     title  exact certificate name
     meta   issuer · year
     tag    small pill, e.g. 'In progress' or 'Completed'
     url    verification link — while it is '' the card is not clickable,
            which is deliberate: better than a link that goes nowhere.

   Keep the CGPA line current, and move the BTech tag to a final CGPA once
   you graduate.
   ========================================================================== */

window.EDUCATION = [
  {
    meta: '2024 — 2028',
    title: 'BTech, Computer Science & Engineering',
    desc: 'JIS University, Kolkata. Specialising in cybersecurity — ' +
          'coursework across data structures, computer networks, operating ' +
          'systems, databases and applied security.',
    tags: ['Cybersecurity specialisation', 'CGPA 9.05']
  },
  {
    meta: '2024',
    title: 'ISC, Class XII — Science',
    desc: "St. Thomas' Boys' School, Kidderpore, Kolkata. CISCE board. " +
          'Physics, Chemistry and Mathematics with Computer Science.',
    tags: ['ISC 77.25%', 'ICSE 82.0%']
  },
  {
    meta: '2024 — Present',
    title: 'Roles at JIS University',
    desc: 'Class Representative, coordinating between students and faculty, ' +
          'and part of the Media Team producing posters, banners and digital ' +
          'content for official university platforms.',
    tags: ['Class Representative', 'Media Team']
  },
  {
    meta: 'Ongoing',
    title: 'Self-directed security work',
    desc: 'Building the tools rather than only reading about them: a network ' +
          'intrusion detection engine, a scanner for injection and ' +
          'cross-site scripting, and a browser extension that blocks ' +
          'malicious sites — all outside the syllabus.',
    tags: ['Detection', 'Web app testing', 'Tooling']
  }
];

window.CERTIFICATIONS = [
  {
    icon: 'ri-trophy-line',
    title: '3rd Place — NAH-X College Hackathon',
    meta: 'Smart Assist Web (LISA) · 30+ teams',
    tag: 'Award',
    url: ''
  },
  {
    icon: 'ri-code-s-slash-line',
    title: 'Web Development',
    meta: 'Great Learning · August 2024',
    tag: 'Completed',
    url: ''
  },
  {
    icon: 'ri-terminal-box-line',
    title: 'Python Developer',
    meta: 'Sololearn · August 2024',
    tag: 'Completed',
    url: ''
  },
  {
    icon: 'ri-line-chart-line',
    title: 'Digital Marketing',
    meta: 'Jobaaj Learnings · September 2024',
    tag: 'Completed',
    url: ''
  },
  {
    icon: 'ri-bar-chart-box-line',
    title: 'Data Analytics',
    meta: 'Jobaaj Learnings · September 2024',
    tag: 'Completed',
    url: ''
  }
];
