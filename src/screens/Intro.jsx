import DialogueBox from '../components/DialogueBox.jsx'

const LINES = [
  { speaker: 'nico', text: 'Ciao Claudia.' },
  { speaker: 'nico', text: 'Buon compleanno. 🎂' },
  { speaker: 'nico', text: 'Questo è il mio regalo per te.', claudiaVisible: true, reaction: '?' },
  { speaker: 'nico', text: 'Lo so, non è il solito regalo impacchettato.' },
  { speaker: 'nico', text: 'TI DISPIACE SE✨ prima di scoprirlo\ngiochi un po’ con me?', claudiaVisible: true },
  { speaker: 'nico', text: 'Stasera ti ho preparato\nun piccolo viaggio, fatto di giochi.' },
  { speaker: 'nico', text: 'Ogni gioco che superi\nci porta un passo più vicini.', claudiaVisible: true, reaction: '❤' },
  { speaker: 'nico', text: 'Ma l’ultima sorpresa\nnon è dentro allo schermo...' },
  { speaker: 'nico', text: 'è là fuori, stasera, con me. 🌙' },
  { speaker: 'nico', text: 'Pronta?' },
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
