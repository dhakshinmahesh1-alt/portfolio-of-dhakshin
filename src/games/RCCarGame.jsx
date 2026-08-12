import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const ARENA_W = 400
const ARENA_H = 300
const CAR_SIZE = 18
const GATE_SIZE = 28
const BOOST_SIZE = 20

function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
}

function isInsideRect(px, py, rx, ry, rw, rh, pad) {
  return px - pad > rx && px + pad < rx + rw && py - pad > ry && py + pad < ry + rh
}

function generateLevel(level) {
  const obstacles = []
  const count = 3 + level * 2
  for (let i = 0; i < count; i++) {
    let x, y, w, h, valid
    for (let attempt = 0; attempt < 50; attempt++) {
      w = 25 + Math.random() * 35
      h = 18 + Math.random() * 28
      x = 30 + Math.random() * (ARENA_W - 60 - w)
      y = 30 + Math.random() * (ARENA_H - 60 - h)
      valid = true
      if (rectsOverlap(x, y, w, h, 5, ARENA_H / 2 - 15, 30, 30)) valid = false
      for (const obs of obstacles) {
        if (rectsOverlap(x, y, w, h, obs.x - 5, obs.y - 5, obs.w + 10, obs.h + 10)) {
          valid = false
          break
        }
      }
      if (valid) break
    }
    if (valid) {
      obstacles.push({ x, y, w, h, color: ['#94a3b8', '#a855f7', '#22d3ee', '#f43f5e', '#fbbf24'][i % 5] })
    }
  }

  const boosts = []
  for (let i = 0; i < 2 + level; i++) {
    let bx, by, valid
    for (let attempt = 0; attempt < 30; attempt++) {
      bx = 25 + Math.random() * (ARENA_W - 50)
      by = 25 + Math.random() * (ARENA_H - 50)
      valid = true
      for (const obs of obstacles) {
        if (isInsideRect(bx, by, obs.x, obs.y, obs.w, obs.h, 10)) { valid = false; break }
      }
      if (valid) break
    }
    if (valid) boosts.push({ x: bx, y: by, collected: false })
  }

  let gateX, gateY, gateValid
  for (let attempt = 0; attempt < 100; attempt++) {
    gateX = 15 + Math.random() * (ARENA_W - GATE_SIZE - 30)
    gateY = 15 + Math.random() * (ARENA_H - GATE_SIZE - 30)
    gateValid = true
    for (const obs of obstacles) {
      if (rectsOverlap(gateX, gateY, GATE_SIZE, GATE_SIZE, obs.x - 5, obs.y - 5, obs.w + 10, obs.h + 10)) {
        gateValid = false
        break
      }
    }
    if (rectsOverlap(gateX, gateY, GATE_SIZE, GATE_SIZE, 0, ARENA_H / 2 - 20, 40, 40)) gateValid = false
    if (gateValid) break
  }

  return { obstacles, boosts, gate: { x: gateX, y: gateY } }
}

export function RCCarGame() {
  const [car, setCar] = useState({ x: 25, y: ARENA_H / 2, angle: 0, speed: 0 })
  const [level, setLevel] = useState(1)
  const [laps, setLaps] = useState(0)
  const [boosts, setBoosts] = useState(0)
  const [gameState, setGameState] = useState('idle')
  const [levelData, setLevelData] = useState(() => generateLevel(1))
  const [boostActive, setBoostActive] = useState(false)
  const [trail, setTrail] = useState([])
  const [hitFlash, setHitFlash] = useState(false)
  const keysRef = useRef({})
  const carRef = useRef(car)
  const animRef = useRef(null)
  const lastGate = useRef(0)
  const boostTimer = useRef(null)

  carRef.current = car

  const resetGame = useCallback(() => {
    setCar({ x: 25, y: ARENA_H / 2, angle: 0, speed: 0 })
    setLaps(0)
    setBoosts(0)
    setBoostActive(false)
    setTrail([])
    setHitFlash(false)
    setLevelData(generateLevel(level))
    lastGate.current = 0
    if (boostTimer.current) clearTimeout(boostTimer.current)
  }, [level])

  const startGame = () => {
    resetGame()
    setGameState('playing')
    try { window.__unlockAchievement?.('gamer') } catch {}
  }

  const nextLevel = () => {
    const nl = level + 1
    setLevel(nl)
    setLevelData(generateLevel(nl))
    resetGame()
    setGameState('playing')
  }

  useEffect(() => {
    const down = (e) => { keysRef.current[e.key] = true; if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault() }
    const up = (e) => { keysRef.current[e.key] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  useEffect(() => {
    if (gameState !== 'playing') return

    const loop = () => {
      const keys = keysRef.current
      const c = { ...carRef.current }
      const baseSpeed = boostActive ? 4.5 : 2.8
      const turnSpeed = 3.5

      if (keys['ArrowUp'] || keys['w']) c.speed = Math.min(c.speed + 0.35, baseSpeed)
      else if (keys['ArrowDown'] || keys['s']) c.speed = Math.max(c.speed - 0.35, -baseSpeed * 0.5)
      else c.speed *= 0.9

      if (keys['ArrowLeft'] || keys['a']) c.angle -= turnSpeed * (Math.abs(c.speed) > 0.5 ? 1 : 0.3)
      if (keys['ArrowRight'] || keys['d']) c.angle += turnSpeed * (Math.abs(c.speed) > 0.5 ? 1 : 0.3)

      const rad = (c.angle * Math.PI) / 180
      const nextX = c.x + Math.sin(rad) * c.speed
      const nextY = c.y - Math.cos(rad) * c.speed

      c.x = Math.max(CAR_SIZE / 2, Math.min(ARENA_W - CAR_SIZE / 2, nextX))
      c.y = Math.max(CAR_SIZE / 2, Math.min(ARENA_H - CAR_SIZE / 2, nextY))

      let hit = false
      for (const obs of levelData.obstacles) {
        if (rectsOverlap(
          c.x - CAR_SIZE / 2.5, c.y - CAR_SIZE / 2.5, CAR_SIZE / 1.3, CAR_SIZE / 1.3,
          obs.x, obs.y, obs.w, obs.h
        )) {
          hit = true
          c.speed *= -0.4
          c.x += Math.sin(rad) * -4
          c.y -= Math.cos(rad) * -4
        }
      }
      if (hit && !hitFlash) {
        setHitFlash(true)
        setTimeout(() => setHitFlash(false), 150)
      }

      const newBoosts = levelData.boosts.map((b) => {
        if (!b.collected) {
          const dx = c.x - b.x
          const dy = c.y - b.y
          if (Math.sqrt(dx * dx + dy * dy) < CAR_SIZE * 0.8) {
            setBoosts(prev => prev + 1)
            setBoostActive(true)
            if (boostTimer.current) clearTimeout(boostTimer.current)
            boostTimer.current = setTimeout(() => setBoostActive(false), 3000)
            return { ...b, collected: true }
          }
        }
        return b
      })
      setLevelData(prev => ({ ...prev, boosts: newBoosts }))

      const gate = levelData.gate
      const now = Date.now()
      if (
        now - lastGate.current > 1500 &&
        c.x > gate.x && c.x < gate.x + GATE_SIZE &&
        c.y > gate.y && c.y < gate.y + GATE_SIZE &&
        Math.abs(c.speed) > 0.8
      ) {
        lastGate.current = now
        setLaps(prev => {
          const nl = prev + 1
          if (nl >= 3 + level) {
            setGameState('won')
          }
          return nl
        })
        setLevelData(prev => {
          let nx, ny, ok
          for (let a = 0; a < 100; a++) {
            nx = 15 + Math.random() * (ARENA_W - GATE_SIZE - 30)
            ny = 15 + Math.random() * (ARENA_H - GATE_SIZE - 30)
            ok = true
            for (const obs of prev.obstacles) {
              if (rectsOverlap(nx, ny, GATE_SIZE, GATE_SIZE, obs.x - 8, obs.y - 8, obs.w + 16, obs.h + 16)) {
                ok = false; break
              }
            }
            if (ok) break
          }
          return { ...prev, gate: { x: nx, y: ny } }
        })
      }

      setTrail(prev => [...prev.slice(-25), { x: c.x, y: c.y }])
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
          <span className={laps >= requiredLaps ? 'text-green-600 font-bold' : ''}>
            Laps: {laps}/{requiredLaps}
          </span>
          {boosts > 0 && <span className="text-amber-500">⚡{boosts}</span>}
        </div>
      </div>

      <p className="text-xs text-text-secondary mb-3">
        {gameState === 'idle'
          ? 'Drive through green gates. Collect ⚡ for speed boost!'
          : gameState === 'won'
            ? `Level ${level} complete! You're fast!`
            : `Arrow keys or WASD. ${boostActive ? '⚡ BOOST ACTIVE!' : ''}`}
      </p>

      <div
        className={`relative rounded-xl border overflow-hidden bg-[#0f172a] transition-all ${hitFlash ? 'ring-2 ring-red-400/60' : ''}`}
        style={{ width: '100%', aspectRatio: `${ARENA_W}/${ARENA_H}` }}
        tabIndex={0}
      >
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox={`0 0 ${ARENA_W} ${ARENA_H}`}>
          {Array.from({ length: Math.floor(ARENA_W / 40) + 1 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={ARENA_H} stroke="white" strokeWidth="0.5" />
          ))}
          {Array.from({ length: Math.floor(ARENA_H / 40) + 1 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 40} x2={ARENA_W} y2={i * 40} stroke="white" strokeWidth="0.5" />
          ))}
        </svg>

        {levelData.obstacles.map((obs, i) => (
          <div
            key={i}
            className="absolute rounded-lg shadow-inner"
            style={{
              left: `${(obs.x / ARENA_W) * 100}%`,
              top: `${(obs.y / ARENA_H) * 100}%`,
              width: `${(obs.w / ARENA_W) * 100}%`,
              height: `${(obs.h / ARENA_H) * 100}%`,
              background: `linear-gradient(135deg, ${obs.color}cc, ${obs.color}88)`,
              border: `1px solid ${obs.color}44`,
              boxShadow: `inset 0 1px 2px rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.3)`,
            }}
          />
        ))}

        {levelData.boosts.filter(b => !b.collected).map((b, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="absolute flex items-center justify-center text-sm drop-shadow-lg"
            style={{
              left: `${(b.x / ARENA_W) * 100}%`,
              top: `${(b.y / ARENA_H) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >⚡</motion.div>
        ))}

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute border-2 border-dashed border-green-400/80 rounded-lg flex items-center justify-center"
          style={{
            left: `${(levelData.gate.x / ARENA_W) * 100}%`,
            top: `${(levelData.gate.y / ARENA_H) * 100}%`,
            width: `${(GATE_SIZE / ARENA_W) * 100}%`,
            height: `${(GATE_SIZE / ARENA_H) * 100}%`,
            background: 'rgba(34, 197, 94, 0.08)',
            boxShadow: '0 0 12px rgba(34, 197, 94, 0.2)',
          }}
        >
          <span className="text-[9px] text-green-400 font-bold tracking-wider">GOAL</span>
        </motion.div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {trail.map((t, i) => {
            const opacity = 0.15 + (i / trail.length) * 0.35
            const color = boostActive ? '#fbbf24' : '#a855f7'
            return (
              <circle
                key={i}
                cx={`${(t.x / ARENA_W) * 100}%`}
                cy={`${(t.y / ARENA_H) * 100}%`}
                r={boostActive ? 2.5 : 1.8}
                fill={color}
                opacity={opacity}
              />
            )
          })}
        </svg>

        <div
          className="absolute"
          style={{
            left: `${(car.x / ARENA_W) * 100}%`,
            top: `${(car.y / ARENA_H) * 100}%`,
            transform: `translate(-50%, -50%) rotate(${car.angle}deg)`,
            transition: 'none',
          }}
        >
          <div
            className={`w-5 h-5 rounded-sm border border-white/20 ${boostActive ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 'bg-white'}`}
            style={{ clipPath: 'polygon(50% 0%, 100% 40%, 85% 100%, 15% 100%, 0% 40%)' }}
          />
        </div>

        {(gameState === 'idle' || gameState === 'won') && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 z-10">
            {gameState === 'won' && (
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 font-bold text-xl drop-shadow-lg">
                Level {level} Complete!
              </motion.p>
            )}
            <button
              onClick={gameState === 'won' ? nextLevel : startGame}
              className="px-8 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors shadow-xl"
            >
              {gameState === 'won' ? `Level ${level + 1} →` : '🏁 Start'}
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-3 text-[10px] text-muted">
        <span>⬆️⬇️ Gas/Brake</span>
        <span>⬅️➡️ Steer</span>
        <span>🟢 Pass gates</span>
        <span>⚡ Boost</span>
      </div>
    </div>
  )
}