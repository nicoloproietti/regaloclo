import { useCallback, useEffect, useRef, useState } from 'react'
import { CONFIG } from '../config.js'
import './newspaper.css'

// Step 2 – Conferenza stampa a raffica (tema giornalismo).
// I cartoncini-domanda scorrono: tocca solo le domande GIUSTE sull'evento
// di stasera (dove si cena) ed evita quelle fuori tema. 5 buone => scoop.
const TARGET = 5

const GOOD = [
  'C\'è un evento speciale stasera?',
  'Uscite a cena stasera?',
  'È una cena fuori a sorpresa?',
  'In quale ristorante andrete?',
  'Il tavolo è già prenotato?',
  'A che ora è la prenotazione?',
  'La cena è vista mare?',
  'Cosa festeggiate stasera?',
]
const BAD = [
  'Che scarpe indossa?',
  'Di che segno è?',
  'Cane o gatto?',
  'Ultima serie vista?',
  'Colore preferito?',
  'Che tempo farà a Natale?',
  'Sa fare la carbonara?',
  'Che musica ascolta?',
]

const LANES = [12, 30, 48, 66]

export default function Step2Newspaper({ onComplete }) {
  const [cards, setCards] = useState([])
  const [collected, setCollected] = useState(0)
  const [flash, setFlash] = useState(null) // {kind:'ok'|'no'}
  const [published, setPublished] = useState(false)

  const idRef = useRef(0)
  const rafRef = useRef(null)
  const spawnRef = useRef(null)
  const laneRef = useRef(0)

  const done = collected >= TARGET

  const spawn = useCallback(() => {
    idRef.current += 1
    const good = Math.random() < 0.55
    const pool = good ? GOOD : BAD
    const text = pool[Math.floor(Math.random() * pool.length)]
    const lane = LANES[laneRef.current % LANES.length]
    laneRef.current += 1
    const rot = (Math.random() * 6 - 3).toFixed(1)
    setCards((c) => [
      ...c,
      { id: idRef.current, text, good, x: 104, y: lane, speed: 1.5 + Math.random() * 0.7, rot },
    ])
  }, [])

  useEffect(() => {
    if (published || done) return
    spawnRef.current = setInterval(spawn, 950)
    return () => clearInterval(spawnRef.current)
  }, [published, done, spawn])

  useEffect(() => {
    if (published || done) return
    let last = performance.now()
    function tick(now) {
      const dt = (now - last) / 1000
      last = now
      setCards((prev) =>
        prev
          .map((k) => ({ ...k, x: k.x - k.speed * dt * 10 }))
          .filter((k) => k.x > -40)
      )
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [published, done])

  useEffect(() => {
    if (done && !published) {
      const t = setTimeout(() => setPublished(true), 600)
      return () => clearTimeout(t)
    }
  }, [done, published])

  useEffect(() => () => {
    clearInterval(spawnRef.current)
    cancelAnimationFrame(rafRef.current)
  }, [])

  function tapCard(card) {
    setCards((c) => c.filter((k) => k.id !== card.id))
    if (card.good) {
      setCollected((n) => Math.min(TARGET, n + 1))
      setFlash({ kind: 'ok' })
    } else {
      setCollected((n) => Math.max(0, n - 1))
      setFlash({ kind: 'no' })
    }
    setTimeout(() => setFlash(null), 500)
  }

  if (published) {
    return (
      <div className="news-screen">
        <div className="news-paper news-paper-final">
          <div className="news-masthead">{CONFIG.newspaperName}</div>
          <div className="news-rule" />
          <div className="news-date">{CONFIG.newspaperDate}</div>
          <div className="news-kicker">ULTIM'ORA</div>
          <div className="news-headline-final">STASERA SI CENA A</div>
          <div className="news-place">{CONFIG.restaurantName}</div>
          <div className="news-standfirst">
            Prenotazione confermata per due · al calar del sole
          </div>
          <button className="pixel-btn" style={{ marginTop: 18 }} onClick={onComplete}>
            CONTINUA
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="news-screen">
      <div className="news-paper pc-paper">
        <div className="news-masthead">CONFERENZA STAMPA</div>
        <div className="news-rule" />
        <div className="pc-instruction">
          Fai le domande giuste e scopri lo scoop: stasera si va a cena fuori!
        </div>

        <div className={`pc-stage ${flash ? `flash-${flash.kind}` : ''}`}>
          {cards.map((k) => (
            <button
              key={k.id}
              className="pc-card"
              style={{ left: `${k.x}%`, top: `${k.y}%`, transform: `rotate(${k.rot}deg)` }}
              onClick={() => tapCard(k)}
            >
              <span className="pc-mic">🎤</span>
              {k.text}
            </button>
          ))}
          {flash && (
            <div className={`pc-flash pc-flash-${flash.kind}`}>
              {flash.kind === 'ok' ? 'Buona domanda!' : 'Fuori tema!'}
            </div>
          )}
        </div>

        <div className="pc-progress">
          <span>SCOOP</span>
          <div className="pc-bar">
            <div className="pc-bar-fill" style={{ width: `${(collected / TARGET) * 100}%` }} />
          </div>
          <span>{collected}/{TARGET}</span>
        </div>
      </div>
    </div>
  )
}
