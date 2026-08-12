import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function SimonSays() {
  const [sequence, setSequence] = useState([])
  const [userSequence, setUserSequence] = useState([])
  const [playing, setPlaying] = useState(false)
  const [showing, setShowing] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const colors = ['🔴', '🔵', '🟢', '🟡']
  const colorClasses = [
    'bg-red-500 border-red-400',
    'bg-blue-500 border-blue-400',
    'bg-green-500 border-green-400',
    'bg-yellow-500 border-yellow-400'
  ]

  const addToSequence = () => {
    const next = Math.floor(Math.random() * 4)
    setSequence(prev => [...prev, next])
  }

  const startGame = () => {
    setSequence([])
    setUserSequence([])
    setScore(0)
    setGameOver(false)
    setPlaying(true)
    addToSequence()
    playSequence()
  }

  const playSequence = async () => {
    setShowing(true)
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(r => setTimeout(r, 500))
      await new Promise(r => setTimeout(r, 300))
    }
    setShowing(false)
    setUserSequence([])
  }

  const handleColor = (colorIndex) => {
    if (!playing || showing || gameOver) return
    const newUserSeq = [...userSequence, colorIndex]
    setUserSequence(newUserSeq)

    if (newUserSeq[newUserSeq.length - 1] !== sequence[newUserSeq.length - 1]) {
      setGameOver(true)
      setPlaying(false)
      return
    }

    if (newUserSeq.length === sequence.length) {
      setScore(s => s + 1)
      setTimeout(() => {
        addToSequence()
        playSequence()
      }, 1000)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted font-mono">Level: {score + 1}</p>
        <p className="text-xs text-muted font-mono">Best: {score}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-[200px] mx-auto mb-4">
        {colors.map((color, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleColor(i)}
            disabled={!playing || showing || gameOver}
            className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all border-4 select-none
              ${showing && sequence[userSequence.length] === i
                ? 'scale-105 shadow-xl shadow-white/50'
                : ''} ${colorClasses[i]}`}
          >
            {color}
          </motion.button>
        ))}
      </div>
      {showing && (
        <p className="text-center text-xs text-muted mb-2">Watch the pattern...</p>
      )}
      {!playing && !gameOver && (
        <button
          onClick={startGame}
          className="w-full px-4 py-2 rounded-lg bg-text text-white text-xs font-bold hover:bg-text/80 transition-colors"
        >
          🧠 Start Simon Says
        </button>
      )}
      {gameOver && (
        <button
          onClick={startGame}
          className="w-full px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors"
        >
          🔄 Try Again (Level {score + 1})
        </button>
      )}
      <div className="flex items-center gap-3 mt-2 text-[10px] text-muted">
        <span>👀 Watch pattern</span>
        <span>🔁 Repeat it</span>
      </div>
    </div>
  )
}