// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Sri Chandu Nannaka',
  firstName: 'Sri Chandu',
  lastName: 'Nannaka',
  roles: ['AI / ML Engineer', 'Full-Stack Developer', 'Data Analyst', 'Web3 Builder'],
  tagline:
    'I build intelligent, data-driven products — from computer-vision pipelines and RAG assistants to real-time dashboards and decentralized apps.',
  location: 'Visakhapatnam, India',
  email: 'nannakasrichandu@gmail.com',
  phone: '+91 9182040749',
  github: 'https://github.com/srichandu02',
  linkedin: 'https://www.linkedin.com/in/sri-chandu-nannaka-529562322',
  resume: '/resume.pdf',
  photo: '/profile.png',
}

export const about = {
  paragraphs: [
    "I'm a Computer Science & Engineering undergraduate at ANITS specialising in Artificial Intelligence and Machine Learning. I enjoy turning raw data into products people can actually use.",
    'My work spans the full stack: training and evaluating ML models, building FastAPI backends, designing React interfaces and shipping them with Docker. Along the way I have built real-time smart-meter dashboards in industry and picked up security fundamentals through a SOC internship in my second year.',
  ],
  stats: [
    { value: 8.7, decimals: 1, suffix: '', label: 'CGPA at ANITS' },
    { value: 3, decimals: 0, suffix: '', label: 'Internships' },
    { value: 20, decimals: 0, suffix: '+', label: 'GitHub repos' },
    { value: 94.7, decimals: 1, suffix: '%', label: 'Intermediate' },
  ],
}

export const experience = [
  {
    role: 'AIML Intern',
    company: 'Infosys Virtual Internship 7.0',
    period: 'Jun 2026 — Oct 2026',
    points: [
      'Worked on real-world AI & ML use cases through hands-on projects and guided learning.',
      'Applied ML algorithms, data preprocessing, model evaluation and deployment.',
      'Gained industry insight and sharpened practical problem-solving skills.',
    ],
    tags: ['Machine Learning', 'Python', 'Model Evaluation'],
  },
  {
    role: 'Software Development Intern',
    company: 'Yukthi Electronics Pvt Ltd',
    period: 'May 2026 — Present',
    current: true,
    points: [
      'Developed interactive web dashboards that visualise real-time smart meter readings and water consumption.',
      'Implemented SQL-based storage and retrieval for meter readings, users, complaints and system records.',
      'Created dashboards with real-time analytics, KPIs and alerts.',
    ],
    tags: ['HTML/CSS/JS', 'SQL', 'Dashboards'],
  },
  {
    role: 'SOC Analyst Intern',
    company: 'Cyberthreya',
    period: 'Apr 2025 — Jul 2025',
    points: [
      'Monitored security events and analysed logs using Splunk SIEM and Wazuh.',
      'Investigated authentication threats, brute-force attacks and endpoint vulnerabilities.',
      'Assisted incident response and tuned detection rules to cut false positives.',
    ],
    tags: ['Splunk', 'Wazuh', 'Incident Response'],
  },
]

export const projects = [
  {
    title: 'AI Textile Waste Intelligence',
    subtitle: 'AI-powered recycling platform',
    category: 'AI / ML',
    description:
      'Computer-vision platform that classifies textile waste and recommends recycling paths. React frontend, FastAPI inference backend, full ML pipeline and Docker deployment.',
    stack: ['React', 'FastAPI', 'TensorFlow', 'Scikit-learn', 'Docker'],
    github: 'https://github.com/srichandu02/AI-textile-waste-platform',
    accent: 'from-emerald-400 to-cyan-400',
    featured: true,
  },
  {
    title: 'FashionMind AI',
    subtitle: 'Multimodal fashion search & stylist',
    category: 'AI / ML',
    description:
      'E-commerce platform using CLIP embeddings and FAISS to match products by text, image or both — with virtual try-on fit analysis, “steal the look” dupe finder and a conversational stylist.',
    stack: ['PyTorch', 'CLIP', 'FAISS', 'FastAPI', 'React'],
    github: 'https://github.com/srichandu02/FashionMind-AI',
    accent: 'from-fuchsia-400 to-rose-400',
    featured: true,
  },
  {
    title: 'Zepto Data & AI Platform',
    subtitle: 'Scraping · Analytics · RAG',
    category: 'AI / ML',
    description:
      'Three connected modules: a scraping pipeline into SQLite, a predictive-analytics pipeline with tuned scikit-learn models, and a grounded LangGraph RAG support assistant served via FastAPI.',
    stack: ['LangGraph', 'ChromaDB', 'Pandas', 'FastAPI', 'Docker'],
    github: 'https://github.com/srichandu02/zepto-data-ai-platform',
    accent: 'from-amber-300 to-orange-500',
    featured: true,
  },
  {
    title: '4U Social',
    subtitle: 'Real-time social platform',
    category: 'Full-Stack',
    description:
      'Mobile-first social app with matchmaking, feeds, stories, live audio rooms, DMs, WebRTC voice/video calls, multiplayer games and an admin moderation console.',
    stack: ['React 19', 'Supabase', 'PostgreSQL', 'WebRTC', 'Tailwind'],
    github: 'https://github.com/srichandu02/4u-app',
    live: 'https://4u-app-sigma.vercel.app',
    accent: 'from-sky-400 to-indigo-500',
    featured: true,
  },
  {
    title: 'Smart Water Meter Dashboard',
    subtitle: 'Role-based IoT analytics',
    category: 'Full-Stack',
    description:
      'Role-based dashboard for Super Admin, Manager, Technician and End User with ML-driven water consumption forecasting and anomaly detection.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Python', 'ML'],
    accent: 'from-cyan-300 to-blue-500',
  },
  {
    title: 'OpenD NFT Marketplace',
    subtitle: 'Decentralized Web3 app',
    category: 'Web3',
    description:
      'Decentralized marketplace to mint, list and trade NFTs, backed by Motoko smart contracts on the Internet Computer with wallet auth and ownership management.',
    stack: ['React', 'Node.js', 'Motoko', 'Web3'],
    github: 'https://github.com/srichandu02/opend-nft-marketplace',
    accent: 'from-violet-400 to-purple-600',
  },
  {
    title: 'English → Spanish Translator',
    subtitle: 'Neural machine translation',
    category: 'AI / ML',
    description:
      'AI machine-translation system that converts English text to Spanish using NLP techniques.',
    stack: ['Python', 'NLP', 'Deep Learning'],
    github: 'https://github.com/srichandu02/Translation-System-English---Spanish-',
    accent: 'from-yellow-300 to-red-500',
  },
  {
    title: 'AI Interview Analyzer',
    subtitle: 'Skill assessment tool',
    category: 'AI / ML',
    description: 'AI-assisted tool that analyses interview responses to help candidates understand and improve their skills.',
    stack: ['JavaScript', 'HTML', 'AI'],
    github: 'https://github.com/srichandu02/AI-Interview-Analyzer',
    accent: 'from-teal-300 to-emerald-500',
  },
  {
    title: 'Study Planner Pro',
    subtitle: 'Productivity web app',
    category: 'Full-Stack',
    description: 'Planner that helps students organise subjects, schedule sessions and track study progress.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/srichandu02/STUDY-PLANNER-PRO',
    accent: 'from-pink-300 to-violet-500',
  },
]

export const skills = [
  {
    title: 'AI / Machine Learning',
    icon: 'Brain',
    span: 'md:col-span-2',
    items: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision', 'LangGraph', 'RAG', 'FAISS'],
  },
  {
    title: 'Frontend',
    icon: 'Layout',
    items: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Backend',
    icon: 'Server',
    items: ['FastAPI', 'Node.js', 'Express.js', 'Django', 'REST APIs'],
  },
  {
    title: 'Languages',
    icon: 'Code2',
    items: ['Python', 'Java', 'C', 'JavaScript', 'Motoko', 'Kotlin'],
  },
  {
    title: 'Data & Databases',
    icon: 'Database',
    items: ['SQL', 'PostgreSQL', 'SQLite', 'Supabase', 'ChromaDB'],
  },
  {
    title: 'Cybersecurity',
    icon: 'ShieldCheck',
    items: ['Splunk SIEM', 'Wazuh', 'Log Analysis', 'Incident Response'],
  },
  {
    title: 'Tools & DevOps',
    icon: 'Wrench',
    span: 'md:col-span-2',
    items: ['Git', 'GitHub', 'Docker', 'Linux', 'Postman', 'VS Code', 'Vercel'],
  },
]

export const marquee = [
  'Python', 'React', 'FastAPI', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'LangGraph', 'Docker',
  'PostgreSQL', 'Node.js', 'Tailwind', 'Supabase', 'Motoko', 'Splunk', 'Pandas', 'FAISS',
]

export const education = [
  {
    title: 'B.Tech — CSE (AI & ML)',
    place: 'Anil Neerukonda Institute of Technology and Sciences (ANITS)',
    period: '2023 — 2027',
    score: 'CGPA 8.7',
  },
  {
    title: 'Intermediate',
    place: 'Narayana Junior College (IIT Campus), Vijayawada',
    period: 'Board of Intermediate',
    score: '94.7%',
  },
]

export const achievements = [
  { label: 'AP EAMCET Rank', value: '11,234' },
  { label: 'TS EAMCET Rank', value: '17,503' },
]

export const leadership = {
  role: 'Vice President — Compliance',
  org: 'Street Cause, Visakhapatnam',
  period: '2025 — 2026',
  points: [
    'Ensured compliance with organisational policies, governance and ethical standards.',
    'Coordinated with leadership and teams to run social-impact initiatives.',
    'Managed documentation, reporting and regulatory adherence.',
  ],
}

// Shown as the big highlighted card in the "Beyond code" section
export const featuredCertification = {
  title: 'Certificate Program in Artificial Intelligence & Machine Learning',
  issuer: 'Vishlesan i-HUB, IIT Patna',
  partner: 'in association with Masai',
  batch: 'IITP-AIMLT-2603',
  stats: [
    { label: 'Overall CGPA', value: '7.03' },
    { label: 'Capstone Project', value: '10/10' },
    { label: 'Attendance', value: '100%' },
  ],
  modules: [
    { label: 'Module 1', score: 9.5 },
    { label: 'Module 2', score: 8.1 },
    { label: 'Module 3', score: 7.7 },
    { label: 'Capstone', score: 10 },
  ],
  file: '/iitp-aiml-scorecard.pdf',
}

export const certifications = [
  { name: 'Data Structures & Algorithms using Python', issuer: 'NPTEL · IIT Madras' },
  { name: 'The Complete Full-Stack Web Development Bootcamp', issuer: 'Udemy · Dr. Angela Yu' },
  { name: 'Python Programming', issuer: 'Udemy · Abdul Bari' },
  { name: 'Java Programming', issuer: 'Udemy · Abdul Bari' },
]
