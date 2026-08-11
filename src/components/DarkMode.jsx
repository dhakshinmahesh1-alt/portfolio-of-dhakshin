import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DarkMode() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      root.style.setProperty('--color-surface', '#ffffff')
      root.style.setProperty('--color-surface-2', '#f5f5f5')
      root.style.setProperty('--color-surface-3', '#e5e5e5')
      root.style.setProperty('--color-border', '#d4d4d4')
      root.style.setProperty('--color-muted', '#737373')
      root.style.setProperty('--color-text', '#0a0a0a')
      root.style.setProperty('--color-text-secondary', '#404040')
      root.style.setProperty('--color-accent', '#0a0a0a')
      root.style.setProperty('--color-accent-light', '#262626')
      document.body.style.background = '#ffffff'
      document.body.style.color = '#0a0a0a'
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
      title={dark ? 'Light mode' : 'Dark mode'}
      style={{ pointerEvents: 'auto' }}
    >
      <AnimatePresence mode="wait">
        {dark ? (
          <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="text-lg">☀️</motion.span>
        ) : (
          <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="text-lg">🌙</motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
