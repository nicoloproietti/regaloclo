import { useState } from 'react'
import { useGameState } from '../hooks/useGameState.js'
import { CONFIG } from '../config.js'
import './admin.css'

const STEP_BUTTONS = [
  { step: 'step1_5', label: 'Sblocca Step 1.5 (cruciverba)' },
  { step: 'step2', label: 'Sblocca Step 2 (mappa)' },
  { step: 'step3', label: 'Sblocca Step 3 (indovinello)' },
  { step: 'step4', label: 'Sblocca Step 4 (finale)' },
]

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)
  const { state, loading, setStep } = useGameState()

  if (!authed) {
    return (
      <div className="admin-screen">
        <div className="admin-login">
          <div className="admin-title">ADMIN</div>
          <input
            type="password"
            className="riddle-input"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="password"
          />
          <button
            className="pixel-btn"
            style={{ marginTop: 12 }}
            onClick={() => {
              if (pwd === CONFIG.adminPassword) {
                setAuthed(true)
              } else {
                setError(true)
              }
            }}
          >
            ENTRA
          </button>
          {error && <div className="admin-error">password errata</div>}
        </div>
      </div>
    )
  }

  if (loading) return <div className="admin-screen">caricamento...</div>

  return (
    <div className="admin-screen">
      <div className="admin-title">PANNELLO DI CONTROLLO</div>

      <div className="admin-status">
        <div>Step corrente: {state.current_step}</div>
        <div style={{ marginTop: 8 }}>
          Lettere: {JSON.stringify(state.letters_unlocked)}
        </div>
      </div>

      <div className="admin-buttons">
        {STEP_BUTTONS.map((b) => (
          <button key={b.step} className="pixel-btn admin-btn" onClick={() => setStep(b.step)}>
            {b.label}
          </button>
        ))}
      </div>

      <button
        className="pixel-btn admin-reset"
        onClick={() => {
          if (confirm('Reset completo dello stato del gioco?')) {
            setStep('intro')
          }
        }}
      >
        RESET (solo test)
      </button>
    </div>
  )
}
