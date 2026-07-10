import { motion } from 'framer-motion'
import { Heart, Question } from './Icon.jsx'
import './sprite.css'

function Reaction({ kind }) {
  if (kind === '❤' || kind === 'heart') return <Heart size={26} />
  if (kind === '?' || kind === 'question') return <Question size={26} />
  return <span>{kind}</span>
}

// Personaggio cartoon in stile Animal Crossing: testa tonda, occhioni,
// guance rosate e outline morbido.
export default function Sprite({ who, reaction, size = 88 }) {
  const isNico = who === 'nico'
  return (
    <div className="sprite-wrap" style={{ width: size, height: size * 1.15 }}>
      {reaction && (
        <div className="sprite-reaction">
          <Reaction kind={reaction} />
        </div>
      )}
      <motion.div
        className={`sprite ${isNico ? 'sprite-nico' : 'sprite-claudia'}`}
        animate={{ y: [0, -6, 0], rotate: [0, isNico ? -2 : 2, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="sprite-hair" />
        <div className="sprite-head">
          <div className="sprite-eye sprite-eye-l" />
          <div className="sprite-eye sprite-eye-r" />
          <div className="sprite-cheek sprite-cheek-l" />
          <div className="sprite-cheek sprite-cheek-r" />
          <div className="sprite-smile" />
        </div>
        <div className="sprite-body">
          <div className="sprite-arm sprite-arm-l" />
          <div className="sprite-arm sprite-arm-r" />
        </div>
      </motion.div>
    </div>
  )
}
