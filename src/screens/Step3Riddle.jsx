import { useRef, useState } from 'react'
import DialogueBox from '../components/DialogueBox.jsx'
import './riddle.css'

// Step 3 – Filastrocca coi versi da riordinare (drag & drop).
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

function arrayMove(arr, from, to) {
  const a = [...arr]
  const [it] = a.splice(from, 1)
  a.splice(to, 0, it)
  return a
}

export default function Step3Riddle({ onSolved }) {
  const [phase, setPhase] = useState('intro') // intro | puzzle | solved
  const [order, setOrder] = useState(scrambledOrder)
  const [dragIdx, setDragIdx] = useState(null) // verse idx in trascinamento

  const listRef = useRef(null)
  const dragPosRef = useRef(null)
  const strideRef = useRef(1)
  const topRef = useRef(0)

  const correct = order.every((v, i) => v === i)

  function startDrag(pos, e) {
    dragPosRef.current = pos
    setDragIdx(order[pos])
    const kids = listRef.current?.children
    if (kids && kids.length) {
      const r0 = kids[0].getBoundingClientRect()
      topRef.current = r0.top
      strideRef.current =
        kids.length > 1 ? kids[1].getBoundingClientRect().top - r0.top : r0.height
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch (_) {}
  }

  function onDrag(e) {
    if (dragPosRef.current === null) return
    const rel = e.clientY - topRef.current
    let target = Math.round(rel / strideRef.current)
    target = Math.max(0, Math.min(order.length - 1, target))
    if (target !== dragPosRef.current) {
      setOrder((prev) => arrayMove(prev, dragPosRef.current, target))
      dragPosRef.current = target
    }
  }

  function endDrag() {
    dragPosRef.current = null
    setDragIdx(null)
    setOrder((prev) => {
      if (prev.every((v, i) => v === i)) setTimeout(() => setPhase('solved'), 450)
      return prev
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
      <div className="verse-hint">Trascina i versi nell’ordine giusto</div>
      <div className={`verse-list ${correct ? 'ok' : ''}`} ref={listRef}>
        {order.map((idx, pos) => (
          <div
            key={idx}
            className={`verse-card ${dragIdx === idx ? 'dragging' : ''}`}
            onPointerDown={(e) => startDrag(pos, e)}
            onPointerMove={onDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <span className="verse-grip">⠿</span>
            <span className="verse-text">{VERSES[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
