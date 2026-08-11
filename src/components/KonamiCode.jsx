import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function KonamiCode() {
  const [unlocked, setUnlocked] = useState(false)
  const [show, setShow] = useState(false)

  const sequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ]
  const [input, setInput] = useState([])

  const handler = useCallback((e) => {
    const next = [...input, e.key].slice(-sequence.length)
    setInput(next)
    if (next.join(',') === sequence.join(',')) {
      setUnlocked(true)
      setShow(true)
      setInput([])
      setTimeout(() => setShow(false), 5000)
    }
  }, [input])

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handler])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-text text-white rounded-2xl px-8 py-5 shadow-2xl flex items-center gap-4"
        >
          <span className="text-3xl">🎮</span>
          <div>
            <p className="text-sm font-bold">Konami Code Activated!</p>
            <p className="text-xs text-white/60">You found the secret. Nice moves.</p>
          </div>
          <button onClick={() => setShow(false)} className="text-white/40 hover:text-white text-xs ml-4">✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
