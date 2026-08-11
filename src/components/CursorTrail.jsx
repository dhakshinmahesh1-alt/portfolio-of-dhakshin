import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const canvasRef = useRef(null)
  const pointsRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
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
      mouseRef.current = { x: e.clientX, y: e.clientY }
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        hue: hueRef.current,
      })
      hueRef.current = (hueRef.current + 2) % 360
      if (pointsRef.current.length > 50) pointsRef.current.shift()
    }

    window.addEventListener('mousemove', handleMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pts = pointsRef.current
      for (let i = pts.length - 1; i >= 0; i--) {
        pts[i].age++
        if (pts[i].age > 20) {
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
        const life = 1 - p1.age / 20
        const width = life * 4

        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.strokeStyle = `hsla(${p1.hue}, 80%, 60%, ${life * 0.7})`
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
