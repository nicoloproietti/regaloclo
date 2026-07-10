import { motion } from 'framer-motion'
import { Star, Leaf } from './Icon.jsx'
import './letterUnlock.css'

// Animazione stile "item get" di Animal Crossing.
// unlock = { letter: 'I', status: 'full' | 'teaser' }
const CAPTIONS = {
  I: 'raccolta a mezzanotte',
  A: 'raccolta durante il viaggio',
  M: 'raccolta a cena',
}

const SPARKLES = [
  { top: '4%', left: '50%', d: 0, s: 26 },
  { top: '20%', left: '86%', d: 0.1, s: 20 },
  { top: '62%', left: '92%', d: 0.2, s: 16 },
  { top: '90%', left: '70%', d: 0.15, s: 22 },
  { top: '92%', left: '28%', d: 0.25, s: 18 },
  { top: '60%', left: '6%', d: 0.12, s: 20 },
  { top: '18%', left: '12%', d: 0.05, s: 24 },
]

export default function LetterUnlockOverlay({ unlock, onDone }) {
  if (!unlock) return null
  const isFull = unlock.status === 'full'

  return (
    <motion.div
      className="lu-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onDone}
    >
      <motion.div
        className="lu-card"
        initial={{ scale: 0.4, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lu-title">
          <Leaf size={22} />
          <span>{isFull ? 'Nuova lettera!' : 'Un frammento...'}</span>
          <Leaf size={22} />
        </div>

        <div className="lu-medallion-area">
          {SPARKLES.map((sp, i) => (
            <motion.div
              key={i}
              className="lu-sparkle"
              style={{ top: sp.top, left: sp.left }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1, 0.8, 1], rotate: 360 }}
              transition={{ delay: 0.25 + sp.d, duration: 1.6, repeat: Infinity, repeatDelay: 0.4 }}
            >
              <Star size={sp.s} />
            </motion.div>
          ))}

          <motion.div
            className={`lu-medallion ${isFull ? 'lu-full' : 'lu-teaser'}`}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 12 }}
          >
            <motion.span
              className="lu-glyph"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {isFull ? unlock.letter : '?'}
            </motion.span>
          </motion.div>
        </div>

        <div className="lu-caption">
          {isFull ? CAPTIONS[unlock.letter] : 'Per ora resta nell’ombra...'}
        </div>

        <button className="pixel-btn lu-btn" onClick={onDone}>
          EVVIVA!
        </button>
      </motion.div>
    </motion.div>
  )
}
