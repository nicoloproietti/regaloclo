import { useState } from 'react'
import DialogueBox from '../components/DialogueBox.jsx'
import './riddle.css'

// Step 3 – Filastrocca coi versi da riordinare (tap per scambiare).
const VERSES = [
  'Quando la cena sarà terminata,',
  'l’ultima sorpresa ci verrà regalata.',
  'Prendimi la mano, ti voglio portare',
  'dove la notte si specchia nel mare.',
]

// mescola in modo che NESSUN verso resti al posto giusto (derangement)
function scrambledOrder() {
  const idx = VERSES.map((_, i) => i)
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  if (idx.some((v, i) => v === i)) return scrambledOrder()
  return idx
}

export default function Step3Riddle({ onSolved }) {
  const [phase, setPhase] = useState('intro') // intro | puzzle | solved
  const [order, setOrder] = useState(scrambledOrder)
  const [selected, setSelected] = useState(null) // posizione selezionata

  const correct = order.every((v, i) => v === i)

  function tap(pos) {
    if (selected === null) {
      setSelected(pos)
      return
    }
    if (selected === pos) {
      setSelected(null)
      return
    }
    setOrder((prev) => {
      const next = [...prev]
      ;[next[selected], next[pos]] = [next[pos], next[selected]]
      if (next.every((v, i) => v === i)) setTimeout(() => setPhase('solved'), 450)
      return next
    })
    setSelected(null)
  }

  if (phase === 'intro') {
    return (
      <div className="screen">
        <DialogueBox
          lines={[
            { speaker: 'nico', text: "Un'ultima cosa, prima di finire la serata." },
            { speaker: 'nico', text: 'Ho scritto una filastrocca... ma i versi si sono mischiati!' },
            { speaker: 'nico', text: 'Rimettili in ordine e scoprirai dove andremo adesso.' },
          ]}
          action={
            <button className="pixel-btn" onClick={() => setPhase('puzzle')}>
              LEGGI
            </button>
          }
        />
      </div>
    )
  }

  if (phase === 'solved') {
    return (
      <div className="screen riddle-solved-bg">
        <div className="papyrus">
          <div className="papyrus-orn">✦ ✦ ✦</div>
          {VERSES.map((v, i) => (
            <div key={i} className="papyrus-line">{v}</div>
          ))}
          <div className="papyrus-divider" />
          <div className="papyrus-reveal">L’ultima tappa: IL MARE 🌊</div>
        </div>
        <button className="pixel-btn" onClick={onSolved}>
          ANDIAMO
        </button>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="verse-hint">Tocca due versi per scambiarli di posto</div>
      <div className={`verse-list ${correct ? 'ok' : ''}`}>
        {order.map((idx, pos) => (
          <button
            key={idx}
            className={`verse-card ${selected === pos ? 'selected' : ''}`}
            onClick={() => tap(pos)}
          >
            <span className="verse-num">{pos + 1}</span>
            <span className="verse-text">{VERSES[idx]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
