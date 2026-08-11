import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Projects Built', value: 12, suffix: '+', color: '#ef4444' },
  { label: 'Experiments Done', value: 25, suffix: '+', color: '#a855f7' },
  { label: 'Components Learned', value: 15, suffix: '+', color: '#22d3ee' },
  { label: 'Years Exploring Tech', value: 3, suffix: '+', color: '#22c55e' },
]

function AnimatedCounter({ value, suffix, duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = value / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [started, value, duration])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 px-6 bg-[#f0f0f0] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div style={{ color: s.color }}>
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-xs text-muted mt-2 font-semibold uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
