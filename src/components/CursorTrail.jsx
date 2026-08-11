import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const canvasRef = useRef(null)
  const pointsRef = useRef([])
  const hueRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animFrame

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMove = (e) => {
      hueRef.current = (hueRef.current + 1.5) % 360
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        hue: hueRef.current,
      })
      // Keep only last 20 points — shorter trail
      if (pointsRef.current.length > 20) pointsRef.current.shift()
    }

    window.addEventListener('mousemove', handleMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pts = pointsRef.current
      for (let i = pts.length - 1; i >= 0; i--) {
        pts[i].age++
        if (pts[i].age > 15) {
          pts.splice(i, 1)
        }
      }

      if (pts.length < 2) {
        animFrame = requestAnimationFrame(draw)
        return
      }

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1]
        const p1 = pts[i]
        const life = 1 - p1.age / 15
        const width = life * 3

        // Smooth curve through points
        const mx = (p0.x + p1.x) / 2
        const my = (p0.y + p1.y) / 2

        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.quadraticCurveTo(p0.x, p0.y, mx, my)
        ctx.strokeStyle = `hsla(${p1.hue}, 70%, 60%, ${life * 0.5})`
        ctx.lineWidth = width
        ctx.stroke()
      }

      animFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  )
}
