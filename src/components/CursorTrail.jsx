import { useEffect, useState, useRef } from 'react'

export default function CursorTrail() {
  const [particles, setParticles] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    let lastTime = 0
    const handleMove = (e) => {
      const now = Date.now()
      if (now - lastTime < 80) return
      lastTime = now

      const id = idRef.current++
      setParticles(prev => [...prev.slice(-12), {
        id,
        x: e.clientX,
        y: e.clientY,
      }])

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id))
      }, 800)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {particles.map((p, i) => (
        <svg
          key={p.id}
          className="absolute transition-all duration-700 ease-out"
          style={{
            left: p.x - 8,
            top: p.y - 8,
            opacity: 0.3 - i * 0.02,
            transform: `rotate(${i * 30}deg) scale(${0.6 + i * 0.03})`,
          }}
          width="16"
          height="16"
          viewBox="0 0 100 100"
        >
          <path
            d="M10 50L90 15L55 85L45 55L10 50Z"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="4"
          />
        </svg>
      ))}
    </div>
  )
}
