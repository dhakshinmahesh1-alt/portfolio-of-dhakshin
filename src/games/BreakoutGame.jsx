import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const COLS = 10
const ROWS = 4
const BRICK_W = 100 / COLS
const BRICK_H = 8
const PADDLE_W = 18
const PADDLE_H = 3
const BALL_SIZE = 3

export function BreakoutGame() {
  const [bricks, setBricks] = useState(() =>
    Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, (_, c) => ({ alive: true, color: ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6'][r] }))
    )
  )
  const [paddleX, setPaddleX] = useState(41)
  const [ball, setBall] = useState({ x: 50, y: 85, dx: 1.5, dy: -1.5 })
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const ballRef = useRef(ball)
  const bricksRef = useRef(bricks)

  ballRef.current = ball
  bricksRef.current = bricks

  useEffect(() => {
    if (!started || gameOver || won) return
    const interval = setInterval(() => {
      const b = { ...ballRef.current }
      b.x += b.dx
      b.y += b.dy

      if (b.x <= 0 || b.x >= 100) b.dx *= -1
      if (b.y <= 0) b.dy *= -1

      if (b.y >= 95) {
        setGameOver(true)
        return
      }

      if (b.y >= 88 && b.y <= 91 && b.x >= paddleX && b.x <= paddleX + PADDLE_W) {
        b.dy = -Math.abs(b.dy)
        b.dx = ((b.x - (paddleX + PADDLE_W / 2)) / (PADDLE_W / 2)) * 2
      }

      const brks = bricksRef.current
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (!brks[r][c].alive) continue
          const bx = c * BRICK_W
          const by = 5 + r * (BRICK_H + 2)
          if (b.x > bx && b.x < bx + BRICK_W && b.y > by && b.y < by + BRICK_H) {
            b.dy *= -1
            setBricks(prev => {
              const next = prev.map(row => row.map(brick => ({ ...brick })))
              next[r][c].alive = false
              return next
            })
            setScore(s => s + 1)
            break
          }
        }
      }

      setBall(b)
      ballRef.current = b
    }, 20)
    return () => clearInterval(interval)
  }, [started, gameOver, won, paddleX])

  useEffect(() => {
    if (!started || gameOver) return
    const allDead = bricks.every(row => row.every(b => !b.alive))
    if (allDead) setWon(true)
  }, [bricks, started, gameOver])

  const handleMove = (e) => {
    if (!started || gameOver) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setPaddleX(Math.max(0, Math.min(100 - PADDLE_W, x - PADDLE_W / 2)))
  }

  const reset = () => {
    setBricks(Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, (_, c) => ({ alive: true, color: ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6'][r] }))
    ))
    setPaddleX(41)
    setBall({ x: 50, y: 85, dx: 1.5, dy: -1.5 })
    setScore(0)
    setGameOver(false)
    setWon(false)
    setStarted(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted font-mono">Score: {score}</p>
        <button onClick={reset} className="text-xs text-muted hover:text-text transition-colors underline">Reset</button>
      </div>
      <div
        className="relative bg-[#0f172a] rounded-xl overflow-hidden border border-border/30 cursor-none"
        style={{ width: '100%', aspectRatio: '10/6' }}
        onMouseMove={handleMove}
      >
        {bricks.map((row, r) =>
          row.map((brick, c) =>
            brick.alive ? (
              <div
                key={`${r}-${c}`}
                className="absolute rounded-sm"
                style={{
                  left: `${c * BRICK_W}%`,
                  top: `${5 + r * (BRICK_H + 2)}%`,
                  width: `${BRICK_W - 0.5}%`,
                  height: `${BRICK_H}%`,
                  backgroundColor: brick.color,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              />
            ) : null
          )
        )}

        <div
          className="absolute bg-white rounded-full"
          style={{
            left: `${paddleX}%`,
            bottom: '8%',
            width: `${PADDLE_W}%`,
            height: `${PADDLE_H}%`,
          }}
        />

        <div
          className="absolute bg-white rounded-full"
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            width: `${BALL_SIZE}%`,
            height: `${BALL_SIZE * 1.5}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {(!started || gameOver || won) && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 z-10">
            {won && <p className="text-green-400 font-bold text-sm">You Win! Score: {score}</p>}
            {gameOver && <p className="text-red-400 font-bold text-sm">Game Over! Score: {score}</p>}
            <button
              onClick={() => { reset(); setStarted(true) }}
              className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-colors"
            >
              {won ? '🔄 Play Again' : gameOver ? '🔄 Try Again' : '🧱 Start'}
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 mt-2 text-[10px] text-muted">
        <span>🖱️ Move paddle</span>
        <span>🧱 Break all bricks</span>
      </div>
    </div>
  )
}