import { useState } from 'react'
import { motion } from 'framer-motion'

export function NumberGuess() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1)
  const [guess, setGuess] = useState('')
  const [history, setHistory] = useState([])
  const [won, setWon] = useState(false)

  const submit = () => {
    if (!guess || won) return
    const g = parseInt(guess)
    if (g < 1 || g > 100) return
    setHistory(prev => [...prev, g])
    if (g === target) {
      setWon(true)
    }
    setGuess('')
  }

  const reset = () => {
    setTarget(Math.floor(Math.random() * 100) + 1)
    setGuess('')
    setHistory([])
    setWon(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted font-mono">Attempts: {history.length}</p>
        {won && <p className="text-xs text-green-600 font-bold">You got it! 🎉</p>}
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min="1"
          max="100"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          disabled={won}
          className="flex-1 px-4 py-2 rounded-lg bg-white border border-border text-text placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-text/5"
          placeholder="1-100"
        />
        <button onClick={submit} disabled={won || !guess} className="px-4 py-2 rounded-lg bg-text text-white text-sm font-medium hover:bg-text/80 disabled:opacity-50">Guess</button>
      </div>
      <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
        {history.map((h, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className={`px-2 py-1 rounded-full text-xs font-mono border ${
              h === target ? 'bg-green-100 border-green-300 text-green-700' :
              h < target ? 'bg-blue-100 border-blue-300 text-blue-700' :
              'bg-amber-100 border-amber-300 text-amber-700'
            }`}
          >
            {h} {h < target ? '⬆️' : h > target ? '⬇️' : '✓'}
          </motion.span>
        ))}
      </div>
      {won && (
        <button onClick={reset} className="w-full mt-3 px-4 py-2 rounded-lg bg-text text-white text-xs font-bold hover:bg-text/80 transition-colors">
          🔄 Play Again
        </button>
      )}
      <div className="flex items-center gap-3 mt-2 text-[10px] text-muted">
        <span>🔢 Guess 1-100</span>
        <span>⬆️ Higher / ⬇️ Lower</span>
      </div>
    </div>
  )
}