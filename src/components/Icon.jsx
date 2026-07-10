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
    <path d="M40 22v16M50 22v16M60 22v16" stroke="#c9ccd6" strokeWidth="5" />
    <path d="M40 38h20v6c0 4-2 6-6 7l-1 27h-6l-1-27c-4-1-6-3-6-7z" fill="#e7e9ef" />
  </Svg>
)
const Plate = (p) => (
  <Svg {...p}>
    <ellipse cx="50" cy="62" rx="36" ry="15" fill="#f2f4fa" />
    <ellipse cx="50" cy="58" rx="22" ry="9" fill="#dfe3ee" />
    <path d="M40 55l6-6 5 5 5-6" stroke="#c1c6d4" strokeWidth="4" />
  </Svg>
)
const Pasta = (p) => (
  <Svg {...p}>
    <path d="M20 54c8-8 52-8 60 0-2 18-10 30-30 30S22 72 20 54z" fill="#e88b2f" />
    <path d="M24 54h52" stroke="#fff2d6" strokeWidth="5" />
    <path d="M34 48c4-9 12-9 16-1M50 46c4-9 13-8 16 2" stroke="#ffcf6b" strokeWidth="5" />
  </Svg>
)
const Wine = (p) => (
  <Svg {...p}>
    <path d="M45 16h10v6l3 8c1 4 1 10 1 16v30a4 4 0 01-4 4h-10a4 4 0 01-4-4V46c0-6 0-12 1-16l3-8z" fill="#8f2f4a" />
    <rect x="42" y="44" width="16" height="18" rx="2" fill="#f2e2c0" stroke="none" />
  </Svg>
)

// ---- Ostacoli: NUR BAR ----
const Cocktail = (p) => (
  <Svg {...p}>
    <path d="M26 28h48L52 56z" fill="#ff8fb0" />
    <path d="M30 32h40" stroke="#ffd0df" strokeWidth="5" />
    <path d="M52 56v22M38 82h28" strokeWidth="5" />
    <circle cx="70" cy="24" r="5" fill="#ff5e7a" />
  </Svg>
)
const Speaker = (p) => (
  <Svg {...p}>
    <rect x="28" y="18" width="44" height="64" rx="10" fill="#5a4d86" />
    <circle cx="50" cy="36" r="8" fill="#cfc4f5" />
    <circle cx="50" cy="60" r="13" fill="#8f7fd4" />
    <circle cx="50" cy="60" r="5" fill="#3b3160" />
  </Svg>
)
const Bulb = (p) => (
  <Svg {...p}>
    <circle cx="50" cy="42" r="22" fill="#ffe27a" />
    <path d="M40 40l8 8 12-14" stroke="#f4b83a" strokeWidth="5" />
    <rect x="42" y="62" width="16" height="14" rx="3" fill="#c9ccd6" />
  </Svg>
)

// ---- Ostacoli: PONTE MILVIO ----
const Lock = (p) => (
  <Svg {...p}>
    <path d="M37 48V38a13 13 0 0126 0v10" strokeWidth="7" />
    <rect x="28" y="46" width="44" height="36" rx="9" fill="#ffd15c" />
    <circle cx="50" cy="62" r="5" fill={INK} stroke="none" />
    <path d="M50 66v6" strokeWidth="5" />
  </Svg>
)
const Bike = (p) => (
  <Svg {...p}>
    <circle cx="30" cy="66" r="16" fill="#eaf6ff" />
    <circle cx="70" cy="66" r="16" fill="#eaf6ff" />
    <circle cx="30" cy="66" r="4" fill={INK} stroke="none" />
    <circle cx="70" cy="66" r="4" fill={INK} stroke="none" />
    <path d="M30 66l16-24 24 24M46 42l-8 24M46 42h16" stroke="#ff6f5e" strokeWidth="5" />
  </Svg>
)
const Bench = (p) => (
  <Svg {...p}>
    <rect x="22" y="44" width="56" height="9" rx="4" fill="#b07a44" />
    <rect x="22" y="56" width="56" height="9" rx="4" fill="#9a6a3c" />
    <path d="M30 65v15M70 65v15" strokeWidth="6" />
  </Svg>
)

// ---- Ostacoli: LONDRA ----
const Suitcase = (p) => (
  <Svg {...p}>
    <path d="M42 30h16v8" strokeWidth="6" />
    <rect x="24" y="38" width="52" height="44" rx="8" fill="#c14a3d" />
    <rect x="24" y="52" width="52" height="7" fill="#8f3128" stroke="none" />
    <rect x="44" y="34" width="12" height="10" rx="3" fill="#8f3128" />
  </Svg>
)
const Umbrella = (p) => (
  <Svg {...p}>
    <path d="M20 54a30 26 0 0160 0z" fill="#ff6f5e" />
    <path d="M20 54q10-8 20 0 10-8 20 0 10-8 20 0" stroke="#c94a3c" strokeWidth="4" />
    <path d="M50 54v24a9 9 0 01-15 5" strokeWidth="5" />
  </Svg>
)
const Phone = (p) => (
  <Svg {...p}>
    <rect x="32" y="18" width="36" height="64" rx="7" fill="#d33c3c" />
    <rect x="38" y="26" width="24" height="30" rx="3" fill="#ffe1e1" />
    <path d="M38 62h24" strokeWidth="4" />
  </Svg>
)

// ---- Runner: Claudia, ragazza bionda con vestito blu (vista di lato) ----
export function RunnerChar({ size = 64 }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 120 130" fill="none"
      stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg">
      {/* coda di cavallo che svolazza dietro */}
      <path d="M50 26c-16-6-30 0-36 10 8-2 12 0 14 4-8 2-12 8-12 16 8-6 14-6 18-4"
        fill="#f6cf5e" />
      {/* gambe in corsa */}
      <g className="runner-legs">
        <path d="M62 84l10 20" stroke={INK} strokeWidth="9" />
        <path d="M62 84l-4 22" stroke={INK} strokeWidth="9" />
      </g>
      {/* scarpe */}
      <path d="M70 104l10 3M56 106l-10 2" stroke="#e05a7a" strokeWidth="8" />
      {/* vestito blu */}
      <path d="M58 44c12 0 20 8 22 20l4 22-40 0 4-24c2-10 6-16 10-18z" fill="#4a90ff" />
      {/* braccia */}
      <path d="M62 54l18 6" stroke="#f4c79a" strokeWidth="8" />
      <path d="M60 54l-14 12" stroke="#f4c79a" strokeWidth="8" />
      {/* testa */}
      <circle cx="64" cy="28" r="17" fill="#ffe0b3" />
      {/* frangia bionda */}
      <path d="M48 26c0-12 10-18 20-16 8 1 12 6 12 12-6-4-10-4-14-2-3-6-12-4-18 6z"
        fill="#f6cf5e" />
      {/* occhio + guancia + sorriso */}
      <circle cx="72" cy="28" r="3" fill={INK} stroke="none" />
      <circle cx="78" cy="34" r="4" fill="rgba(255,120,140,0.5)" stroke="none" />
      <path d="M74 38q5 2 8-1" stroke={INK} strokeWidth="3.5" />
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

// ---- Scenografie di sfondo per il minigioco corsa ----
export const DiscoBall = ({ size = 120 }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 120 180" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M60 0v40" stroke={INK} strokeWidth="4" />
    <circle cx="60" cy="90" r="46" fill="#cfd8ff" stroke={INK} strokeWidth="5" />
    <g stroke="#8ea2e8" strokeWidth="3">
      <path d="M14 90h92M60 44v92M26 58l68 64M94 58l-68 64" />
      <path d="M22 72h76M22 108h76" />
    </g>
    <rect x="40" y="66" width="12" height="12" fill="#fff" opacity="0.9" />
    <rect x="70" y="96" width="10" height="10" fill="#fff" opacity="0.8" />
  </svg>
)

export const BigBen = ({ size = 130 }) => (
  <svg width={size} height={size * 2.1} viewBox="0 0 130 270" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M40 90h50v170H40z" fill="#c9a86a" stroke={INK} strokeWidth="5" />
    <path d="M36 90l29-34 29 34z" fill="#b78a4e" stroke={INK} strokeWidth="5" />
    <path d="M65 40v16" stroke={INK} strokeWidth="5" />
    <circle cx="65" cy="120" r="17" fill="#fff8e6" stroke={INK} strokeWidth="5" />
    <path d="M65 120V108M65 120l9 5" stroke={INK} strokeWidth="4" />
    <path d="M46 168h38M46 196h38M46 224h38" stroke="#9c7b44" strokeWidth="5" />
  </svg>
)

export const Bridge = ({ size = 320 }) => (
  <svg width={size} height={size * 0.42} viewBox="0 0 320 134" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M0 92h320" stroke={INK} strokeWidth="6" />
    <path d="M20 92c26-46 74-46 100 0M110 92c26-46 74-46 100 0M200 92c26-46 74-46 100 0"
      fill="#e7c88f" stroke={INK} strokeWidth="5" />
    <path d="M0 62h320" stroke={INK} strokeWidth="6" />
    <path d="M0 62v-16M60 62v-16M120 62v-16M200 62v-16M260 62v-16M320 62v-16"
      stroke={INK} strokeWidth="5" />
  </svg>
)

// Fiume: banda d'acqua che riempie tutta la larghezza (path fino a x=300)
export const River = () => (
  <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 24q30-16 60 0t60 0t60 0t60 0t60 0V100H0Z" fill="#5fb0e6" />
    <path d="M0 24q30-16 60 0t60 0t60 0t60 0t60 0" stroke="#9fd4f2" strokeWidth="6" fill="none" />
    <g stroke="#bfe4f7" strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M28 52q12-7 24 0" />
      <path d="M132 62q12-7 24 0" />
      <path d="M228 54q12-7 24 0" />
      <path d="M80 78q12-7 24 0" />
      <path d="M196 84q12-7 24 0" />
    </g>
  </svg>
)

// Ponte in pietra ad arcate (stile Ponte Milvio), con lucchetti dell'amore
export const StoneBridge = ({ size = 320 }) => (
  <svg width={size} height={size * 0.52} viewBox="0 0 300 156" fill="none"
    stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"
    xmlns="http://www.w3.org/2000/svg">
    {/* corpo del ponte */}
    <path d="M16 74h268v54H16z" fill="#e3cfa0" />
    {/* arcate (acqua sotto) */}
    <path d="M40 128a30 30 0 0 1 60 0z" fill="#5fb0e6" />
    <path d="M120 128a30 30 0 0 1 60 0z" fill="#5fb0e6" />
    <path d="M200 128a30 30 0 0 1 60 0z" fill="#5fb0e6" />
    {/* chiavi di volta */}
    <path d="M70 88v10M150 88v10M230 88v10" stroke="#c4a970" strokeWidth="5" />
    {/* parapetto */}
    <rect x="10" y="56" width="280" height="20" rx="6" fill="#efe0bb" />
    {/* pilastrini della ringhiera */}
    <path d="M40 56v-12M90 56v-12M150 56v-12M210 56v-12M260 56v-12" strokeWidth="5" />
    <path d="M28 44h244" strokeWidth="5" />
    {/* lucchetti dell'amore */}
    <g stroke={INK} strokeWidth="3">
      <rect x="112" y="46" width="12" height="12" rx="2" fill="#ffd15c" />
      <path d="M114 46v-3a4 4 0 0 1 8 0v3" fill="none" />
      <rect x="178" y="46" width="12" height="12" rx="2" fill="#ff9bb3" />
      <path d="M180 46v-3a4 4 0 0 1 8 0v3" fill="none" />
    </g>
  </svg>
)

export const Trattoria = ({ size = 150 }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 150 135" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="118" cy="30" r="22" fill="#ffe27a" stroke={INK} strokeWidth="5" />
    <path d="M20 60h110v14H20z" fill="#e0553f" stroke={INK} strokeWidth="5" />
    <path d="M20 74l14 18M48 74l14 18M76 74l14 18M104 74l14 18" stroke="#fff" strokeWidth="6" />
    <path d="M28 92h94v34H28z" fill="#f6e6c8" stroke={INK} strokeWidth="5" />
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
