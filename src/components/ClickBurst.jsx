import { useState, useCallback, useRef } from 'react'

export default function ClickBurst() {
  const [bursts, setBursts] = useState([])
  const idRef = useRef(0)

  const handleClick = useCallback((e) => {
    const count = 6 + Math.floor(Math.random() * 4)
    const id = idRef.current++
    const particles = Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5,
      distance: 30 + Math.random() * 40,
      size: 3 + Math.random() * 4,
      color: ['#a855f7', '#22d3ee', '#f43f5e', '#22c55e', '#fbbf24'][Math.floor(Math.random() * 5)],
    }))

    setBursts(prev => [...prev, { id, x: e.clientX, y: e.clientY, particles }])
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== id))
    }, 600)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-auto"
      onClick={handleClick}
      style={{ cursor: 'default' }}
    >
      {bursts.map(burst => (
        <div key={burst.id} className="fixed inset-0 pointer-events-none">
          {burst.particles.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full animate-[burst_0.6s_ease-out_forwards]"
              style={{
                left: burst.x,
                top: burst.y,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                '--tx': `${Math.cos(p.angle) * p.distance}px`,
                '--ty': `${Math.sin(p.angle) * p.distance}px`,
              }}
            />
          ))}
        </div>
      ))}
      <style>{`
        @keyframes burst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
