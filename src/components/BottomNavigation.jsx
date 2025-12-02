import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const BottomNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const pages = [
    { path: '/gita', label: 'Gita' },
    { path: '/english', label: 'English' },
    { path: '/maths', label: 'Maths' }
  ]

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex gap-2 bg-white/90 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-gray-200">
        {pages.map((page) => (
          <button
            key={page.path}
            onClick={() => navigate(page.path)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              location.pathname === page.path
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {page.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation

