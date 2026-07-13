import { useState } from 'react'
import { useGameState } from '../hooks/useGameState.js'
import { CONFIG } from '../config.js'
import './admin.css'

// Ogni step con i progressi pronti, così è giocabile subito.
const FLOW = [
  { key: 'intro', label: 'Intro', progress: {} },
  { key: 'step1', label: 'Step 1 · Corsa', progress: {} },
  { key: 'step1_5', label: 'Step 1.5 · Slot SINGITA', progress: { step1_done: true } },
  {
    key: 'step2',
    label: 'Step 2 · Conferenza stampa',
    progress: { step1_done: true, step1_5_done: true },
  },
  {
    key: 'step3',
    label: 'Step 3 · Filastrocca',
    progress: { step1_done: true, step1_5_done: true, step2_done: true },
  },
  {
    key: 'step4',
    label: 'Step 4 · Al mare',
    progress: { step1_done: true, step1_5_done: true, step2_done: true, step3_done: true },
  },
  {
    key: 'completed',
    label: 'Finale',
    progress: { step1_done: true, step1_5_done: true, step2_done: true, step3_done: true },
  },
]

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)
  const { state, loading, updateState } = useGameState()

  function goTo(item) {
    updateState({ current_step: item.key, step1_progress: item.progress })
  }

  function reset() {
    updateState({ current_step: 'intro', step1_progress: {} })
  }

  if (!authed) {
    const tryLogin = () => (pwd === CONFIG.adminPassword ? setAuthed(true) : setError(true))
    return (
      <div className="admin-screen">
        <div className="admin-login">
          <div className="admin-title">🎛️ ADMIN</div>
          <input
            type="password"
            className="admin-input"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="password"
            onKeyDown={(e) => e.key === 'Enter' && tryLogin()}
          />
          <button className="pixel-btn" style={{ marginTop: 12 }} onClick={tryLogin}>
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
      <div className="admin-title">🎛️ PLANCIA DI CONTROLLO</div>

      <div className="admin-card">
        <div className="admin-row">
          <span className="admin-k">Step attuale</span>
          <span className="admin-badge">{state.current_step}</span>
        </div>
      </div>

      <div className="admin-section-title">Vai allo step</div>
      <div className="admin-grid">
        {FLOW.map((item) => (
          <button
            key={item.key}
            className={`admin-step-btn ${state.current_step === item.key ? 'current' : ''}`}
            onClick={() => goTo(item)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <button className="pixel-btn admin-reset" onClick={reset}>
        ↺ RESET TOTALE (riparti da capo)
      </button>

      <div className="admin-hint">
        Ogni step si apre già giocabile (lettere e progressi impostati). Il gioco di
        Claudia si aggiorna in tempo reale.
      </div>
    </div>
  )
}
