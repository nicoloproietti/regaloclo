import { useCallback, useEffect, useRef, useState } from 'react'
import { OBSTACLE_ICONS, RunnerChar, MapMark } from '../components/Icon.jsx'
import './step1Runner.css'

const CHAPTERS = [
  {
    key: 'pranzo',
    title: 'PRANZO DI MAGGETTO',
    bg: 'linear-gradient(180deg, #ffd97a, #ff9f43)',
    obstacles: ['fork', 'plate', 'pasta', 'wine'],
    count: 5,
    speed: 2.6,
  },
  {
    key: 'nurbar',
    title: 'NUR BAR',
    bg: 'linear-gradient(180deg, #c77dff, #7b5cff)',
    obstacles: ['cocktail', 'speaker', 'bulb'],
    count: 6,
    speed: 3,
  },
  {
    key: 'pontemilvio',
    title: 'PONTE MILVIO',
    bg: 'linear-gradient(180deg, #ffb26b, #ff6f5e)',
    obstacles: ['lock', 'bike', 'bench'],
    count: 6,
    speed: 3.3,
  },
  {
    key: 'londra',
    title: 'LONDRA',
    bg: 'linear-gradient(180deg, #6ec6ff, #2f8fe0)',
    obstacles: ['suitcase', 'umbrella', 'phone'],
    count: 7,
    speed: 3.6,
  },
]

export default function Step1Runner({ onComplete }) {
  const [chapterIdx, setChapterIdx] = useState(0)
  const [showTitle, setShowTitle] = useState(true)
  const [obstacles, setObstacles] = useState([])
  const [jumping, setJumping] = useState(false)
  const [bump, setBump] = useState(false)
  const [finished, setFinished] = useState(false)
  const [cleared, setCleared] = useState(0)

  const spawnedRef = useRef(0)
  const jumpTimerRef = useRef(null)
  const rafRef = useRef(null)
  const spawnTimerRef = useRef(null)

  const chapter = CHAPTERS[chapterIdx]

  useEffect(() => {
    setShowTitle(true)
    setObstacles([])
    setCleared(0)
    spawnedRef.current = 0
    const t = setTimeout(() => setShowTitle(false), 1000)
    return () => clearTimeout(t)
  }, [chapterIdx])

  const spawnObstacle = useCallback(() => {
    if (spawnedRef.current >= chapter.count) return
    spawnedRef.current += 1
    const kind = chapter.obstacles[Math.floor(Math.random() * chapter.obstacles.length)]
    setObstacles((prev) => [...prev, { id: `${chapter.key}-${spawnedRef.current}`, x: 100, kind }])
  }, [chapter])

  useEffect(() => {
    if (showTitle || finished) return
    spawnTimerRef.current = setInterval(spawnObstacle, 1100)
    return () => clearInterval(spawnTimerRef.current)
  }, [showTitle, finished, spawnObstacle])

  useEffect(() => {
    if (showTitle || finished) return
    let last = performance.now()

    function tick(now) {
      const dt = (now - last) / 1000
      last = now
      setObstacles((prev) => {
        const next = prev
          .map((o) => ({ ...o, x: o.x - chapter.speed * dt * 22 }))
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
  }, [showTitle, finished, chapter, chapterIdx])

  function handleTap() {
    if (finished) return
    if (!jumping) {
      setJumping(true)
      clearTimeout(jumpTimerRef.current)
      jumpTimerRef.current = setTimeout(() => setJumping(false), 520)
    }
  }

  // collisione morbida: piccolo "rimbalzo" visivo, nessuna penalità
  useEffect(() => {
    if (jumping) return
    const near = obstacles.find((o) => o.x < 22 && o.x > 12)
    if (near) {
      setBump(true)
      const t = setTimeout(() => setBump(false), 200)
      return () => clearTimeout(t)
    }
  }, [obstacles, jumping])

  if (finished) {
    return (
      <div className="screen" style={{ background: CHAPTERS[CHAPTERS.length - 1].bg }}>
        <div className="title-card">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <MapMark size={44} />
          </div>
          Sabato 18, ore 18{'\n'}ti aspetto sotto casa tua
          <div style={{ marginTop: 16 }}>
            <button className="pixel-btn" onClick={onComplete}>
              CONTINUA
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="runner-screen" style={{ background: chapter.bg }} onClick={handleTap}>
      {showTitle && <div className="runner-title-card">{chapter.title}</div>}
      <div className="runner-track">
        {obstacles.map((o) => {
          const Obstacle = OBSTACLE_ICONS[o.kind]
          return (
            <div key={o.id} className="runner-obstacle" style={{ left: `${o.x}%` }}>
              <Obstacle size={40} />
            </div>
          )
        })}
        <div className={`runner-player ${jumping ? 'jump' : ''} ${bump ? 'bump' : ''}`}>
          <RunnerChar size={54} />
        </div>
        <div className="runner-ground" />
      </div>
      <div className="runner-hint">TAP PER SALTARE</div>
    </div>
  )
}
