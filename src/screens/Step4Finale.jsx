import DialogueBox from '../components/DialogueBox.jsx'

const LINES = [
  { speaker: 'nico', text: 'Ci siamo.' },
  { speaker: 'nico', text: 'La serata è stata solo l’inizio.' },
  { speaker: 'nico', text: 'L’ultima sorpresa non è qui dentro...' },
  { speaker: 'nico', text: 'è là fuori, dove la notte incontra il mare.', claudiaVisible: true, reaction: '?' },
  { speaker: 'nico', text: 'Alza gli occhi dallo schermo...' },
  { speaker: 'nico', text: 'e guardati intorno. 🌙' },
]

export default function Step4Finale({ onDone }) {
  return (
    <div className="screen riddle-solved-bg">
      <DialogueBox lines={LINES} onDone={() => onDone && onDone()} />
    </div>
  )
}
