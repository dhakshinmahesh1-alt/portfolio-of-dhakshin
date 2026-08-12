import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function WhackAMole() {
  const [moles, setMoles] = useState(Array(9).fill(false))
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [playing, setPlaying] = useState(false)
  const intervalRef = useRef(null)
  const moleIntervalRef = useRef(null)

  const randomMole = () => Math.floor(Math.random() * 9)

  const startGame = () => {
    setMoles(Array(9).fill(false))
    setScore(0)
    setTimeLeft(30)
    setPlaying(true)

    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setPlaying(false)
          clearInterval(intervalRef.current)
          clearInterval(moleIntervalRef.current)
          return 0
        }
        return t - 1
      })
    }, 1000)

    moleIntervalRef.current = setInterval(() => {
      if (!playing) return
      setMoles(prev => {
        const next = prev.map(() => false)
        next[randomMole()] = true
        return next
      })
    }, 800)
  }

  const whack = (i) => {
    if (!playing || !moles[i]) return
    setMoles(prev => {
      const next = [...prev]
      next[i] = false
      return next
    })
    setScore(s => s + 1)
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      clearInterval(moleIntervalRef.current)
    }
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted font-mono">Score: {score}</p>
        <p className={`text-xs font-mono ${timeLeft <= 5 && timeLeft > 0 ? 'text-red-500' : 'text-muted'}`}>
          Time: {timeLeft}s
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
        {moles.map((mole, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.85 }}
            onClick={() => whack(i)}
            disabled={!playing}
            className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all border select-none
              ${mole
                ? 'bg-amber-50 border-amber-300 shadow-lg shadow-amber-200/50 animate-bounce'
                : playing
                  ? 'bg-surface-2 border-border/50 cursor-pointer'
                  : 'bg-surface-2 border-border/50 opacity-50'}`}
          >
            {mole ? '🛠️' : '🕳️'}
          </motion.button>
        ))}
      </div>
      {!playing && timeLeft === 0 && (
        <p className="text-center text-xs text-green-600 font-bold mt-2">Final Score: {score}</p>
      )}
      {!playing && (
        <button
          onClick={startGame}
          className="w-full mt-3 px-4 py-2 rounded-lg bg-text text-white text-xs font-bold hover:bg-text/80 transition-colors"
        >
          {timeLeft === 0 ? '🔄 Play Again' : '🎯 Start Whack-a-Mole'}
        </button>
      )}
      <div className="flex items-center gap-3 mt-2 text-[10px] text-muted">
        <span>🛠️ Click the moles</span>
        <span>⏱️ 30 seconds</span>
      </div>
    </div>
  )
}