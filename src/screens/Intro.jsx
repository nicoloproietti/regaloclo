import DialogueBox from '../components/DialogueBox.jsx'

const LINES = [
  { speaker: 'nico', text: 'Ciao Claudia.' },
  { speaker: 'nico', text: 'Buon compleanno. 🎂' },
  { speaker: 'nico', text: 'Questo è il tuo regalo di compleanno.', claudiaVisible: true, reaction: '?' },
  { speaker: 'nico', text: 'Lo so, non è quello che ti aspettavi.' },
  { speaker: 'nico', text: 'Ma non volevo farti un regalo scontato.', claudiaVisible: true },
  { speaker: 'nico', text: "Ti va di giocare un po' con me,\nprima di scoprirlo davvero?" },
  { speaker: 'nico', text: 'Non è un gioco qualsiasi, però.' },
  { speaker: 'nico', text: 'Ogni pezzo che sbloccherai stasera\nti aiuterà a completare il gioco.', claudiaVisible: true, reaction: '❤' },
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
