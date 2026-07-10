import { useState } from 'react'
import { Envelope, Leaf } from './Icon.jsx'
import './letterHistory.css'

// Posizioni sparse fisse (non in ordine "TI AMO") dentro il pannello.
const LAYOUT = {
  I: { top: '22%', left: '68%', caption: 'raccolta a mezzanotte' },
  A: { top: '66%', left: '30%', caption: 'raccolta durante il viaggio' },
  M: { top: '40%', left: '48%', caption: 'raccolta a cena' },
}

export default function LetterHistory({ letters }) {
  const [open, setOpen] = useState(false)
  const entries = Object.keys(LAYOUT)

  return (
    <>
      <button className="letter-history-toggle" onClick={() => setOpen(true)} aria-label="Storico lettere">
        <Envelope size={26} />
      </button>

      {open && (
        <div className="letter-history-overlay" onClick={() => setOpen(false)}>
          <div className="letter-history-panel" onClick={(e) => e.stopPropagation()}>
            <div className="letter-history-title">
              <Leaf size={20} />
              <span>Il tuo taccuino</span>
            </div>
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
                      {status === 'full' ? key : ''}
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
