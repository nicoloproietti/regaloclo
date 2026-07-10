import { useState } from 'react'
import DialogueBox from '../components/DialogueBox.jsx'

const LINES = [
  { speaker: 'nico', text: 'Ci siamo quasi.' },
  { speaker: 'nico', text: 'Guarda cosa hai raccolto stasera.' },
  { speaker: 'nico', text: 'Tre lettere. Tre momenti.' },
  { speaker: 'nico', text: 'Scrivile nella sabbia.\nCome vuoi tu, dove vuoi tu.' },
  { speaker: 'nico', text: 'Ma non è finita.' },
  { speaker: 'nico', text: 'Mancano ancora due lettere...' },
  { speaker: 'nico', text: 'e quelle non te le do io da qui.', claudiaVisible: true, reaction: '?' },
  { speaker: 'nico', text: 'Guardati intorno.' },
]

export default function Step4Finale({ onDone }) {
  const [dialogueDone, setDialogueDone] = useState(false)

  if (!dialogueDone) {
    return (
      <div className="screen">
        <DialogueBox lines={LINES} onDone={() => { setDialogueDone(true); onDone && onDone() }} />
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="title-card">
        I · A · M
        <div style={{ fontSize: 8, marginTop: 12, lineHeight: 1.6 }}>
          Il resto, stanotte, sulla sabbia.
        </div>
      </div>
    </div>
  )
}
