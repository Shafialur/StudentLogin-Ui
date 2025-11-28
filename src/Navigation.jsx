import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/gita', label: 'Gita' }
  ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/20">
      <div className="flex gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation

