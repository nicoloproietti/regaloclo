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
  const [dragY, setDragY] = useState(0) // spostamento verticale della card trascinata

  const listRef = useRef(null)
  const dragPosRef = useRef(null)
  const startYRef = useRef(0)
  const strideRef = useRef(80)

  const correct = order.every((v, i) => v === i)

  function startDrag(pos, e) {
    dragPosRef.current = pos
    startYRef.current = e.clientY
    setDragIdx(order[pos])
    setDragY(0)
    const kids = listRef.current?.children
    if (kids && kids.length > 1) {
      const stride =
        kids[1].getBoundingClientRect().top - kids[0].getBoundingClientRect().top
      if (stride > 0) strideRef.current = stride
    } else if (kids && kids.length === 1) {
      strideRef.current = kids[0].getBoundingClientRect().height + 12
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch (_) {}
  }

  function onDrag(e) {
    if (dragPosRef.current === null) return
    let delta = e.clientY - startYRef.current
    const moved = Math.round(delta / strideRef.current)
    let target = dragPosRef.current + moved
    target = Math.max(0, Math.min(order.length - 1, target))
    if (target !== dragPosRef.current) {
      setOrder((prev) => arrayMove(prev, dragPosRef.current, target))
      startYRef.current += (target - dragPosRef.current) * strideRef.current
      dragPosRef.current = target
      delta = e.clientY - startYRef.current
    }
    setDragY(delta)
  }

  function endDrag() {
    if (dragPosRef.current === null) return
    dragPosRef.current = null
    setDragIdx(null)
    setDragY(0)
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
        {order.map((idx, pos) => {
          const isDrag = dragIdx === idx
          return (
            <div
              key={idx}
              className={`verse-card ${isDrag ? 'dragging' : ''}`}
              style={
                isDrag
                  ? { transform: `translateY(${dragY}px) scale(1.03)`, transition: 'none' }
                  : undefined
              }
              onPointerDown={(e) => startDrag(pos, e)}
              onPointerMove={onDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <span className="verse-grip">⠿</span>
              <span className="verse-text">{VERSES[idx]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
