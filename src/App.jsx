import { Route, Routes } from 'react-router-dom'
import GameView from './screens/GameView.jsx'
import AdminPanel from './admin/AdminPanel.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GameView />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  )
}
