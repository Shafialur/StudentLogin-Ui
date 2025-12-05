import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Lazy load pages for code splitting
const GitaPage = lazy(() => import('./pages/Gita/GitaPage'))
const EnglishPage = lazy(() => import('./pages/English/EnglishPage'))
const MathsPage = lazy(() => import('./pages/Maths/MathsPage'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/gita" replace />} />
          <Route path="/gita" element={<GitaPage />} />
          <Route path="/english" element={<EnglishPage />} />
          <Route path="/maths" element={<MathsPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App

