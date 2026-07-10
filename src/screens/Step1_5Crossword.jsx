import { useState } from 'react'
import DialogueBox from '../components/DialogueBox.jsx'
import './crossword.css'

// Slot delle lettere: ogni rotella scorre tra poche lettere,
// tap per fermarla su quella giusta fino a comporre SINGITA.
const SLOTS = [
  { correct: 'S', options: ['S', 'Z', 'C'] },
  { correct: 'I', options: ['E', 'I', 'L'] },
  { correct: 'N', options: ['N', 'M', 'H'] },
  { correct: 'G', options: ['C', 'G', 'Q'] },
  { correct: 'I', options: ['A', 'O', 'I'] },
  { correct: 'T', options: ['T', 'F', 'P'] },
  { correct: 'A', options: ['E', 'A', 'O'] },
]

// parte sempre da una lettera SBAGLIATA per ogni rotella
function randomStart() {
  return SLOTS.map((s) => {
    const wrong = s.options
      .map((_, idx) => idx)
      .filter((idx) => s.options[idx] !== s.correct)
    return wrong[Math.floor(Math.random() * wrong.length)]
  })
}

export default function Step1_5Crossword({ onComplete }) {
  const [started, setStarted] = useState(false)
  const [indices, setIndices] = useState(randomStart)
  const [solved, setSolved] = useState(false)
  const [dialogueDone, setDialogueDone] = useState(false)

  function letterAt(i) {
    return SLOTS[i].options[indices[i]]
  }

  function spin(i) {
    if (solved) return
    setIndices((prev) => {
      const next = [...prev]
      next[i] = (next[i] + 1) % SLOTS[i].options.length
      const done = SLOTS.every((s, k) => s.options[next[k]] === s.correct)
      if (done) setTimeout(() => setSolved(true), 250)
      return next
    })
  }

  // dialogo introduttivo prima del minigioco
  if (!started) {
    return (
      <div className="screen">
        <DialogueBox
          lines={[
            { speaker: 'nico', text: 'Okay, ora possiamo giocare di nuovo!' },
            { speaker: 'nico', text: 'Completa questo minigioco per scoprire la nostra destinazione.' },
          ]}
          action={
            <button className="pixel-btn" onClick={() => setStarted(true)}>
              GIOCA
            </button>
          }
        />
      </div>
    )
  }

  if (solved && !dialogueDone) {
    return (
      <div className="screen crossword-solved-bg">
        <div className="slot-word slot-word-solved">
          {SLOTS.map((s, i) => (
            <div key={i} className="slot slot-locked">
              <span className="slot-letter">{s.correct}</span>
            </div>
          ))}
        </div>
        <DialogueBox
          lines={[{ speaker: 'nico', text: 'Ci vediamo lì tra poco. 🌅' }]}
          onDone={() => {
            setDialogueDone(true)
            onComplete && onComplete()
          }}
        />
      </div>
    )
  }

  if (solved && dialogueDone) {
    return (
      <div className="screen crossword-solved-bg">
        <div className="title-card">In attesa del prossimo indizio...</div>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="slot-hint">Tocca le rotelle e ferma ogni lettera al posto giusto</div>
      <div className="slot-word">
        {SLOTS.map((s, i) => {
          const correct = letterAt(i) === s.correct
          return (
            <button
              key={i}
              className={`slot ${correct ? 'slot-ok' : ''}`}
              onClick={() => spin(i)}
            >
              <span key={`${i}-${indices[i]}`} className="slot-letter slot-spin">
                {letterAt(i)}
              </span>
            </button>
          )
        })}
      </div>
      <div className="slot-sub">il nome del posto dove andremo</div>
    </div>
  )
}
