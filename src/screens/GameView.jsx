import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameState } from '../hooks/useGameState.js'
import LetterHistory from '../components/LetterHistory.jsx'
import LetterUnlockOverlay from '../components/LetterUnlockOverlay.jsx'
import Intro from './Intro.jsx'
import Step1Runner from './Step1Runner.jsx'
import Step1_5Crossword from './Step1_5Crossword.jsx'
import Step2TreasureMap from './Step2TreasureMap.jsx'
import Step3Riddle from './Step3Riddle.jsx'
import Step4Finale from './Step4Finale.jsx'
import { CONFIG } from '../config.js'

function Waiting({ text }) {
  return (
    <div className="screen">
      <div className="title-card">{text}</div>
    </div>
  )
}

export default function GameView() {
  const { state, loading, setStep, setLetter, setProgress } = useGameState()
  const [activeUnlock, setActiveUnlock] = useState(null)
  const prevLettersRef = useRef(null)

  const letters = state.letters_unlocked || {}

  // Rileva quando una lettera viene sbloccata/aggiornata → mostra animazione.
  useEffect(() => {
    if (loading) return
    const prev = prevLettersRef.current
    // primo giro dopo il caricamento: memorizza senza animare
    if (prev === null) {
      prevLettersRef.current = { ...letters }
      return
    }
    for (const key of Object.keys(letters)) {
      const status = letters[key]
      if ((status === 'full' || status === 'teaser') && prev[key] !== status) {
        setActiveUnlock({ letter: key, status })
        break
      }
    }
    prevLettersRef.current = { ...letters }
  }, [loading, JSON.stringify(letters)])

  let content = null

  if (loading) {
    content = <Waiting text="Caricamento..." />
  } else {
    const { current_step, step1_progress } = state
    switch (current_step) {
      case 'intro':
        content = <Intro onStart={() => setStep('step1')} />
        break

      case 'step1':
        content = step1_progress?.step1_done ? (
          <Waiting text={`In attesa...\n${CONFIG.meetup.date}, ore ${CONFIG.meetup.time}`} />
        ) : (
          <Step1Runner
            onWin={() => setLetter('I', 'full')}
            onComplete={() => setProgress({ step1_done: true })}
          />
        )
        break

      case 'step1_5':
        content = step1_progress?.step1_5_done ? (
          <Waiting text="In attesa del prossimo indizio..." />
        ) : (
          <Step1_5Crossword
            onComplete={async () => {
              await setLetter('A', 'teaser')
              await setProgress({ step1_5_done: true })
            }}
          />
        )
        break

      case 'step2':
        content = step1_progress?.step2_done ? (
          <Waiting text="In attesa della prossima tappa..." />
        ) : (
          <Step2TreasureMap
            onComplete={async () => {
              await setLetter('A', 'full')
              await setProgress({ step2_done: true })
            }}
          />
        )
        break

      case 'step3':
        content = step1_progress?.step3_done ? (
          <Waiting text="In attesa..." />
        ) : (
          <Step3Riddle
            onSolved={async () => {
              await setLetter('M', 'full')
              await setProgress({ step3_done: true })
            }}
          />
        )
        break

      case 'step4':
        content = <Step4Finale onDone={() => setStep('completed')} />
        break

      case 'completed':
        content = (
          <div className="screen">
            <div className="title-card">
              I · A · M
              <div style={{ fontSize: 12, marginTop: 12, lineHeight: 1.6, fontWeight: 700 }}>
                Il resto, stanotte, sulla sabbia.
              </div>
            </div>
          </div>
        )
        break

      default:
        content = <Waiting text="..." />
    }
  }

  const showLetterIcon = !loading && state.current_step !== 'intro'

  return (
    <>
      {showLetterIcon && <LetterHistory letters={letters} />}
      {content}
      <AnimatePresence>
        {activeUnlock && (
          <LetterUnlockOverlay
            unlock={activeUnlock}
            onDone={() => setActiveUnlock(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
