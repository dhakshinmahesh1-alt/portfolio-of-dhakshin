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
      // Visual flash handled by showing state
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
      // Bird physics
      setVelocity(v => v + 0.3)
      setBirdY(y => {
        const newY = Math.max(0, Math.min(100, y + velocity))
        if (newY === 0 || newY === 100) setGameOver(true)
        return newY
      })

      // Move pipes
      setPipes(prev => {
        const next = prev.map(p => ({ ...p, x: p.x - 1.5 }))
        // Add new pipe
        if (next[next.length - 1].x < 60) {
          next.push({ x: 100, gapY: 15 + Math.random() * 50 })
        }
        // Remove off-screen pipes
        return next.filter(p => p.x > -10)
      })

      // Score
      setPipes(prev => {
        if (prev[0] && prev[0].x < 5 && prev[0].x > 3.5) {
          setScore(s => s + 1)
        }
        return prev
      })

      // Collision
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
        {/* Pipes */}
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

        {/* Bird */}
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

        {/* Overlays */}
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
