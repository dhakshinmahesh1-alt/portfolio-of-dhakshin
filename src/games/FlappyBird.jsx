import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function FlappyBird() {
  const [birdY, setBirdY] = useState(50)
  const [velocity, setVelocity] = useState(0)
  const [pipes, setPipes] = useState([{ x: 100, gapY: 30 }])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)
  const birdRef = useRef(birdY)
  const pipesRef = useRef(pipes)

  birdRef.current = birdY
  pipesRef.current = pipes

  const jump = () => {
    if (!started || gameOver) return
    setVelocity(-4)
  }

  useEffect(() => {
    if (!started || gameOver) return
    const interval = setInterval(() => {
      setVelocity(v => v + 0.3)
      setBirdY(y => {
        const newY = Math.max(0, Math.min(100, y + velocity))
        if (newY === 0 || newY === 100) setGameOver(true)
        return newY
      })

      setPipes(prev => {
        const next = prev.map(p => ({ ...p, x: p.x - 1.5 }))
        if (next[next.length - 1].x < 60) {
          next.push({ x: 100, gapY: 15 + Math.random() * 50 })
        }
        return next.filter(p => p.x > -10)
      })

      setPipes(prev => {
        if (prev[0] && prev[0].x < 5 && prev[0].x > 3.5) {
          setScore(s => s + 1)
        }
        return prev
      })

      const birdX = 10
      const birdSize = 4
      setPipes(prev => {
        for (const pipe of prev) {
          if (birdX + birdSize > pipe.x && birdX - birdSize < pipe.x + 8) {
            if (birdY - birdSize < pipe.gapY || birdY + birdSize > pipe.gapY + 25) {
              setGameOver(true)
              break
            }
          }
        }
        return prev
      })
    }, 1000 / 60)
    return () => clearInterval(interval)
  }, [started, gameOver, velocity])

  const handleKey = (e) => {
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
      e.preventDefault()
      if (!started) {
        setStarted(true)
      } else if (gameOver) {
        setBirdY(50)
        setVelocity(0)
        setPipes([{ x: 100, gapY: 30 }])
        setScore(0)
        setGameOver(false)
      } else {
        jump()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted font-mono">Score: {score}</p>
      </div>
      <div
        className="relative bg-sky-100 rounded-xl overflow-hidden border border-border/30"
        style={{ width: '100%', aspectRatio: '10/7' }}
        tabIndex={0}
        onClick={jump}
      >
        {pipes.map((pipe, i) => (
          <div key={i} className="absolute bg-green-600" style={{
            left: `${pipe.x}%`,
            top: 0,
            width: '8%',
            height: `${pipe.gapY}%`,
            border: '1px solid #15803d',
          }} />
        ))}
        {pipes.map((pipe, i) => (
          <div key={i} className="absolute bg-green-600" style={{
            left: `${pipe.x}%`,
            top: `${pipe.gapY + 25}%`,
            width: '8%',
            height: `${100 - pipe.gapY - 25}%`,
            border: '1px solid #15803d',
          }} />
        ))}

        <div
          className="absolute text-lg"
          style={{
            left: '10%',
            top: `${birdY}%`,
            transform: 'translateY(-50%)',
            transition: 'top 0.01s linear',
          }}
        >
          🐦
        </div>

        {!started && (
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-2 z-10">
            <p className="text-white font-bold text-sm">🐦 Flappy Bird</p>
            <button onClick={() => setStarted(true)} className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90">Click/Space to Start</button>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 z-10">
            <p className="text-red-400 font-bold text-sm">Game Over! Score: {score}</p>
            <button onClick={() => { setBirdY(50); setVelocity(0); setPipes([{ x: 100, gapY: 30 }]); setScore(0); setGameOver(false) }} className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90">🔄 Play Again</button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 mt-2 text-[10px] text-muted">
        <span>🖱️ Click or Space</span>
        <span>🐦 Fly through pipes</span>
      </div>
    </div>
  )
}