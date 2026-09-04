/* ==========================================================================
   services.js — the Services accordion.

   Per service:
     icon    Remix Icon class (https://remixicon.com) — keep the "-line" set
             for a consistent weight
     title   short, plain
     desc    one paragraph, what the client/employer actually gets
     skills  what you do
     tools   what you do it with
   Add or remove entries freely; the numbering is generated.

   Rule for the "tools" lists: only name a tool you have actually used. The
   skills lines can describe what you can deliver, but a tool chip is the
   thing an interviewer will pick up and ask you to demonstrate.
   ========================================================================== */

window.SERVICES = [
  {
    icon: 'ri-code-s-slash-line',
    title: 'Web Development',
    desc: 'I build responsive, fast websites and web apps from scratch — ' +
          'semantic markup, a reusable component structure and a design ' +
          'system rather than a pile of one-off styles.',
    skills: [
      'Responsive layouts',
      'Component structure',
      'Design systems',
      'Accessibility (WCAG)',
      'Performance budgets',
      'SEO basics'
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Git']
  },
  {
    icon: 'ri-shield-keyhole-line',
    title: 'Cybersecurity',
    desc: 'Security work on things I own or am authorised to test: finding ' +
          'weaknesses in web applications, understanding how an attack ' +
          'chains together, and writing up fixes in plain language.',
    skills: [
      'Web app testing',
      'SQL injection & XSS',
      'Network reconnaissance',
      'Port & service scanning',
      'Traffic analysis',
      'Findings write-ups'
    ],
    tools: ['Kali Linux', 'Nmap', 'Wireshark', 'Nikto', 'Python']
  },
  {
    icon: 'ri-server-line',
    title: 'Backend & APIs',
    desc: 'REST APIs and the plumbing behind them — routes that are easy to ' +
          'follow, input that is checked before it is trusted, and errors ' +
          'that say something useful when they surface.',
    skills: [
      'REST API design',
      'Route & controller structure',
      'Input validation',
      'Error handling',
      'Device & IoT integration',
      'API documentation'
    ],
    tools: ['Node.js', 'Express', 'Python', 'Streamlit', 'Git']
  },
  {
    icon: 'ri-smartphone-line',
    title: 'Mobile & Cross-Platform',
    desc: 'One project, two front ends: a Flutter app for Android alongside a ' +
          'React web portal, sharing the same ideas so a small team can ship ' +
          'on both without doubling the work.',
    skills: [
      'Flutter interfaces',
      'Cross-platform state',
      'Responsive mobile layouts',
      'Web and app parity',
      'Voice & device APIs'
    ],
    tools: ['Flutter', 'Dart', 'React', 'Web Speech API']
  }
];
