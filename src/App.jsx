import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import GitaPage from './pages/Gita/GitaPage'

function App() {
  return (
    <Router>
      <div className="h-screen overflow-hidden overflow-x-hidden md:overflow-hidden relative">
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Navigate to="/gita" replace />} />
            <Route path="/gita" element={<GitaPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

