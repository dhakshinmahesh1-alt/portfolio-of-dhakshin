import { useState, useEffect } from 'react'
import { Menu, X, Clock } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function ClockDisplay() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 border border-border/50 text-xs font-mono text-text">
      <Clock size={12} className="text-muted" />
      <span className="tabular-nums">{time}</span>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-base font-semibold text-text tracking-tight">
          <img src="/favicon.svg" alt="Logo" className="w-7 h-7 rounded-lg" />
          Dhakshin<span className="text-muted">.</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {/* Clock */}
          <ClockDisplay />
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-text transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/agni-007"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-full bg-accent text-white hover:bg-accent-light transition-all"
          >
            GitHub
          </a>
        </div>

        <button
          className="md:hidden text-text"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-border px-6 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-muted hover:text-text transition-colors border-b border-border/50 last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
