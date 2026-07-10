import { motion } from 'framer-motion'
import './sprite.css'

// Placeholder pixel sprite: blocco colorato con "idle bob".
// Verrà sostituito con vera pixel art in una fase successiva.
export default function Sprite({ who, reaction, size = 72 }) {
  const isNico = who === 'nico'
  return (
    <div className="sprite-wrap" style={{ width: size, height: size }}>
      {reaction && <div className="sprite-reaction">{reaction}</div>}
      <motion.div
        className={`sprite ${isNico ? 'sprite-nico' : 'sprite-claudia'}`}
        style={{ width: size, height: size }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="sprite-head" />
        <div className="sprite-body" />
      </motion.div>
    </div>
  )
}
