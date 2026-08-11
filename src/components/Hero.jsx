import { ArrowDown, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { GitHubIcon, LinkedInIcon } from './Icons'
import { PaperPlane, Pencil, Motor, Gear, Lightbulb, Chip, Wrench } from './Illustrations'

const float = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 bg-[#f0f0f0] overflow-hidden">
      {/* Background illustrations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.35, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute top-[12%] left-[8%]"
        >
          <PaperPlane size={80} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 15 }}
          animate={{ opacity: 0.3, rotate: 12 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-[18%] right-[12%]"
        >
          <Pencil size={70} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 0.25, rotate: -15 }}
          transition={{ duration: 1.1, delay: 0.6 }}
          className="absolute bottom-[20%] left-[12%]"
        >
          <Motor size={90} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 30 }}
          animate={{ opacity: 0.3, rotate: 25 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-[35%] left-[3%]"
        >
          <Gear size={55} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 0.35, rotate: 5 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute bottom-[15%] right-[8%]"
        >
          <Lightbulb size={75} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 10 }}
          animate={{ opacity: 0.25, rotate: 8 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-[60%] right-[5%]"
        >
          <Chip size={60} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: -25 }}
          animate={{ opacity: 0.3, rotate: -20 }}
          transition={{ duration: 1.1, delay: 0.8 }}
          className="absolute bottom-[35%] left-[25%]"
        >
          <PaperPlane size={50} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 0.2, rotate: 15 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute top-[8%] left-[45%]"
        >
          <Wrench size={65} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: -15 }}
          animate={{ opacity: 0.25, rotate: -10 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-[10%] right-[30%]"
        >
          <Gear size={45} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-[50%] left-[35%]"
        >
          <Pencil size={40} />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
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
            className="px-6 py-3 rounded-full bg-text text-white text-sm font-medium hover:bg-text/80 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-border text-text text-sm font-medium hover:bg-white transition-colors"
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
