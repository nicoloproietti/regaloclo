import { useGameState } from '../hooks/useGameState.js'
import LetterHistory from '../components/LetterHistory.jsx'
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

  if (loading) return <Waiting text="Caricamento..." />

  const { current_step, letters_unlocked, step1_progress } = state
  const showLetterIcon = current_step !== 'intro'

  let content = null

  switch (current_step) {
    case 'intro':
      content = <Intro onStart={() => setStep('step1')} />
      break

    case 'step1':
      content = step1_progress?.step1_done ? (
        <Waiting text={`In attesa...\n${CONFIG.meetup.date}, ore ${CONFIG.meetup.time}`} />
      ) : (
        <Step1Runner
          onComplete={async () => {
            await setLetter('I', 'full')
            await setProgress({ step1_done: true })
          }}
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
      content = (
        <Step4Finale onDone={() => setStep('completed')} />
      )
      break

    case 'completed':
      content = (
        <div className="screen">
          <div className="title-card">
            I · A · M
            <div style={{ fontSize: 8, marginTop: 12, lineHeight: 1.6 }}>
              Il resto, stanotte, sulla sabbia.
            </div>
          </div>
        </div>
      )
      break

    default:
      content = <Waiting text="..." />
  }

  return (
    <>
      {showLetterIcon && <LetterHistory letters={letters_unlocked} />}
      {content}
    </>
  )
}
