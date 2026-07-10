import { useState } from 'react'
import DialogueBox from '../components/DialogueBox.jsx'
import './riddle.css'

// Step 3 – Filastrocca coi versi da riordinare.
// I versi escono mescolati; rimettendoli in ordine si svela la meta finale.
const VERSES = [
  'Quando la cena sarà terminata,',
  'l’ultima sorpresa ci verrà regalata.',
  'Prendimi la mano, ti voglio portare',
  'dove la notte si specchia nel mare.',
]

function shuffledOrder() {
  const idx = VERSES.map((_, i) => i)
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  if (idx.every((v, i) => v === i)) return shuffledOrder()
  return idx
}

export default function Step3Riddle({ onSolved }) {
  const [phase, setPhase] = useState('intro') // intro | puzzle | solved
  const [order, setOrder] = useState(shuffledOrder)

  const correct = order.every((v, i) => v === i)

  function move(pos, dir) {
    const target = pos + dir
    if (target < 0 || target >= order.length) return
    setOrder((prev) => {
      const next = [...prev]
      ;[next[pos], next[target]] = [next[target], next[pos]]
      if (next.every((v, i) => v === i)) {
        setTimeout(() => setPhase('solved'), 450)
      }
      return next
    })
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
        <div className="verse-poem">
          {VERSES.map((v, i) => (
            <div key={i} className="verse-line-final">{v}</div>
          ))}
        </div>
        <div className="verse-reveal">L’ultima tappa: IL MARE 🌊</div>
        <button className="pixel-btn" style={{ marginTop: 18 }} onClick={onSolved}>
          ANDIAMO
        </button>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="verse-hint">Rimetti i versi nell’ordine giusto</div>
      <div className={`verse-list ${correct ? 'ok' : ''}`}>
        {order.map((idx, pos) => (
          <div key={idx} className="verse-card">
            <span className="verse-text">{VERSES[idx]}</span>
            <div className="verse-moves">
              <button
                className="verse-move"
                onClick={() => move(pos, -1)}
                disabled={pos === 0}
                aria-label="su"
              >
                ▲
              </button>
              <button
                className="verse-move"
                onClick={() => move(pos, 1)}
                disabled={pos === order.length - 1}
                aria-label="giù"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
