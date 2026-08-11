import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DarkMode() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      root.style.setProperty('--color-surface', '#0f0f14')
      root.style.setProperty('--color-surface-2', '#16161e')
      root.style.setProperty('--color-surface-3', '#1e1e2a')
      root.style.setProperty('--color-border', '#2a2a3a')
      root.style.setProperty('--color-muted', '#6b7280')
      root.style.setProperty('--color-text', '#e5e7eb')
      root.style.setProperty('--color-text-secondary', '#9ca3af')
      root.style.setProperty('--color-accent', '#a855f7')
      root.style.setProperty('--color-accent-light', '#c084fc')
      document.body.style.background = '#0f0f14'
      document.body.style.color = '#e5e7eb'
    } else {
      root.classList.remove('dark')
      root.style.setProperty('--color-surface', '#ffffff')
      root.style.setProperty('--color-surface-2', '#f9fafb')
      root.style.setProperty('--color-surface-3', '#f3f4f6')
      root.style.setProperty('--color-border', '#e5e7eb')
      root.style.setProperty('--color-muted', '#6b7280')
      root.style.setProperty('--color-text', '#111827')
      root.style.setProperty('--color-text-secondary', '#4b5563')
      root.style.setProperty('--color-accent', '#111827')
      root.style.setProperty('--color-accent-light', '#374151')
      document.body.style.background = '#ffffff'
      document.body.style.color = '#111827'
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center hover:shadow-md transition-all"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{ pointerEvents: 'auto' }}
    >
      <AnimatePresence mode="wait">
        {dark ? (
          <motion.svg
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            className="text-amber-500"
          >
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            className="text-text"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )
}
