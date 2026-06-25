// ============================================================
// content.js — Single source of truth for all copy.
// Locked to CLAUDE.md Part 5. Do not invent or change facts.
// ============================================================

export const PERSONAL = {
  name: 'Deep Narayan Yadav',
  role: 'AI Gameplay Data Annotator',
  tagline: 'Remote Contractor',
  email: 'deepnarayanofficial241@gmail.com',
  phone: '+91 9019206025',
  location: 'India (Remote)',
  linkedin: 'https://linkedin.com/in/deepnarayanyadav',
  linkedinLabel: 'linkedin.com/in/deepnarayanyadav',
  // Update this to the public repo once created (Part 9).
  github: 'https://github.com/deepnarayanyadav/deepnarayan-portfolio',
  githubLabel: 'github.com/deepnarayanyadav/deepnarayan-portfolio',
  resume: '/resume-deep-narayan-yadav.pdf',
}

// 5.2 — Hardware specs. `meter` is an illustrative readiness fill (0-100).
export const SETUP = [
  { label: 'OS', value: 'Windows 11', meter: 100, unit: '' },
  { label: 'CPU', value: 'Intel Core i7-14700HX', meter: 92, unit: '' },
  { label: 'GPU', value: 'NVIDIA RTX 5060', detail: '8 GB', meter: 88, unit: '' },
  { label: 'RAM', value: '32 GB', meter: 80, unit: '' },
  { label: 'Internet', value: '150 Mbps', detail: 'Stable', meter: 75, unit: '' },
  { label: 'Recording', value: 'OBS Studio & NVIDIA ShadowPlay', meter: 100, unit: '' },
  { label: 'Output', value: '1080p / High-FPS', meter: 95, unit: '' },
  { label: 'Storage', value: 'Google Drive, OneDrive, Cloud', meter: 100, unit: '' },
  { label: 'Input', value: 'Keyboard & Mouse / DualShock', meter: 100, unit: '' },
]

// 5.3 — Games. Notes describe annotation-relevant depth (not invented play history).
export const GAMES = [
  {
    category: 'Open-World',
    titles: ['Minecraft', 'GTA V', 'Ghost of Tsushima'],
    note: 'Complex spatial exploration — ideal for mapping, navigation, and route annotation.',
  },
  {
    category: 'Action RPG',
    titles: ['Elden Ring', 'Black Myth: Wukong', 'God of War'],
    note: 'Dense NPC interaction trees and combat states — rich material for event and state annotation.',
  },
  {
    category: 'Story',
    titles: [
      'The Last of Us Part I & II',
      'Uncharted Series',
      "Marvel's Spider-Man Series",
    ],
    note: 'Linear narrative beats and scripted sequences — clear ground truth for timeline labeling.',
  },
  {
    category: 'Horror',
    titles: ['Resident Evil Series'],
    note: 'Tense pacing and resource decisions — useful for intent and decision-point annotation.',
  },
  {
    category: 'Multiplayer',
    titles: ['Valorant'],
    note: 'Fast competitive play — high-frequency action labeling and reaction-time tagging.',
  },
]

// 5.4 — Experience, with annotation-adjacent "skill bridge" framing (Part 8, Phase 7).
export const EXPERIENCE = [
  {
    title: 'Admission & Social Media Manager',
    company: 'MedFit MBBS',
    period: 'Sep 2024 – Nov 2025',
    bridge: 'Structured content verification = annotation accuracy.',
  },
  {
    title: 'Admin Head & Marketing Executive',
    company: 'Trimurty Group of Colleges',
    period: 'Jul 2023 – Jan 2024',
    bridge: 'Process ownership = reliable, repeatable delivery.',
  },
  {
    title: 'Telecaller & Meta Ads Specialist',
    company: 'MW Consultancy',
    period: 'May 2022 – Oct 2023',
    bridge: 'Script adherence = strict instruction following.',
  },
  {
    title: 'Video Editor & Content Writer',
    company: 'Excel CV',
    period: 'Jul 2021 – Dec 2021',
    bridge: 'Client brief execution = task compliance.',
  },
  {
    title: 'SEO Content Writer',
    company: 'Plant Made',
    period: 'Mar 2021 – Jun 2021',
    bridge: 'Detail-oriented writing = precise, schema-driven labeling.',
  },
]

// 5.5 / 5.6
export const EDUCATION = {
  degree: 'Bachelor of Commerce (B.Com.)',
  college: 'LCIT College, Atal Bihari Vajpayee Vishwavidyalaya',
  cgpa: '7.60',
}

export const LANGUAGES = [
  { name: 'English', level: 'Professional Working Proficiency' },
  { name: 'Hindi', level: 'Native' },
]

// Part 8, Phase 6 — the annotation workflow.
export const WORKFLOW = [
  {
    id: '01',
    key: 'BRIEF',
    title: 'Brief',
    icon: 'FileText',
    text: 'Read task assignment, understand the game, configure session parameters, and verify recording settings before starting.',
  },
  {
    id: '02',
    key: 'CAPTURE',
    title: 'Capture',
    icon: 'Circle',
    text: 'Launch game, confirm OBS / ShadowPlay active, execute the assigned task (exploration, interaction, objective-play), and maintain a stable 60+ FPS throughout.',
  },
  {
    id: '03',
    key: 'ANNOTATE',
    title: 'Annotate',
    icon: 'Tag',
    text: 'Review footage, mark key moments, log timestamps, and apply structured labels. Follow the exact schema provided — no improvisation.',
  },
  {
    id: '04',
    key: 'DELIVER',
    title: 'Deliver',
    icon: 'Upload',
    text: 'Quality-check for lag, audio sync, and resolution accuracy. Package with session notes and upload via cloud storage within deadline.',
  },
]

export const QUALITY_COMMITMENTS = [
  'Zero Lag',
  '1080p Minimum',
  'On-Time Delivery',
  'Instruction Adherence',
]

// Part 8, Phase 8 — sample work placeholders.
export const SAMPLES = [
  {
    id: 'Sample 01',
    title: 'Minecraft Cave Exploration',
    duration: '18m 42s',
    spec: '1080p / 60fps',
    task: 'Spatial Mapping',
  },
  {
    id: 'Sample 02',
    title: 'Open World Navigation',
    duration: '24m 10s',
    spec: '1080p / 60fps',
    task: 'Route Annotation',
  },
  {
    id: 'Sample 03',
    title: 'Structured Interaction Task',
    duration: '15m 00s',
    spec: '1080p / 60fps',
    task: 'Event Labeling',
  },
]

// Nav sections (Part 8, Phase 2).
export const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'setup', label: 'Setup' },
  { id: 'gaming', label: 'Games' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Samples' },
  { id: 'contact', label: 'Contact' },
]
