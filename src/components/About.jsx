import { motion } from 'framer-motion'
import { PaperPlane, Motor, Screw, Bolt, Gear, Lightbulb } from './Illustrations'

const highlights = [
  { icon: '🔧', label: 'Fixer', text: 'I repair broken fans, toys, remotes — anything with a motor or wire.' },
  { icon: '🏎️', label: 'RC Builder', text: 'Built and modified multiple RC cars from scratch with custom parts.' },
  { icon: '💡', label: 'LED Enthusiast', text: 'I put LED strips everywhere — my room, bikes, and projects.' },
  { icon: '🤖', label: 'Robot Tinkerer', text: 'Building robots and automated systems with motors and sensors.' },
]

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.15 }} viewport={{ once: true }} className="absolute top-10 right-[10%] rotate-12">
          <PaperPlane size={100} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.12 }} viewport={{ once: true }} className="absolute bottom-10 left-[5%] -rotate-20">
          <Motor size={80} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.1 }} viewport={{ once: true }} className="absolute top-[40%] left-[2%] rotate-30">
          <Screw size={35} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.08 }} viewport={{ once: true }} className="absolute bottom-[20%] right-[3%] -rotate-15">
          <Bolt size={30} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">About Me</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-10 tracking-tight">Who am I?</h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            Hi, I'm <strong className="text-text">Dhakshin</strong> — a 13-year-old student at St. Paul's International School
            in Kochi, Kerala. I love hardware — repairing broken stuff, building new things,
            and tinkering with RC cars, LED strips, and motors.
          </p>
          <p>
            I started exploring electronics a few years ago by taking apart old toys and appliances.
            What began as curiosity turned into a passion — now I build custom RC cars, wire up LED
            systems, and create projects that combine hardware with code.
          </p>
          <p>
            I use <strong className="text-text">Claude Code, Codex, and OpenCode</strong> for vibecoding — I don't
            write traditional code, I vibe it into existence with AI. When I'm not soldering circuits,
            I enjoy skating (it's actually a subject at school!) and cycling.
          </p>
          <p>
            <strong className="text-text">My goal:</strong> Keep building bigger and better projects, learn robotics
            and programming, and eventually create something that helps people.
          </p>
        </div>

        {/* Highlight cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-[#f0f0f0] border border-border/50"
            >
              <span className="text-2xl mt-0.5">{h.icon}</span>
              <div>
                <p className="text-sm font-semibold text-text">{h.label}</p>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{h.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Age', value: '13' },
            { label: 'Class', value: '7th' },
            { label: 'Location', value: 'Kochi' },
            { label: 'Focus', value: 'Hardware' },
          ].map((item) => (
            <div key={item.label} className="text-center p-5 rounded-2xl bg-[#f0f0f0] border border-border/50">
              <p className="text-2xl font-bold text-text">{item.value}</p>
              <p className="text-xs text-muted mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
