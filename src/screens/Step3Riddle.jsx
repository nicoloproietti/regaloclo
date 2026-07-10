import { useState } from 'react'
import Sprite from '../components/Sprite.jsx'
import './riddle.css'

const PROMPT_LINES = [
  "Un'ultima cosa, prima di finire la serata.",
  'C\'è un posto dove oggi \nhai visto il sole scomparire.',
  'Lì, per te, tutto è iniziato stasera.',
  'E lì, stanotte, ti aspetta l\'ultima sorpresa.',
  'Dove ti aspetto ora?',
]

const VALID_SUBSTRINGS = ['spiagg', 'mare', 'singita']

export default function Step3Riddle({ onSolved }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [showRetry, setShowRetry] = useState(false)
  const [solved, setSolved] = useState(false)

  const showInput = lineIndex >= PROMPT_LINES.length - 1

  function advance() {
    if (lineIndex < PROMPT_LINES.length - 1) setLineIndex((i) => i + 1)
  }

  function submit() {
    const normalized = answer.trim().toLowerCase()
    const ok = VALID_SUBSTRINGS.some((s) => normalized.includes(s))
    if (ok) {
      setSolved(true)
    } else {
      setShowRetry(true)
    }
  }

  if (solved) {
    return (
      <div className="screen riddle-solved-bg">
        <div className="title-card">
          Ti aspetto lì. 🌙
          <div style={{ marginTop: 16 }}>
            <button className="pixel-btn" onClick={onSolved}>
              CONTINUA
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen" onClick={!showInput ? advance : undefined}>
      <div className="dialogue-sprites">
        <Sprite who="nico" size={64} />
      </div>
      <div className="dialogue-box">
        <div className="dialogue-speaker">NICOLÒ</div>
        <div className="dialogue-text">{PROMPT_LINES[lineIndex]}</div>
        {showInput && (
          <div className="riddle-input-row" onClick={(e) => e.stopPropagation()}>
            <input
              className="riddle-input"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value)
                setShowRetry(false)
              }}
              placeholder="______"
            />
            <button className="pixel-btn" onClick={submit}>
              OK
            </button>
          </div>
        )}
        {showRetry && <div className="riddle-retry">Prova ancora ❤</div>}
        {!showInput && <div className="dialogue-arrow">▼</div>}
      </div>
    </div>
  )
}
