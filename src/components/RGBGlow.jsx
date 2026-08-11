import { useEffect, useRef } from 'react'

export default function RGBGlow() {
  const ref = useRef(null)

  useEffect(() => {
    let frame
    let hue = 0
    const animate = () => {
      hue = (hue + 0.5) % 360
      if (ref.current) {
        ref.current.style.background = `linear-gradient(${hue}deg, 
          hsla(${hue}, 80%, 60%, 0.08),
          hsla(${(hue + 120) % 360}, 80%, 60%, 0.08),
          hsla(${(hue + 240) % 360}, 80%, 60%, 0.08)
        )`
      }
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none transition-all duration-100"
      style={{ borderRadius: 'inherit' }}
    />
  )
}

export function RGBBorder({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    let frame
    let hue = 0
    const animate = () => {
      hue = (hue + 0.8) % 360
      if (ref.current) {
        ref.current.style.background = `linear-gradient(${hue}deg, 
          hsla(${hue}, 70%, 55%, 0.3),
          hsla(${(hue + 120) % 360}, 70%, 55%, 0.3),
          hsla(${(hue + 240) % 360}, 70%, 55%, 0.3)
        )`
      }
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className={`relative p-[2px] rounded-2xl ${className}`}>
      <div ref={ref} className="absolute inset-0 rounded-2xl" />
      <div className="relative bg-white rounded-2xl">
        {children}
      </div>
    </div>
  )
}
