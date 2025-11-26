import React from 'react'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: 'url(/images/backgorund.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      <Dashboard />
    </div>
  )
}

export default App

