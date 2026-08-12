import { useState } from 'react'
import { motion } from 'framer-motion'

export function ReactionGame() {
  const [state, setState] = useState('idle')
  const [startTime, setStartTime] = useState(0)
  const [reactionTime, setReactionTime] = useState(null)
  const [bestTime, setBestTime] = useState(null)

  const start = () => {
    setState('waiting')
    setReactionTime(null)
    const delay = 1000 + Math.random() * 3000
    setTimeout(() => {
      setState('go')
      setStartTime(Date.now())
    }, delay)
  }

  const click = () => {
    if (state === 'idle' || state === 'result') {
      start()
      return
    }
    if (state === 'waiting') {
      setState('idle')
      setReactionTime(null)
      return
    }
    if (state === 'go') {
      const time = Date.now() - startTime
      setReactionTime(time)
      setBestTime(prev => prev === null ? time : Math.min(prev, time))
      setState('result')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted font-mono">
          {bestTime !== null ? `Best: ${bestTime}ms` : 'Test your reflexes'}
        </p>
        {reactionTime !== null && state === 'result' && (
          <p className="text-xs text-accent font-bold">{reactionTime}ms</p>
        )}
      </div>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={click}
        className={`w-full h-32 rounded-2xl flex items-center justify-center text-sm font-semibold transition-all duration-200 border select-none
          ${state === 'idle' || state === 'result'
            ? 'bg-surface-2 border-border/50 text-muted hover:border-border cursor-pointer'
            : state === 'waiting'
              ? 'bg-amber-50 border-amber-300 text-amber-700 cursor-pointer'
              : 'bg-green-50 border-green-300 text-green-700 cursor-pointer scale-[1.02]'
          }`}
      >
        {state === 'idle' && '🟢 Click to Start'}
        {state === 'waiting' && '⏳ Wait for green...'}
        {state === 'go' && '🟩 CLICK NOW!'}
        {state === 'result' && '🔄 Try Again'}
      </motion.button>
    </div>
  )
}