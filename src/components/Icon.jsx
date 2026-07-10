// Set di icone cartoon disegnate in SVG (niente emoji).
// Outline scuro spesso + fill piatti, stile mobile game.

const INK = '#2b2140'

function Svg({ children, size = 40, vb = 100 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vb} ${vb}`}
      fill="none"
      stroke={INK}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

// ---- Ostacoli: PRANZO ----
const Fork = (p) => (
  <Svg {...p}>
    <path d="M42 20v22c0 6 8 6 8 0V20" fill="#e7e9ef" />
    <path d="M46 42v40" stroke={INK} />
    <path d="M42 20v14M50 20v14" />
  </Svg>
)
const Plate = (p) => (
  <Svg {...p}>
    <ellipse cx="50" cy="60" rx="34" ry="14" fill="#f2f4fa" />
    <ellipse cx="50" cy="56" rx="20" ry="8" fill="#dfe3ee" />
  </Svg>
)
const Pasta = (p) => (
  <Svg {...p}>
    <path d="M22 56h56l-6 22a10 10 0 01-10 8H38a10 10 0 01-10-8z" fill="#ffcf6b" />
    <path d="M34 50c4-8 12-8 16 0M50 48c4-8 12-8 16 2" stroke="#e88b2f" />
  </Svg>
)
const Wine = (p) => (
  <Svg {...p}>
    <path d="M44 18h12v22c0 8-12 8-12 0z" fill="#8f2f4a" />
    <path d="M46 40v40h8V40" fill="#7a2740" />
  </Svg>
)

// ---- Ostacoli: NUR BAR ----
const Cocktail = (p) => (
  <Svg {...p}>
    <path d="M28 30h44L50 58z" fill="#ff8fb0" />
    <path d="M50 58v22M36 82h28" />
  </Svg>
)
const Speaker = (p) => (
  <Svg {...p}>
    <rect x="30" y="22" width="40" height="56" rx="8" fill="#4a3f6b" />
    <circle cx="50" cy="40" r="7" fill="#c7bdf0" />
    <circle cx="50" cy="62" r="11" fill="#c7bdf0" />
  </Svg>
)
const Bulb = (p) => (
  <Svg {...p}>
    <circle cx="50" cy="44" r="22" fill="#ffe27a" />
    <path d="M40 66h20M42 76h16" />
  </Svg>
)

// ---- Ostacoli: PONTE MILVIO ----
const Lock = (p) => (
  <Svg {...p}>
    <path d="M38 46V36a12 12 0 0124 0v10" />
    <rect x="30" y="46" width="40" height="34" rx="8" fill="#ffd15c" />
    <circle cx="50" cy="62" r="5" fill={INK} />
  </Svg>
)
const Bike = (p) => (
  <Svg {...p}>
    <circle cx="32" cy="64" r="16" fill="#bfe6ff" />
    <circle cx="70" cy="64" r="16" fill="#bfe6ff" />
    <path d="M32 64l14-24 24 24M46 40h14" stroke="#ff6f5e" />
  </Svg>
)
const Bench = (p) => (
  <Svg {...p}>
    <rect x="24" y="46" width="52" height="12" rx="4" fill="#9a6a3c" />
    <path d="M30 58v22M70 58v22" />
  </Svg>
)

// ---- Ostacoli: LONDRA ----
const Suitcase = (p) => (
  <Svg {...p}>
    <path d="M40 30h20v8" />
    <rect x="26" y="38" width="48" height="42" rx="6" fill="#c14a3d" />
    <path d="M50 38v42" stroke="#8f3128" />
  </Svg>
)
const Umbrella = (p) => (
  <Svg {...p}>
    <path d="M22 52a28 28 0 0156 0z" fill="#ff6f5e" />
    <path d="M50 52v26a8 8 0 01-14 4" />
  </Svg>
)
const Phone = (p) => (
  <Svg {...p}>
    <rect x="34" y="22" width="32" height="58" rx="6" fill="#d33c3c" />
    <rect x="40" y="30" width="20" height="26" rx="3" fill="#ffd7d7" />
  </Svg>
)

// ---- Runner ----
export function RunnerChar({ size = 52 }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none"
      stroke={INK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="52" cy="24" r="16" fill="#f4c893" />
      <path d="M40 16a14 12 0 0124 0z" fill="#3d2b1f" />
      <circle cx="58" cy="24" r="3" fill={INK} stroke="none" />
      <path d="M52 40c14 0 20 10 20 22l-6 6" fill="#4a90ff" />
      <path d="M52 40c-6 2-10 8-10 16l-2 10" fill="#4a90ff" />
      <path d="M52 62l14 6M52 62l-8 14" className="runner-legs" />
    </svg>
  )
}

// ---- Mappa del tesoro ----
export const Paw = (p) => (
  <Svg {...p}>
    <ellipse cx="50" cy="64" rx="18" ry="14" fill="#6b4a2a" />
    <circle cx="30" cy="44" r="8" fill="#6b4a2a" />
    <circle cx="44" cy="34" r="8" fill="#6b4a2a" />
    <circle cx="58" cy="34" r="8" fill="#6b4a2a" />
    <circle cx="72" cy="44" r="8" fill="#6b4a2a" />
  </Svg>
)
export const XMark = (p) => (
  <Svg {...p}>
    <path d="M32 32l36 36M68 32L32 68" stroke="#c14a3d" strokeWidth="10" />
  </Svg>
)
export const MapMark = (p) => (
  <Svg {...p}>
    <path d="M50 20c14 0 24 10 24 24 0 18-24 36-24 36S26 62 26 44c0-14 10-24 24-24z" fill="#ff6f5e" />
    <circle cx="50" cy="44" r="9" fill="#fff" stroke="none" />
  </Svg>
)
export const Chest = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
    stroke={INK} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M20 44a30 20 0 0160 0z" fill="#a86a34" />
    <rect x="20" y="44" width="60" height="34" rx="4" fill="#c98a4a" />
    <rect x="42" y="40" width="16" height="20" rx="3" fill="#ffd15c" />
    <circle cx="50" cy="52" r="4" fill={INK} stroke="none" />
    <path d="M20 78h60" />
  </svg>
)

// ---- Reazioni personaggi ----
export const Heart = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="#ff5e7a"
    stroke={INK} strokeWidth="7" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 82S16 60 16 38a18 18 0 0134-8 18 18 0 0134 8c0 22-34 44-34 44z" />
  </svg>
)
export const Question = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
    stroke="#7b5cff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M36 40a14 14 0 1122 12c-6 4-8 8-8 14" />
    <circle cx="50" cy="80" r="3" fill="#7b5cff" stroke="none" />
  </svg>
)
export const Envelope = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
    stroke="#7b5cff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="28" width="64" height="44" rx="8" fill="#ede9ff" />
    <path d="M20 32l30 24 30-24" />
  </svg>
)

// ---- Decorazioni Animal Crossing ----
export const Leaf = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
    stroke={INK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M78 22C40 20 22 44 22 70c0 6 2 10 2 10s28 0 44-16c14-14 10-42 10-42z" fill="#8ed05a" />
    <path d="M28 74C44 58 60 44 74 30" stroke="#4f9b2e" />
  </svg>
)
export const Star = ({ size = 22, color = '#ffe27a' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill={color}
    stroke={INK} strokeWidth="6" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 12l11 24 26 3-19 18 5 26-23-13-23 13 5-26-19-18 26-3z" />
  </svg>
)

// Registro ostacoli per chiave usata in Step1Runner
export const OBSTACLE_ICONS = {
  fork: Fork,
  plate: Plate,
  pasta: Pasta,
  wine: Wine,
  cocktail: Cocktail,
  speaker: Speaker,
  bulb: Bulb,
  lock: Lock,
  bike: Bike,
  bench: Bench,
  suitcase: Suitcase,
  umbrella: Umbrella,
  phone: Phone,
}
