import { useEffect, useRef, useState } from 'react'
import Sprite from './Sprite.jsx'
import './dialogueBox.css'

// lines: [{ speaker: 'nico'|'claudia', text: string, reaction?: string }]
// onDone: chiamato quando tutte le righe sono state lette
// action: nodo opzionale mostrato dopo l'ultima riga (bottone, input, ecc.)
export default function DialogueBox({ lines, onDone, action, actionLabel }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [typing, setTyping] = useState(true)
  const timerRef = useRef(null)

  const current = lines[lineIndex]

  useEffect(() => {
    setCharIndex(0)
    setTyping(true)
  }, [lineIndex])

  useEffect(() => {
    if (!typing) return
    if (charIndex >= current.text.length) {
      setTyping(false)
      return
    }
    timerRef.current = setTimeout(() => setCharIndex((c) => c + 1), 34)
    return () => clearTimeout(timerRef.current)
  }, [charIndex, typing, current.text])

  const isLastLine = lineIndex === lines.length - 1

  function handleAdvance() {
    if (typing) {
      clearTimeout(timerRef.current)
      setCharIndex(current.text.length)
      setTyping(false)
      return
    }
    if (isLastLine) {
      onDone && onDone()
      return
    }
    setLineIndex((i) => i + 1)
  }

  const showAction = isLastLine && !typing && action

  return (
    <div className="dialogue-root" onClick={!showAction ? handleAdvance : undefined}>
      <div className="dialogue-sprites">
        <Sprite who="nico" size={64} />
        {current.claudiaVisible && (
          <Sprite who="claudia" reaction={current.reaction} size={64} />
        )}
      </div>
      <div className="dialogue-box">
        <div className="dialogue-speaker">
          {current.speaker === 'nico' ? 'NICOLÒ' : 'CLAUDIA'}
        </div>
        <div className="dialogue-text">
          {current.text.slice(0, charIndex)}
        </div>
        {!typing && !showAction && (
          <div className="dialogue-arrow">▼</div>
        )}
        {showAction && (
          <div className="dialogue-action" onClick={(e) => e.stopPropagation()}>
            {action}
          </div>
        )}
      </div>
    </div>
  )
}
