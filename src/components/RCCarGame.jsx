import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const ARENA_W = 400
const ARENA_H = 300
const CAR_SIZE = 20
const GATE_SIZE = 30
const BOOST_SIZE = 25
const OBSTACLE_COLORS = ['#94a3b8', '#a855f7', '#22d3ee', '#f43f5e']

function generateLevel(level) {
  const obstacles = []
  const count = 3 + level * 2
  for (let i = 0; i < count; i++) {
    obstacles.push({
      x: 40 + Math.random() * (ARENA_W - 80),
      y: 40 + Math.random() * (ARENA_H - 80),
      w: 20 + Math.random() * 30,
      h: 15 + Math.random() * 25,
      color: OBSTACLE_COLORS[i % OBSTACLE_COLORS.length],
    })
  }

  const boosts = []
  for (let i = 0; i < 2 + level; i++) {
    boosts.push({
      x: 30 + Math.random() * (ARENA_W - 60),
      y: 30 + Math.random() * (ARENA_H - 60),
      collected: false,
    })
  }

  return {
    obstacles,
    boosts,
    gate: {
      x: ARENA_W - GATE_SIZE - 10,
      y: ARENA_H / 2 - GATE_SIZE / 2,
    },
  }
}

export default function RCCarGame() {
  const [car, setCar] = useState({ x: 25, y: ARENA_H / 2, angle: 0, speed: 0 })
  const [level, setLevel] = useState(1)
  const [laps, setLaps] = useState(0)
  const [boosts, setBoosts] = useState(0)
  const [bestLaps, setBestLaps] = useState(null)
  const [gameState, setGameState] = useState('idle') // idle, playing, won
  const [levelData, setLevelData] = useState(() => generateLevel(1))
  const [boostActive, setBoostActive] = useState(false)
  const [trail, setTrail] = useState([])
  const keysRef = useRef({})
  const carRef = useRef(car)
  const animRef = useRef(null)

  carRef.current = car

  const resetGame = useCallback(() => {
    setCar({ x: 25, y: ARENA_H / 2, angle: 0, speed: 0 })
    setLaps(0)
    setBoosts(0)
    setBoostActive(false)
    setTrail([])
    setLevelData(generateLevel(level))
  }, [level])

  const startGame = () => {
    resetGame()
    setGameState('playing')
  }

  const nextLevel = () => {
    const newLevel = level + 1
    setLevel(newLevel)
    setLevelData(generateLevel(newLevel))
    resetGame()
    setGameState('playing')
  }

  // Keyboard controls
  useEffect(() => {
    const down = (e) => {
      keysRef.current[e.key] = true
      e.preventDefault()
    }
    const up = (e) => {
      keysRef.current[e.key] = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return

    const loop = () => {
      const keys = keysRef.current
      const c = { ...carRef.current }

      const baseSpeed = boostActive ? 4 : 2.5
      const turnSpeed = 3

      if (keys['ArrowUp'] || keys['w']) {
        c.speed = Math.min(c.speed + 0.3, baseSpeed)
      } else if (keys['ArrowDown'] || keys['s']) {
        c.speed = Math.max(c.speed - 0.3, -baseSpeed * 0.5)
      } else {
        c.speed *= 0.92
      }

      if (keys['ArrowLeft'] || keys['a']) {
        c.angle -= turnSpeed * (Math.abs(c.speed) > 0.5 ? 1 : 0.3)
      }
      if (keys['ArrowRight'] || keys['d']) {
        c.angle += turnSpeed * (Math.abs(c.speed) > 0.5 ? 1 : 0.3)
      }

      const rad = (c.angle * Math.PI) / 180
      c.x += Math.sin(rad) * c.speed
      c.y -= Math.cos(rad) * c.speed

      // Arena bounds
      c.x = Math.max(CAR_SIZE / 2, Math.min(ARENA_W - CAR_SIZE / 2, c.x))
      c.y = Math.max(CAR_SIZE / 2, Math.min(ARENA_H - CAR_SIZE / 2, c.y))

      // Obstacle collision
      for (const obs of levelData.obstacles) {
        if (
          c.x + CAR_SIZE / 2 > obs.x && c.x - CAR_SIZE / 2 < obs.x + obs.w &&
          c.y + CAR_SIZE / 2 > obs.y && c.y - CAR_SIZE / 2 < obs.y + obs.h
        ) {
          c.speed *= -0.5
          c.x += Math.sin(rad) * -5
          c.y -= Math.cos(rad) * -5
        }
      }

      // Boost collection
      const newBoosts = levelData.boosts.map((b, i) => {
        if (!b.collected) {
          const dx = c.x - b.x
          const dy = c.y - b.y
          if (Math.sqrt(dx * dx + dy * dy) < CAR_SIZE) {
            setBoosts(prev => prev + 1)
            setBoostActive(true)
            setTimeout(() => setBoostActive(false), 3000)
            return { ...b, collected: true }
          }
        }
        return b
      })
      setLevelData(prev => ({ ...prev, boosts: newBoosts }))

      // Gate check (must pass through gate to score a lap)
      const gate = levelData.gate
      if (
        c.x > gate.x && c.x < gate.x + GATE_SIZE &&
        c.y > gate.y && c.y < gate.y + GATE_SIZE &&
        Math.abs(c.speed) > 1
      ) {
        setLaps(prev => {
          const newLaps = prev + 1
          if (newLaps >= 3 + level) {
            setGameState('won')
            setBestLaps(prev => prev === null ? level : Math.min(prev, level))
          }
          return newLaps
        })
        // Move gate to new position
        setLevelData(prev => ({
          ...prev,
          gate: {
            x: 10 + Math.random() * (ARENA_W / 2 - GATE_SIZE),
            y: 10 + Math.random() * (ARENA_H - GATE_SIZE - 20),
          }
        }))
      }

      // Trail
      setTrail(prev => [...prev.slice(-30), { x: c.x, y: c.y, age: 0 }])

      setCar(c)
      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animRef.current)
  }, [gameState, levelData, boostActive, level])

  const requiredLaps = 3 + level

  return (
    <div className="bg-white border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏎️</span>
          <h3 className="text-sm font-semibold text-text">RC Car Arena</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted font-mono">
          <span>Lvl {level}</span>
          <span>Laps: {laps}/{requiredLaps}</span>
          {boosts > 0 && <span className="text-amber-500">⚡{boosts}</span>}
        </div>
      </div>

      <p className="text-xs text-text-secondary mb-3">
        {gameState === 'idle'
          ? 'Drive through the green gate 3 times. Collect ⚡ for speed boost!'
          : gameState === 'won'
            ? `Level ${level} complete!`
            : `Arrow keys / WASD to drive. ${boostActive ? '⚡ BOOST ACTIVE!' : ''}`
        }
      </p>

      {/* Arena */}
      <div
        className="relative rounded-xl border border-border/50 overflow-hidden bg-[#1a1a2e]"
        style={{ width: '100%', aspectRatio: `${ARENA_W}/${ARENA_H}` }}
        tabIndex={0}
        onFocus={() => {}}
      >
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox={`0 0 ${ARENA_W} ${ARENA_H}`}>
          {Array.from({ length: Math.floor(ARENA_W / 40) }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={ARENA_H} stroke="white" strokeWidth="0.5" />
          ))}
          {Array.from({ length: Math.floor(ARENA_H / 40) }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 40} x2={ARENA_W} y2={i * 40} stroke="white" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Obstacles */}
        {levelData.obstacles.map((obs, i) => (
          <div
            key={i}
            className="absolute rounded-md opacity-80"
            style={{
              left: `${(obs.x / ARENA_W) * 100}%`,
              top: `${(obs.y / ARENA_H) * 100}%`,
              width: `${(obs.w / ARENA_W) * 100}%`,
              height: `${(obs.h / ARENA_H) * 100}%`,
              backgroundColor: obs.color,
            }}
          />
        ))}

        {/* Boosts */}
        {levelData.boosts.filter(b => !b.collected).map((b, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute flex items-center justify-center text-sm"
            style={{
              left: `${(b.x / ARENA_W) * 100}%`,
              top: `${(b.y / ARENA_H) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            ⚡
          </motion.div>
        ))}

        {/* Gate */}
        <div
          className="absolute border-2 border-dashed border-green-400 rounded-lg flex items-center justify-center"
          style={{
            left: `${(levelData.gate.x / ARENA_W) * 100}%`,
            top: `${(levelData.gate.y / ARENA_H) * 100}%`,
            width: `${(GATE_SIZE / ARENA_W) * 100}%`,
            height: `${(GATE_SIZE / ARENA_H) * 100}%`,
          }}
        >
          <span className="text-[10px] text-green-400 font-bold">GOAL</span>
        </div>

        {/* Trail */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {trail.map((t, i) => (
            <circle
              key={i}
              cx={`${(t.x / ARENA_W) * 100}%`}
              cy={`${(t.y / ARENA_H) * 100}%`}
              r={boostActive ? 2 : 1.5}
              fill={boostActive ? '#fbbf24' : '#a855f7'}
              opacity={0.3 + (i / trail.length) * 0.5}
            />
          ))}
        </svg>

        {/* Car */}
        <div
          className="absolute transition-none"
          style={{
            left: `${(car.x / ARENA_W) * 100}%`,
            top: `${(car.y / ARENA_H) * 100}%`,
            transform: `translate(-50%, -50%) rotate(${car.angle}deg)`,
          }}
        >
          <div
            className={`w-5 h-5 rounded-sm ${boostActive ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 'bg-white'} border border-white/30`}
            style={{ clipPath: 'polygon(50% 0%, 100% 35%, 100% 100%, 0% 100%, 0% 35%)' }}
          />
        </div>

        {/* Start / Win overlay */}
        {(gameState === 'idle' || gameState === 'won') && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3">
            {gameState === 'won' && (
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-400 font-bold text-lg"
              >
                Level {level} Complete!
              </motion.p>
            )}
            <button
              onClick={gameState === 'won' ? nextLevel : startGame}
              className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              {gameState === 'won' ? `Level ${level + 1}` : 'Start'}
            </button>
            {bestLaps && (
              <p className="text-xs text-white/50">Best: Level {bestLaps}</p>
            )}
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div className="flex items-center gap-4 mt-3 text-[10px] text-muted">
        <span>⬆️⬇️ Accelerate/Brake</span>
        <span>⬅️➡️ Steer</span>
        <span>⚡ Boosts = faster</span>
      </div>
    </div>
  )
}
