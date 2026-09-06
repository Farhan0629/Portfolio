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
    desc: 'A network intrusion detection project designed to *monitor network traffic* ' +
          'and identify suspicious activity in real time.',
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
    desc: 'An educational scanner that tests for *SQL injection and XSS* vulnerabilities ' +
          'alongside passive OSINT reconnaissance.',
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
    desc: 'A civic problem-reporting platform featuring a *React web portal* and a Flutter ' +
          'mobile app, using AI to categorize and route issues.',
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
    desc: 'A voice-controlled assistant that lets users control *smart home devices* ' +
          'hands-free through spoken commands. *3rd place at the NAH-X Hackathon* (LISA).',
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
    desc: 'A Chrome extension that inspects URLs in real time and *warns you* ' +
          'when visiting potentially malicious sites.',
    tech: ['JavaScript', 'Chrome Extension API'],
    image: 'assets/img/projects/webshield.jpg',
    alt: 'Browser window protected by a translucent dome shield, with URLs being scanned — green checkmarks for safe sites and a red warning for a flagged malicious URL',
    repo: 'https://github.com/Farhan0629/Webshield',
    demo: ''
  }
];
