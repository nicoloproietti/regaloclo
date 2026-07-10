import { useCallback, useEffect, useRef, useState } from 'react'
import DialogueBox from '../components/DialogueBox.jsx'
import {
  OBSTACLE_ICONS,
  RunnerChar,
  DiscoBall,
  BigBen,
  River,
  BridgeVertical,
  Trattoria,
} from '../components/Icon.jsx'
import './step1Runner.css'

const CHAPTERS = [
  {
    key: 'pranzo',
    title: 'PRANZO DI MAGGETTO',
    bg: 'linear-gradient(180deg, #ffd97a, #ff9f43)',
    obstacles: ['fork', 'plate', 'pasta', 'wine'],
    count: 5,
    speed: 1.7,
  },
  {
    key: 'nurbar',
    title: 'NUR BAR',
    bg: 'linear-gradient(180deg, #c77dff, #7b5cff)',
    obstacles: ['cocktail', 'speaker', 'bulb'],
    count: 6,
    speed: 1.9,
  },
  {
    key: 'pontemilvio',
    title: 'PONTE MILVIO',
    bg: 'linear-gradient(180deg, #ffb26b, #ff6f5e)',
    obstacles: ['lock', 'bike', 'bench'],
    count: 6,
    speed: 2.1,
  },
  {
    key: 'londra',
    title: 'LONDRA',
    bg: 'linear-gradient(180deg, #6ec6ff, #2f8fe0)',
    obstacles: ['suitcase', 'umbrella', 'phone'],
    count: 7,
    speed: 2.3,
  },
]

function Scenery({ chapterKey }) {
  if (chapterKey === 'nurbar')
    return (
      <div className="scenery scenery-disco">
        <DiscoBall size={116} />
      </div>
    )
  if (chapterKey === 'londra')
    return (
      <div className="scenery scenery-bigben">
        <BigBen size={116} />
      </div>
    )
  if (chapterKey === 'pontemilvio')
    return (
      <>
        <div className="scenery scenery-river">
          <River />
        </div>
        <div className="scenery scenery-ponte-v">
          <BridgeVertical size={130} />
        </div>
      </>
    )
  if (chapterKey === 'pranzo')
    return (
      <div className="scenery scenery-trattoria">
        <Trattoria size={140} />
      </div>
    )
  return null
}

export default function Step1Runner({ onComplete, onWin }) {
  const [started, setStarted] = useState(false)
  const [chapterIdx, setChapterIdx] = useState(0)
  const [showTitle, setShowTitle] = useState(true)
  const [obstacles, setObstacles] = useState([])
  const [jumping, setJumping] = useState(false)
  const [push, setPush] = useState(false)
  const [finished, setFinished] = useState(false)
  const [cleared, setCleared] = useState(0)
  const wonRef = useRef(false)

  const spawnedRef = useRef(0)
  const jumpTimerRef = useRef(null)
  const jumpingRef = useRef(false)
  const rafRef = useRef(null)
  const spawnTimerRef = useRef(null)
  const lastBumpRef = useRef(null)
  const pushTimerRef = useRef(null)

  const chapter = CHAPTERS[chapterIdx]

  // pulizia timer allo smontaggio
  useEffect(() => () => {
    clearTimeout(jumpTimerRef.current)
    clearTimeout(pushTimerRef.current)
    clearInterval(spawnTimerRef.current)
    cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    if (!started) return
    setShowTitle(true)
    setObstacles([])
    setCleared(0)
    spawnedRef.current = 0
    const t = setTimeout(() => setShowTitle(false), 1200)
    return () => clearTimeout(t)
  }, [chapterIdx, started])

  const spawnObstacle = useCallback(() => {
    if (spawnedRef.current >= chapter.count) return
    spawnedRef.current += 1
    const kind = chapter.obstacles[Math.floor(Math.random() * chapter.obstacles.length)]
    setObstacles((prev) => [...prev, { id: `${chapter.key}-${spawnedRef.current}`, x: 100, kind }])
  }, [chapter])

  useEffect(() => {
    if (!started || showTitle || finished) return
    spawnTimerRef.current = setInterval(spawnObstacle, 1900)
    return () => clearInterval(spawnTimerRef.current)
  }, [started, showTitle, finished, spawnObstacle])

  useEffect(() => {
    if (!started || showTitle || finished) return
    let last = performance.now()

    function tick(now) {
      const dt = (now - last) / 1000
      last = now
      setObstacles((prev) => {
        const next = prev
          .map((o) => ({ ...o, x: o.x - chapter.speed * dt * 14 }))
          .filter((o) => o.x > -10)
        const passed = prev.length - next.length
        if (passed > 0) {
          setCleared((c) => {
            const total = c + passed
            if (total >= chapter.count && spawnedRef.current >= chapter.count) {
              if (chapterIdx < CHAPTERS.length - 1) {
                setChapterIdx((i) => i + 1)
              } else {
                setFinished(true)
              }
            }
            return total
          })
        }
        return next
      })
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [started, showTitle, finished, chapter, chapterIdx])

  // alla fine della corsa: sblocca subito la lettera (parte l'animazione),
  // poi mostra il messaggio di fine livello
  useEffect(() => {
    if (finished && !wonRef.current) {
      wonRef.current = true
      onWin && onWin()
    }
  }, [finished, onWin])

  function doJump() {
    if (finished || !started || showTitle) return
    if (jumpingRef.current) return
    jumpingRef.current = true
    setPush(false)
    clearTimeout(pushTimerRef.current)
    setJumping(true)
    clearTimeout(jumpTimerRef.current)
    jumpTimerRef.current = setTimeout(() => {
      jumpingRef.current = false
      setJumping(false)
    }, 740)
  }

  // collisione: se non salta e tocca un ostacolo, viene spinta indietro.
  // Il reset di `push` usa una ref dedicata: NON va nel cleanup dell'effetto,
  // altrimenti verrebbe annullato a ogni frame (obstacles cambia in continuazione).
  useEffect(() => {
    if (jumping || jumpingRef.current) return
    const near = obstacles.find((o) => o.x < 22 && o.x > 12)
    if (near && lastBumpRef.current !== near.id) {
      lastBumpRef.current = near.id
      setPush(true)
      clearTimeout(pushTimerRef.current)
      pushTimerRef.current = setTimeout(() => setPush(false), 460)
    }
  }, [obstacles, jumping])

  // --- Dialogo iniziale (dopo INIZIA) ---
  if (!started) {
    return (
      <div className="screen" style={{ background: CHAPTERS[0].bg }}>
        <DialogueBox
          lines={[
            { speaker: 'nico', text: 'Ora ripercorriamo il nostro percorso insieme.' },
            { speaker: 'nico', text: "C'è qualche ostacolo, salta per evitarlo!" },
          ]}
          action={
            <button className="pixel-btn" onClick={() => setStarted(true)}>
              VIA!
            </button>
          }
        />
      </div>
    )
  }

  // --- Messaggio di fine livello (la lettera è già stata sbloccata da onWin) ---
  if (finished) {
    return (
      <div className="screen" style={{ background: CHAPTERS[CHAPTERS.length - 1].bg }}>
        <DialogueBox
          lines={[
            { speaker: 'nico', text: 'Complimenti! Hai completato questo livello. 🎉' },
            { speaker: 'nico', text: 'Ci vediamo il 18 alle 18 sotto casa tua, per giocare ancora!' },
          ]}
          action={
            <button className="pixel-btn" onClick={onComplete}>
              OK
            </button>
          }
        />
      </div>
    )
  }

  return (
    <div className="runner-screen" style={{ background: chapter.bg }}>
      <div className="runner-stage">
        <div className="runner-location">{chapter.title}</div>
        {showTitle && <div className="runner-title-card">{chapter.title}</div>}

        <div className="runner-track">
          <Scenery chapterKey={chapter.key} />

          {obstacles.map((o) => {
            const Obstacle = OBSTACLE_ICONS[o.kind]
            return (
              <div key={o.id} className="runner-obstacle" style={{ left: `${o.x}%` }}>
                <Obstacle size={58} />
              </div>
            )
          })}

          <div className={`runner-player ${jumping ? 'jump' : push ? 'push' : ''}`}>
            <RunnerChar size={70} />
          </div>
          <div className="runner-ground" />
        </div>
      </div>

      <div className="runner-controls">
        <button className="runner-jump-btn" onClick={doJump}>
          SALTA
        </button>
      </div>
    </div>
  )
}
