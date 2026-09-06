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
    desc: 'Building responsive websites and web applications with a focus on ' +
          'clean interfaces, usability, and maintainable code.',
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
    icon: 'ri-server-line',
    title: 'Backend & APIs',
    desc: 'Building APIs and backend systems with clear structure, validated input, ' +
          'database integration, and reliable error handling.',
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
    desc: 'Building mobile applications and cross-platform experiences with a ' +
          'focus on practical functionality and a consistent user experience.',
    skills: [
      'Flutter interfaces',
      'Cross-platform state',
      'Responsive mobile layouts',
      'Web and app parity',
      'Voice & device APIs'
    ],
    tools: ['Flutter', 'Dart', 'React', 'Web Speech API']
  },
  {
    icon: 'ri-shield-keyhole-line',
    title: 'Cybersecurity',
    desc: 'Cybersecurity is my area of specialization, and I’m continuing to build ' +
          'my understanding of security, networks, applications, and secure development.',
    skills: [
      'Network fundamentals',
      'Traffic analysis',
      'Web application security',
      'Vulnerability analysis',
      'Secure coding practices',
      'Security documentation'
    ],
    tools: ['Kali Linux', 'Nmap', 'Wireshark', 'Nikto', 'Python']
  }
];
