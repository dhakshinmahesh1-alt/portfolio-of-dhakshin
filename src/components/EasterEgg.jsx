import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EasterEgg() {
  const [found, setFound] = useState(false)
  const [clicks, setClicks] = useState(0)

  const handleClick = () => {
    const next = clicks + 1
    setClicks(next)
    if (next >= 5) {
      setFound(true)
      setClicks(0)
    }
  }

  return (
    <>
      {/* Hidden trigger — click the footer copyright 5 times */}
      <div className="fixed bottom-0 right-0 z-50">
        <button
          onClick={handleClick}
          className="w-8 h-8 opacity-0 cursor-default"
          aria-hidden="true"
        />
      </div>

      <AnimatePresence>
        {found && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-white border border-border rounded-2xl shadow-2xl p-6 max-w-xs"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-sm font-semibold text-text mb-1">You found the Easter egg!</p>
            <p className="text-xs text-text-secondary mb-3">
              You're clearly someone who clicks everything. That's exactly the kind of curiosity
              that makes a great hardware tinkerer.
            </p>
            <button
              onClick={() => setFound(false)}
              className="text-xs text-muted hover:text-text transition-colors underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
