import React from 'react'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="h-screen overflow-hidden overflow-x-hidden md:overflow-hidden relative" style={{ 
      background: `
        linear-gradient(135deg, 
          rgba(135, 206, 235, 0.15) 0%, 
          rgba(176, 224, 230, 0.12) 20%,
          rgba(255, 228, 181, 0.1) 50%,
          rgba(255, 182, 193, 0.12) 80%,
          rgba(221, 160, 221, 0.1) 100%
        ),
        url(/images/backgorund.png)
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      <div className="relative z-10">
        <Dashboard />
      </div>
    </div>
  )
}

export default App

