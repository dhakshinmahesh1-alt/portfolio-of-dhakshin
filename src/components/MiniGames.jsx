import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const TOOL_ICONS = ['🔧', '⚙️', '💡', '🔌', '🔋', '🧲', '🪛', '📎', '✂️', '🔨', '🪤', '🧰']

function generateBoard(size) {
  const pairs = TOOL_ICONS.slice(0, size)
  const cards = [...pairs, ...pairs]
    .sort(() => Math.random() - 0.5)
    .map((icon, i) => ({ id: i, icon, flipped: false, matched: false }))
  return cards
}

export function MemoryGame() {
  const [cards, setCards] = useState(() => generateBoard(6))
  const [flipped, setFlipped] = useState([])
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleFlip = useCallback((id) => {
    if (disabled) return
    if (flipped.length >= 2) return
    if (cards[id].flipped || cards[id].matched) return

    const newCards = cards.map((c, i) => i === id ? { ...c, flipped: true } : c)
    setCards(newCards)

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      const [a, b] = newFlipped
      setDisabled(true)

      if (newCards[a].icon === newCards[b].icon) {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.icon === newCards[a].icon ? { ...c, matched: true } : c
          ))
          setFlipped([])
          setDisabled(false)
          const remaining = newCards.filter(c => !c.matched && c.id !== a && c.id !== b)
          if (remaining.length === 0) setWon(true)
        }, 500)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) =>
            i === a || i === b ? { ...c, flipped: false } : c
          ))
          setFlipped([])
          setDisabled(false)
        }, 900)
      }
    }
  }, [cards, flipped, disabled])

  const reset = () => {
    setCards(generateBoard(6))
    setFlipped([])
    setMoves(0)
    setWon(false)
    setDisabled(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted font-mono">Moves: {moves}</p>
        {won && <p className="text-xs text-green-600 font-bold">Done in {moves}!</p>}
        <button onClick={reset} className="text-xs text-muted hover:text-text transition-colors underline">Reset</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleFlip(card.id)}
            disabled={card.matched || disabled}
            className={`aspect-square rounded-xl text-xl flex items-center justify-center transition-all duration-300 border select-none
              ${card.matched
                ? 'bg-green-50 border-green-200 scale-95'
                : card.flipped
                  ? 'bg-white border-border shadow-sm rotate-0'
                  : 'bg-surface-2 border-border/50 hover:border-border hover:bg-white cursor-pointer active:scale-95'
              }`}
          >
            <span className={`transition-transform duration-300 ${(card.flipped || card.matched) ? 'rotate-0 scale-100' : ''}`}>
              {card.flipped || card.matched ? card.icon : '❓'}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

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

export function SnakeGame() {
  const GRID = 15
  const CELL = 16
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
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {Array.from({ length: GRID + 1 }, (_, i) => (
            <line key={`v${i}`} x1={`${(i / GRID) * 100}%`} y1="0" x2={`${(i / GRID) * 100}%`} y2="100%" stroke="white" strokeWidth="0.5" />
          ))}
          {Array.from({ length: GRID + 1 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i / GRID) * 100}%`} x2="100%" y2={`${(i / GRID) * 100}%`} stroke="white" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Snake */}
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

        {/* Food */}
        <div
          className="absolute rounded-full bg-red-500"
          style={{
            left: `${(food.x / GRID) * 100}%`,
            top: `${(food.y / GRID) * 100}%`,
            width: `${(1 / GRID) * 100}%`,
            height: `${(1 / GRID) * 100}%`,
          }}
        />

        {/* Start / Game Over overlay */}
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
        <span>⬆️⬇️⬇️⬅️➡️ Move</span>
        <span>🍎 Eat food</span>
        <span>🚫 Don't hit walls</span>
      </div>
    </div>
  )
}

export function BreakoutGame() {
  const COLS = 10
  const ROWS = 4
  const BRICK_W = 100 / COLS
  const BRICK_H = 8
  const PADDLE_W = 18
  const PADDLE_H = 3
  const BALL_SIZE = 3

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

      // Paddle collision
      if (b.y >= 88 && b.y <= 91 && b.x >= paddleX && b.x <= paddleX + PADDLE_W) {
        b.dy = -Math.abs(b.dy)
        b.dx = ((b.x - (paddleX + PADDLE_W / 2)) / (PADDLE_W / 2)) * 2
      }

      // Brick collision
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
        {/* Bricks */}
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

        {/* Paddle */}
        <div
          className="absolute bg-white rounded-full"
          style={{
            left: `${paddleX}%`,
            bottom: '8%',
            width: `${PADDLE_W}%`,
            height: `${PADDLE_H}%`,
          }}
        />

        {/* Ball */}
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

        {/* Start / Game Over overlay */}
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

export function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)
  const [winner, setWinner] = useState(null)

  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]

  const checkWinner = (b) => {
    for (const [a, c, d] of lines) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]
    }
    return null
  }

  const click = (i) => {
    if (board[i] || winner) return
    const newBoard = [...board]
    newBoard[i] = isX ? 'X' : 'O'
    setBoard(newBoard)
    const w = checkWinner(newBoard)
    if (w) setWinner(w)
    else setIsX(!isX)
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setIsX(true)
    setWinner(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted font-mono">
          {winner ? `${winner} wins!` : board.every(b => b) ? "Draw!" : `${isX ? 'X' : 'O'}'s turn`}
        </p>
        <button onClick={reset} className="text-xs text-muted hover:text-text transition-colors underline">Reset</button>
      </div>
      <div className="grid grid-cols-3 gap-1.5 max-w-[200px] mx-auto">
        {board.map((cell, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => click(i)}
            className={`aspect-square rounded-lg text-lg font-bold flex items-center justify-center transition-all border select-none
              ${cell === 'X' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                cell === 'O' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                'bg-surface-2 border-border/50 hover:border-border cursor-pointer'}`}
          >
            {cell}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
