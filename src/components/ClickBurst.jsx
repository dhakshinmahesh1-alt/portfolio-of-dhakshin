import { useState, useCallback, useRef } from 'react'

export default function ClickBurst() {
  const [bursts, setBursts] = useState([])
  const idRef = useRef(0)
  const lastClick = useRef(0)

  const handleClick = useCallback((e) => {
    const now = Date.now()
    if (now - lastClick.current < 100) return
    lastClick.current = now

    // Only burst on non-interactive elements
    const tag = e.target.tagName
    if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA') return
    if (e.target.closest('a, button, input, textarea')) return

    const count = 5 + Math.floor(Math.random() * 3)
    const id = idRef.current++
    const particles = Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
      distance: 25 + Math.random() * 35,
      size: 2 + Math.random() * 4,
      color: ['#a855f7', '#22d3ee', '#f43f5e', '#22c55e', '#fbbf24'][Math.floor(Math.random() * 5)],
    }))

    setBursts(prev => [...prev, { id, x: e.clientX, y: e.clientY, particles }])
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== id))
    }, 500)
  }, [])

  return (
    <>
      {/* Global click listener - doesn't block other elements */}
      <div
        className="fixed inset-0 z-[1]"
        onClick={handleClick}
        style={{ pointerEvents: 'none' }}
      />

      {/* Burst particles */}
      {bursts.map(burst => (
        <div key={burst.id} className="fixed inset-0 pointer-events-none z-[9998]">
          {burst.particles.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: burst.x,
                top: burst.y,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                animation: `burst-particle 0.5s ease-out forwards`,
                '--tx': `${Math.cos(p.angle) * p.distance}px`,
                '--ty': `${Math.sin(p.angle) * p.distance}px`,
              }}
            />
          ))}
        </div>
      ))}
      <style>{`
        @keyframes burst-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
      `}</style>
    </>
  )
}
