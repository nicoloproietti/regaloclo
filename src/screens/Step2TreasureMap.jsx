import { useState } from 'react'
import { CONFIG } from '../config.js'
import './newspaper.css'

// "La Prima Pagina": componi il titolo di prima pagina, poi manda in stampa.
// Il nome del posto (CONFIG.restaurantName) è il reveal, NON va indovinato:
// così puoi cambiarlo in un secondo momento senza toccare il gioco.
const HEADLINE = ['STASERA', 'SI', 'CENA', 'A']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function initialPool() {
  let tiles = HEADLINE.map((w, i) => ({ id: i, w }))
  let s = shuffle(tiles)
  // evita che escano già in ordine
  if (s.map((t) => t.w).join(' ') === HEADLINE.join(' ')) s = shuffle(tiles)
  return s
}

export default function Step2Newspaper({ onComplete }) {
  const [pool] = useState(initialPool)
  const [answer, setAnswer] = useState([]) // array di tile
  const [published, setPublished] = useState(false)

  const usedIds = new Set(answer.map((t) => t.id))
  const correct = answer.map((t) => t.w).join(' ') === HEADLINE.join(' ')
  const filledWrong = answer.length === HEADLINE.length && !correct

  function place(tile) {
    if (usedIds.has(tile.id) || answer.length >= HEADLINE.length) return
    setAnswer((a) => [...a, tile])
  }
  function removeAt(idx) {
    setAnswer((a) => a.filter((_, i) => i !== idx))
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
      <div className="news-paper">
        <div className="news-masthead">{CONFIG.newspaperName}</div>
        <div className="news-rule" />
        <div className="news-date">{CONFIG.newspaperDate}</div>

        <div className="news-task">Componi il titolo di prima pagina</div>

        <div className={`news-slots ${filledWrong ? 'shake' : ''}`}>
          {HEADLINE.map((_, i) => {
            const tile = answer[i]
            return (
              <button
                key={i}
                className={`news-slot ${tile ? 'filled' : ''}`}
                onClick={() => tile && removeAt(i)}
              >
                {tile ? tile.w : ''}
              </button>
            )
          })}
        </div>

        <div className="news-pool">
          {pool.map((tile) => (
            <button
              key={tile.id}
              className={`news-tile ${usedIds.has(tile.id) ? 'used' : ''}`}
              onClick={() => place(tile)}
              disabled={usedIds.has(tile.id)}
            >
              {tile.w}
            </button>
          ))}
        </div>

        {filledWrong && <div className="news-msg">Il titolo non torna... riprova ✍️</div>}

        <button
          className="pixel-btn news-publish"
          disabled={!correct}
          onClick={() => setPublished(true)}
        >
          MANDA IN STAMPA
        </button>
      </div>
    </div>
  )
}
