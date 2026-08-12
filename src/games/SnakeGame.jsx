import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const GRID = 15

export function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 7, y: 7 }])
  const [food, setFood] = useState({ x: 10, y: 10 })
  const [dir, setDir] = useState({ x: 1, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const dirRef = useRef(dir)
  const snakeRef = useRef(snake)

  dirRef.current = dir
  snakeRef.current = snake

  const placeFood = useCallback((snk) => {
    let pos
    do {
      pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
    } while (snk.some(s => s.x === pos.x && s.y === pos.y))
    return pos
  }, [])

  useEffect(() => {
    if (!started || gameOver) return
    const interval = setInterval(() => {
      const d = dirRef.current
      const s = snakeRef.current
      const head = { x: s[0].x + d.x, y: s[0].y + d.y }

      if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
        setGameOver(true)
        return
      }
      if (s.some(seg => seg.x === head.x && seg.y === head.y)) {
        setGameOver(true)
        return
      }

      const newSnake = [head, ...s]
      if (head.x === food.x && head.y === food.y) {
        setScore(sc => sc + 1)
        setFood(placeFood(newSnake))
      } else {
        newSnake.pop()
      }
      setSnake(newSnake)
      snakeRef.current = newSnake
    }, 140)
    return () => clearInterval(interval)
  }, [started, gameOver, food, placeFood])

  useEffect(() => {
    const handleKey = (e) => {
      const d = dirRef.current
      if ((e.key === 'ArrowUp' || e.key === 'w') && d.y !== 1) setDir({ x: 0, y: -1 })
      if ((e.key === 'ArrowDown' || e.key === 's') && d.y !== -1) setDir({ x: 0, y: 1 })
      if ((e.key === 'ArrowLeft' || e.key === 'a') && d.x !== 1) setDir({ x: -1, y: 0 })
      if ((e.key === 'ArrowRight' || e.key === 'd') && d.x !== -1) setDir({ x: 1, y: 0 })
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const reset = () => {
    setSnake([{ x: 7, y: 7 }])
    setFood({ x: 10, y: 10 })
    setDir({ x: 1, y: 0 })
    setGameOver(false)
    setScore(0)
    setStarted(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted font-mono">Score: {score}</p>
        <button onClick={reset} className="text-xs text-muted hover:text-text transition-colors underline">Reset</button>
      </div>
      <div
        className="relative bg-[#0f172a] rounded-xl overflow-hidden border border-border/30"
        style={{ width: '100%', aspectRatio: `${GRID}/${GRID}` }}
        tabIndex={0}
      >
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {Array.from({ length: GRID + 1 }, (_, i) => (
            <line key={`v${i}`} x1={`${(i / GRID) * 100}%`} y1="0" x2={`${(i / GRID) * 100}%`} y2="100%" stroke="white" strokeWidth="0.5" />
          ))}
          {Array.from({ length: GRID + 1 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i / GRID) * 100}%`} x2="100%" y2={`${(i / GRID) * 100}%`} stroke="white" strokeWidth="0.5" />
          ))}
        </svg>

        {snake.map((seg, i) => (
          <div
            key={i}
            className="absolute rounded-sm"
            style={{
              left: `${(seg.x / GRID) * 100}%`,
              top: `${(seg.y / GRID) * 100}%`,
              width: `${(1 / GRID) * 100}%`,
              height: `${(1 / GRID) * 100}%`,
              backgroundColor: i === 0 ? '#22c55e' : '#16a34a',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
        ))}

        <div
          className="absolute rounded-full bg-red-500"
          style={{
            left: `${(food.x / GRID) * 100}%`,
            top: `${(food.y / GRID) * 100}%`,
            width: `${(1 / GRID) * 100}%`,
            height: `${(1 / GRID) * 100}%`,
          }}
        />

        {(!started || gameOver) && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 z-10">
            {gameOver && <p className="text-red-400 font-bold text-sm">Game Over! Score: {score}</p>}
            <button
              onClick={() => { reset(); setStarted(true) }}
              className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-colors"
            >
              {gameOver ? '🔄 Play Again' : '🐍 Start'}
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 mt-2 text-[10px] text-muted">
        <span>⬆️⬇️⬅️➡️ Move</span>
        <span>🍎 Eat food</span>
        <span>🚫 Don't hit walls</span>
      </div>
    </div>
  )
}