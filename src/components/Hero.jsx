import { ArrowDown, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { GitHubIcon, LinkedInIcon } from './Icons'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-3xl"
      >
        <p className="text-accent font-mono text-sm mb-4 tracking-wider uppercase">
          Developer &amp; Builder
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Dhakshin{' '}
          <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
            Mahesh
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          I build things that work — from IoT systems and drones to AI tools and full-stack apps.
          Currently exploring the edge of hardware and software.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-light transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl border border-border text-white font-medium hover:bg-surface-3 transition-colors"
          >
            Get in Touch
          </a>
        </div>

        <div className="flex items-center justify-center gap-5">
          <a href="https://github.com/agni-007" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors"><GitHubIcon /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors"><LinkedInIcon /></a>
          <a href="mailto:dhakshin@example.com" className="text-muted hover:text-white transition-colors"><Mail size={20} /></a>
        </div>
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted animate-bounce"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  )
}
