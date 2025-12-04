import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import GitaPage from './pages/Gita/GitaPage'
import EnglishPage from './pages/English/EnglishPage'
import MathsPage from './pages/Maths/MathsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/gita" replace />} />
        <Route path="/gita" element={<GitaPage />} />
        <Route path="/english" element={<EnglishPage />} />
        <Route path="/maths" element={<MathsPage />} />
      </Routes>
    </Router>
  )
}

export default App

