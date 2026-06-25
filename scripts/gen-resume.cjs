/* Generates a clean one-page resume PDF (placeholder) with correct xref
 * offsets — no external dependencies. Content locked to CLAUDE.md Part 5. */
const fs = require('fs')
const path = require('path')

// --- Page content as PDF text operations -------------------------------------
const LINES = []
function line(x, y, size, font, text, color) {
  LINES.push({ x, y, size, font, text, color })
}

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

// Colors (r g b, 0-1)
const INK = '0.12 0.16 0.22'
const BLUE = '0.11 0.44 0.64'
const MUTE = '0.39 0.45 0.52'

let y = 800
line(56, y, 22, 'F2', 'DEEP NARAYAN YADAV', INK); y -= 24
line(56, y, 12, 'F1', 'AI Gameplay Data Annotator  |  Remote Contractor', BLUE); y -= 20
line(56, y, 9.5, 'F1', 'deepnarayanofficial241@gmail.com   +91 9019206025   India (Remote)', MUTE); y -= 14
line(56, y, 9.5, 'F1', 'linkedin.com/in/deepnarayanyadav', MUTE); y -= 26

function heading(t) { line(56, y, 11, 'F2', t, BLUE); y -= 4; LINES.push({ rule: true, y }); y -= 14 }
function body(t) { line(56, y, 10, 'F1', t, INK); y -= 14 }
function small(t) { line(56, y, 9, 'F1', t, MUTE); y -= 13 }

heading('SUMMARY')
body('Remote contractor with an RTX-powered capture rig and a precise, schema-driven')
body('annotation workflow. Turns gameplay into clean, structured training data, on time.')
y -= 8

heading('TECHNICAL SETUP')
small('OS Windows 11   CPU Intel Core i7-14700HX   GPU NVIDIA RTX 5060 (8 GB)   RAM 32 GB')
small('Internet 150 Mbps   Recording OBS Studio & NVIDIA ShadowPlay   Output 1080p / High-FPS')
small('Storage Google Drive, OneDrive, Cloud   Input Keyboard & Mouse / DualShock Controller')
y -= 8

heading('EXPERIENCE')
body('Admission & Social Media Manager - MedFit MBBS               Sep 2024 - Nov 2025')
body('Admin Head & Marketing Executive - Trimurty Group of Colleges  Jul 2023 - Jan 2024')
body('Telecaller & Meta Ads Specialist - MW Consultancy            May 2022 - Oct 2023')
body('Video Editor & Content Writer - Excel CV                     Jul 2021 - Dec 2021')
body('SEO Content Writer - Plant Made                              Mar 2021 - Jun 2021')
y -= 8

heading('GAME FAMILIARITY')
small('Open-World: Minecraft, GTA V, Ghost of Tsushima')
small('Action RPG: Elden Ring, Black Myth: Wukong, God of War')
small('Story: The Last of Us I & II, Uncharted, Marvel’s Spider-Man')
small('Horror: Resident Evil   Multiplayer: Valorant')
y -= 8

heading('EDUCATION & LANGUAGES')
body('Bachelor of Commerce (B.Com.) - LCIT College, ABV Vishwavidyalaya - CGPA 7.60')
small('English: Professional Working Proficiency   Hindi: Native')

// --- Build the content stream ------------------------------------------------
let stream = ''
for (const l of LINES) {
  if (l.rule) {
    stream += `0.80 0.85 0.90 RG 0.6 w 56 ${l.y} m 539 ${l.y} l S\n`
    continue
  }
  stream += `BT /${l.font} ${l.size} Tf ${l.color} rg 1 0 0 1 ${l.x} ${l.y} Tm (${esc(l.text)}) Tj ET\n`
}

// --- Assemble PDF objects with correct byte offsets --------------------------
const objects = []
objects.push('<< /Type /Catalog /Pages 2 0 R >>')
objects.push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
objects.push(
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] ' +
    '/Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>'
)
objects.push(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`)
objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')
objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>')

let pdf = '%PDF-1.4\n'
const offsets = []
objects.forEach((obj, i) => {
  offsets.push(Buffer.byteLength(pdf))
  pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`
})

const xrefStart = Buffer.byteLength(pdf)
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'
offsets.forEach((off) => {
  pdf += `${String(off).padStart(10, '0')} 00000 n \n`
})
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

const out = path.join(__dirname, '..', 'public', 'resume-deep-narayan-yadav.pdf')
fs.writeFileSync(out, pdf, 'latin1')
console.log('Wrote', out, `(${Buffer.byteLength(pdf)} bytes)`)
