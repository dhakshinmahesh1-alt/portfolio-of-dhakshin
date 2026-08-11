import { useEffect, useRef } from 'react'

const SHAPES = [
  // Paper plane
  (ctx, x, y, s, o) => {
    ctx.globalAlpha = o
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + s * 1.2, y - s * 0.3)
    ctx.lineTo(x + s * 0.4, y + s * 0.2)
    ctx.closePath()
    ctx.stroke()
  },
  // Gear
  (ctx, x, y, s, o) => {
    ctx.globalAlpha = o
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 1.2
    const teeth = 6
    ctx.beginPath()
    for (let i = 0; i < teeth * 2; i++) {
      const angle = (i * Math.PI) / teeth
      const r = i % 2 === 0 ? s * 0.5 : s * 0.35
      ctx.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r)
    }
    ctx.closePath()
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x, y, s * 0.15, 0, Math.PI * 2)
    ctx.stroke()
  },
  // Lightbulb
  (ctx, x, y, s, o) => {
    ctx.globalAlpha = o
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.arc(x, y - s * 0.1, s * 0.3, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x - s * 0.15, y + s * 0.2)
    ctx.lineTo(x + s * 0.15, y + s * 0.2)
    ctx.stroke()
  },
  // Motor
  (ctx, x, y, s, o) => {
    ctx.globalAlpha = o
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.arc(x, y, s * 0.35, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x, y, s * 0.12, 0, Math.PI * 2)
    ctx.stroke()
    // Wires
    ctx.beginPath()
    ctx.moveTo(x, y - s * 0.35)
    ctx.lineTo(x, y - s * 0.5)
    ctx.moveTo(x, y + s * 0.35)
    ctx.lineTo(x, y + s * 0.5)
    ctx.stroke()
  },
  // LED (small circle with glow)
  (ctx, x, y, s, o) => {
    ctx.globalAlpha = o * 0.6
    const colors = ['#a855f7', '#22d3ee', '#f43f5e', '#22c55e', '#fbbf24']
    const c = colors[Math.floor(x * 10) % colors.length]
    ctx.fillStyle = c
    ctx.beginPath()
    ctx.arc(x, y, s * 0.2, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = o * 0.15
    ctx.beginPath()
    ctx.arc(x, y, s * 0.5, 0, Math.PI * 2)
    ctx.fill()
  },
  // Resistor
  (ctx, x, y, s, o) => {
    ctx.globalAlpha = o
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x - s * 0.4, y)
    ctx.lineTo(x - s * 0.25, y)
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(x - s * 0.2 + i * s * 0.12, y + (i % 2 === 0 ? -s * 0.12 : s * 0.12))
    }
    ctx.lineTo(x + s * 0.25, y)
    ctx.lineTo(x + s * 0.4, y)
    ctx.stroke()
  },
  // Screw
  (ctx, x, y, s, o) => {
    ctx.globalAlpha = o
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.arc(x, y, s * 0.25, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x - s * 0.15, y)
    ctx.lineTo(x + s * 0.15, y)
    ctx.moveTo(x, y - s * 0.15)
    ctx.lineTo(x, y + s * 0.15)
    ctx.stroke()
  },
]

export default function FloatingParticles() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = window.innerWidth
    let h = document.documentElement.scrollHeight

    const resize = () => {
      w = window.innerWidth
      h = document.documentElement.scrollHeight
      canvas.width = w
      canvas.height = h
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    const count = Math.min(Math.floor((w * h) / 25000), 60)
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 20 + Math.random() * 35,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -0.15 - Math.random() * 0.2,
      opacity: 0.06 + Math.random() * 0.1,
      shape: Math.floor(Math.random() * SHAPES.length),
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particlesRef.current) {
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotSpeed

        if (p.y < -50) { p.y = h + 50; p.x = Math.random() * w }
        if (p.x < -50) p.x = w + 50
        if (p.x > w + 50) p.x = -50

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.translate(-p.x, -p.y)
        SHAPES[p.shape](ctx, p.x, p.y, p.size, p.opacity)
        ctx.restore()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}
