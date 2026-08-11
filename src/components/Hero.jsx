import { ArrowDown, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { GitHubIcon, LinkedInIcon } from './Icons'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-2xl"
      >
        <p className="text-muted font-mono text-xs mb-6 tracking-widest uppercase">
          The Hardwarer
        </p>
        <h1 className="text-6xl md:text-8xl font-bold text-text leading-none mb-8 tracking-tight">
          Dhakshin
          <br />
          <span className="text-muted">Mahesh</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary max-w-md mx-auto mb-12 leading-relaxed">
          13-year-old student who loves tinkering with hardware — RC cars, LED strips,
          motors, and fixing broken stuff.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-light transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-border text-text text-sm font-medium hover:bg-surface-3 transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a href="https://github.com/agni-007" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors"><GitHubIcon /></a>
          <a href="https://linkedin.com/in/dhakshin-mahesh" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors"><LinkedInIcon /></a>
          <a href="mailto:dhakshinmahesh1@gmail.com" className="text-muted hover:text-text transition-colors"><Mail size={18} /></a>
        </div>
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted animate-bounce"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  )
}
