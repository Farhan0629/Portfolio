/* ==========================================================================
   projects.js — the cards in the Works carousel.

   Array order is display order, so the strongest work leads. The two-digit
   "num" is only a printed label — renumber it if you reorder.

   Per project:
     num       two-digit label printed above the title
     title     project name
     category  small pill on the image
     desc      1–2 sentences; wrap a phrase in *stars* to print it in green
     tech      short list of pills
     image     path to a 3:2-ish image
     alt       describe the image for screen readers — update this whenever
               you change the image, or the description stops being true
     repo      source URL — '' hides the "Source" link
     demo      live URL   — '' hides the "Live demo" link
   ========================================================================== */

window.PROJECTS = [
  {
    num: '01',
    title: 'Intrusion Detection System',
    category: 'Security / Networking',
    desc: 'A modular network IDS: real-time packet capture, *hot-reloadable ' +
          'signatures*, sliding-window flow anomaly detection and payload ' +
          'inspection, all reported through a live terminal dashboard.',
    tech: ['Python', 'Rich', 'Packet capture'],
    image: 'assets/img/projects/ids.jpg',
    alt: 'Security operations dashboard showing radar sweep, network traffic graphs, anomaly detection charts and shield icons on a dark green-tinted background',
    repo: 'https://github.com/Farhan0629/Intrusion-Detection-System',
    demo: ''
  },
  {
    num: '02',
    title: 'Heimdal',
    category: 'Security / Research',
    desc: 'An educational scanner that pairs *SQL injection and XSS* testing ' +
          'with passive OSINT reconnaissance, wrapped in a single Streamlit ' +
          'watchtower.',
    tech: ['Python', 'Streamlit', 'DAST', 'OSINT'],
    image: 'assets/img/projects/heimdal.jpg',
    alt: 'Streamlit-style security dashboard showing vulnerability reports for SQL injection and XSS, OSINT world map with data points, and a scanning progress ring',
    repo: 'https://github.com/Farhan0629/HEIMDAL',
    demo: ''
  },
  {
    num: '03',
    title: 'JharUdyam',
    category: 'Full-Stack / AI',
    desc: 'Citizens report local problems, AI clusters and routes them, and ' +
          'the *stakeholders who can act* pick them up — a React web portal ' +
          'plus a Flutter Android app.',
    tech: ['React 18', 'Vite', 'Flutter', 'AI'],
    image: 'assets/img/projects/jharudyam.jpg',
    alt: 'Split view of a web dashboard with a city map showing clustered green problem reports alongside a mobile phone showing the Flutter issue-reporting app, connected by AI neural network nodes',
    repo: 'https://github.com/nonsense3/JharUdyam-SIH26043',
    demo: ''
  },
  {
    num: '04',
    title: 'Smart Assist Web',
    category: 'Accessibility / IoT',
    desc: 'A voice-controlled assistant for *paralysis patients*: spoken ' +
          'commands drive Tuya smart-home devices, so lights and appliances ' +
          'need no touch at all. *3rd place at the NAH-X Hackathon* (LISA).',
    tech: ['JavaScript', 'Web Speech API', 'Node.js', 'Express', 'Tuya IoT'],
    image: 'assets/img/projects/smart-assist.jpg',
    alt: 'Voice assistant visualization with a central microphone icon surrounded by neon green sound waves and connected smart home device icons — lightbulb, fan, appliances — with an accessibility symbol',
    repo: 'https://github.com/Farhan0629/smart-assist-web',
    demo: ''
  },
  {
    num: '05',
    title: 'WebShield',
    category: 'Security / Browser Extension',
    desc: 'A Chrome extension that inspects each URL as it loads and *warns ' +
          'you the moment* you open a site flagged as malicious.',
    tech: ['JavaScript', 'Chrome Extension API'],
    image: 'assets/img/projects/webshield.jpg',
    alt: 'Browser window protected by a translucent dome shield, with URLs being scanned — green checkmarks for safe sites and a red warning for a flagged malicious URL',
    repo: 'https://github.com/Farhan0629/Webshield',
    demo: ''
  }
];
