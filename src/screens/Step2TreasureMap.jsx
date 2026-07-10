import { useRef, useState } from 'react'
import { CONFIG } from '../config.js'
import './treasureMap.css'

// Percorso tratteggiato (percentuali dentro il contenitore mappa)
const PATH = [
  { x: 15, y: 88 },
  { x: 30, y: 70 },
  { x: 22, y: 52 },
  { x: 45, y: 40 },
  { x: 40, y: 22 },
  { x: 65, y: 15 },
  { x: 80, y: 10 },
]

const CHECKPOINTS = [
  { atIndex: 2, clue: '...finché non trovi dove il vento si ferma a bere...' },
  { atIndex: 4, clue: '...e da lì, segui il profumo di brace verso il buio del mare.' },
  { atIndex: 6, clue: 'TREASURE' },
]

function closestOnPath(px, py) {
  let best = { x: PATH[0].x, y: PATH[0].y, dist: Infinity, index: 0 }
  for (let i = 0; i < PATH.length; i++) {
    const p = PATH[i]
    const d = Math.hypot(p.x - px, p.y - py)
    if (d < best.dist) best = { x: p.x, y: p.y, dist: d, index: i }
  }
  return best
}

export default function Step2TreasureMap({ onComplete }) {
  const [iconPos, setIconPos] = useState(PATH[0])
  const [reachedCheckpoint, setReachedCheckpoint] = useState(-1) // indice ultimo checkpoint raggiunto
  const [activeClue, setActiveClue] = useState(null)
  const [treasureOpen, setTreasureOpen] = useState(false)
  const [dialogueDone, setDialogueDone] = useState(false)
  const containerRef = useRef(null)
  const draggingRef = useRef(false)

  function toPercent(clientX, clientY) {
    const rect = containerRef.current.getBoundingClientRect()
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    }
  }

  function handleMove(clientX, clientY) {
    const raw = toPercent(clientX, clientY)
    const closest = closestOnPath(raw.x, raw.y)
    const pos = closest.dist > 9
      ? { x: closest.x + (raw.x - closest.x) * 0.25, y: closest.y + (raw.y - closest.y) * 0.25 }
      : raw
    setIconPos(pos)

    const nextCheckpoint = CHECKPOINTS[reachedCheckpoint + 1]
    if (nextCheckpoint && closest.index >= nextCheckpoint.atIndex && closest.dist < 10) {
      const newIndex = reachedCheckpoint + 1
      setReachedCheckpoint(newIndex)
      if (nextCheckpoint.clue === 'TREASURE') {
        setTreasureOpen(true)
      } else {
        setActiveClue(nextCheckpoint.clue)
      }
    }
  }

  function onPointerDown(e) {
    draggingRef.current = true
    handleMove(e.clientX, e.clientY)
  }
  function onPointerMove(e) {
    if (!draggingRef.current) return
    handleMove(e.clientX, e.clientY)
  }
  function onPointerUp() {
    draggingRef.current = false
    const closest = closestOnPath(iconPos.x, iconPos.y)
    if (closest.dist > 9) setIconPos({ x: closest.x, y: closest.y })
  }

  if (treasureOpen && !dialogueDone) {
    return (
      <div className="screen treasure-bg">
        <div className="chest-reveal">
          <div className="chest-emoji">🗝️📜</div>
          <div className="chest-scroll">{CONFIG.restaurantName}</div>
        </div>
        <button
          className="pixel-btn"
          onClick={() => {
            setDialogueDone(true)
            onComplete && onComplete()
          }}
          style={{ marginTop: 20 }}
        >
          CONTINUA
        </button>
      </div>
    )
  }

  if (dialogueDone) {
    return (
      <div className="screen treasure-bg">
        <div className="title-card">In attesa della prossima tappa...</div>
      </div>
    )
  }

  return (
    <div className="screen treasure-screen">
      <div className="treasure-clue">
        {activeClue || 'Segui la costa verso nord...'}
      </div>
      <div
        className="treasure-map"
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <svg className="treasure-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={PATH.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#5b4321"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
        </svg>

        {CHECKPOINTS.slice(0, reachedCheckpoint + 2).map((cp, i) =>
          i <= reachedCheckpoint + 1 ? (
            <div
              key={i}
              className={`treasure-checkpoint ${i <= reachedCheckpoint ? 'reached' : ''}`}
              style={{ left: `${PATH[cp.atIndex].x}%`, top: `${PATH[cp.atIndex].y}%` }}
            >
              {cp.clue === 'TREASURE' ? '🗺️' : '✕'}
            </div>
          ) : null
        )}

        <div
          className="treasure-icon"
          style={{ left: `${iconPos.x}%`, top: `${iconPos.y}%` }}
        >
          🐾
        </div>
      </div>
      <div className="treasure-hint">TRASCINA L'ORMA LUNGO IL SENTIERO</div>
    </div>
  )
}
