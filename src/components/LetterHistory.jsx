import { useState } from 'react'
import './letterHistory.css'

// Posizioni sparse fisse (non in ordine "TI AMO") dentro il pannello.
const LAYOUT = {
  I: { top: '18%', left: '62%', caption: 'raccolta a mezzanotte' },
  A: { top: '55%', left: '20%', caption: 'raccolta al tramonto' },
  M: { top: '30%', left: '38%', caption: 'raccolta a cena' },
}

export default function LetterHistory({ letters }) {
  const [open, setOpen] = useState(false)
  const entries = Object.keys(LAYOUT)

  return (
    <>
      <button className="letter-history-toggle" onClick={() => setOpen(true)} aria-label="Storico lettere">
        ✉
      </button>

      {open && (
        <div className="letter-history-overlay" onClick={() => setOpen(false)}>
          <div className="letter-history-panel" onClick={(e) => e.stopPropagation()}>
            <div className="letter-history-title">STORICO</div>
            <div className="letter-history-grid">
              {entries.map((key) => {
                const status = letters?.[key] || 'hidden'
                const pos = LAYOUT[key]
                return (
                  <div
                    key={key}
                    className={`letter-slot letter-${status}`}
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div className="letter-glyph">
                      {status === 'full' ? key : status === 'teaser' ? '▓' : '?'}
                    </div>
                    {status === 'full' && (
                      <div className="letter-caption">{pos.caption}</div>
                    )}
                  </div>
                )
              })}
            </div>
            <button className="pixel-btn letter-history-close" onClick={() => setOpen(false)}>
              CHIUDI
            </button>
          </div>
        </div>
      )}
    </>
  )
}
