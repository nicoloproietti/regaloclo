import DialogueBox from '../components/DialogueBox.jsx'

const LINES = [
  { speaker: 'nico', text: 'Ciao Claudia.' },
  { speaker: 'nico', text: 'Buon compleanno. 🎂' },
  { speaker: 'nico', text: 'Questo è il mio regalo per te.', claudiaVisible: true, reaction: '?' },
  { speaker: 'nico', text: 'Lo so, non è il solito regalo impacchettato.' },
  { speaker: 'nico', text: 'TI DISPIACE SE✨ ti metto alla prova?', claudiaVisible: true },
]

export default function Intro({ onStart }) {
  return (
    <div className="screen">
      <DialogueBox
        lines={LINES}
        action={
          <button className="pixel-btn" onClick={onStart}>
            ▶ INIZIA
          </button>
        }
      />
    </div>
  )
}
