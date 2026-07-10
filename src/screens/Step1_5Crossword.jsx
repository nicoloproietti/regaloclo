import { useState } from 'react'
import DialogueBox from '../components/DialogueBox.jsx'
import './crossword.css'

const WORD = ['S', '_', 'N', 'G', '_', 'T', 'A']
const BLANK_INDEXES = [1, 4]
const OPTIONS = ['I', 'E', 'O']

export default function Step1_5Crossword({ onComplete }) {
  const [filled, setFilled] = useState({})
  const [solved, setSolved] = useState(false)
  const [shake, setShake] = useState(false)
  const [dialogueDone, setDialogueDone] = useState(false)

  const nextBlank = BLANK_INDEXES.find((i) => filled[i] === undefined)

  function pickLetter(letter) {
    if (nextBlank === undefined || solved) return
    const updated = { ...filled, [nextBlank]: letter }
    setFilled(updated)

    const allFilled = BLANK_INDEXES.every((i) => updated[i] !== undefined)
    if (allFilled) {
      const correct = BLANK_INDEXES.every((i) => updated[i] === 'I')
      if (correct) {
        setSolved(true)
      } else {
        setShake(true)
        setTimeout(() => {
          setShake(false)
          setFilled({})
        }, 700)
      }
    }
  }

  if (solved && !dialogueDone) {
    return (
      <div className="screen crossword-solved-bg">
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
    <div className={`screen ${shake ? 'crossword-shake' : ''}`}>
      <div className="crossword-word">
        {WORD.map((ch, i) => (
          <div key={i} className={`crossword-cell ${ch === '_' ? 'crossword-blank' : ''}`}>
            {ch === '_' ? filled[i] || '' : ch}
          </div>
        ))}
      </div>
      <div className="crossword-options">
        {OPTIONS.map((opt) => (
          <button key={opt} className="pixel-btn crossword-option" onClick={() => pickLetter(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
