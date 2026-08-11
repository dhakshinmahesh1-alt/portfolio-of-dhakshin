import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'play', label: 'Play' },
  { id: 'funfacts', label: 'Facts' },
  { id: 'contact', label: 'Contact' },
]

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <motion.div
        className="h-full rounded-r-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #a855f7, #22d3ee, #f43f5e, #22c55e, #fbbf24)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

export function SectionNav() {
  const [active, setActive] = useState('hero')
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3">
      {sections.map(({ id, label }) => (
        <div key={id} className="relative flex items-center">
          <AnimatePresence>
            {hovered === id && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-6 text-[10px] text-muted bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm border border-border/50 whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
          <a
            href={`#${id}`}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            className="block"
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                active === id
                  ? 'bg-text scale-125'
                  : 'bg-border hover:bg-muted'
              }`}
            />
          </a>
        </div>
      ))}
    </div>
  )
}
