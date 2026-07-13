import { useGameState } from '../hooks/useGameState.js'
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
  const { state, loading, setStep, updateState } = useGameState()

  if (loading) return <Waiting text="Caricamento..." />

  const { current_step } = state
  const progress = state.step1_progress || {}

  const setDone = (flag) =>
    updateState({ step1_progress: { ...progress, [flag]: true } })

  switch (current_step) {
    case 'intro':
      return <Intro onStart={() => setStep('step1')} />

    case 'step1':
      return progress.step1_done ? (
        <Waiting text={`In attesa...\n${CONFIG.meetup.date}, ore ${CONFIG.meetup.time}`} />
      ) : (
        <Step1Runner onComplete={() => setDone('step1_done')} />
      )

    case 'step1_5':
      return progress.step1_5_done ? (
        <Waiting text="In attesa del prossimo indizio..." />
      ) : (
        <Step1_5Crossword onComplete={() => setDone('step1_5_done')} />
      )

    case 'step2':
      return progress.step2_done ? (
        <Waiting text="In attesa della prossima tappa..." />
      ) : (
        <Step2TreasureMap onComplete={() => setDone('step2_done')} />
      )

    case 'step3':
      return progress.step3_done ? (
        <Waiting text="In attesa..." />
      ) : (
        <Step3Riddle onSolved={() => setDone('step3_done')} />
      )

    case 'step4':
      return <Step4Finale onDone={() => setStep('completed')} />

    case 'completed':
      return (
        <div className="screen riddle-solved-bg">
          <div className="title-card" style={{ background: 'rgba(255,250,240,0.12)', color: '#fdf4dd', borderColor: 'rgba(255,255,255,0.3)' }}>
            🌙 · 🌊
            <div style={{ fontSize: 13, marginTop: 12, lineHeight: 1.6, fontWeight: 700 }}>
              Il resto, adesso, tra noi.
            </div>
          </div>
        </div>
      )

    default:
      return <Waiting text="..." />
  }
}
