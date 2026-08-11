import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gear, Lightbulb } from './Illustrations'
import { RandomQuote, RandomFact } from './RandomContent'
import ExpandableDetails from './ExpandableDetails'
import ToolBelt from './ToolBelt'

const facts = [
  { icon: '🔧', title: 'Fixer', text: 'I fix broken fans, toys, remotes, and anything with a motor or wire.' },
  { icon: '🏎️', title: 'RC Cars', text: 'I have built and modified multiple RC cars from scratch.' },
  { icon: '💡', title: 'LED Addict', text: 'I love putting LED strips everywhere — my room, my bike, my projects.' },
  { icon: '🎮', title: 'Game Dev', text: 'I built a rhythm game that runs on a Raspberry Pi Pico with LEDs.' },
  { icon: '🧰', title: 'Junk Collector', text: 'I keep broken electronics for parts — motors, gears, wires, wheels.' },
  { icon: '⚡', title: 'Power Tools', text: 'I can fix anything with a motor — fans, toys, even kitchen appliances.' },
]

export default function FunFacts() {
  const [open, setOpen] = useState(null)

  return (
    <section id="funfacts" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.1 }} viewport={{ once: true }} className="absolute top-8 right-[5%] rotate-20">
          <Gear size={60} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.08 }} viewport={{ once: true }} className="absolute bottom-8 left-[3%] -rotate-10">
          <Lightbulb size={50} />
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">Fun Facts</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-10 tracking-tight">Things you didn't know</h2>

        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {facts.map((f, i) => (
            <motion.button
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setOpen(open === i ? null : i)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                open === i
                  ? 'bg-accent/5 border-accent/20 shadow-md'
                  : 'bg-[#f0f0f0] border-border/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{f.icon}</span>
                <span className="text-sm font-semibold text-text">{f.title}</span>
              </div>
              {open === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="text-sm text-text-secondary mt-2 overflow-hidden leading-relaxed"
                >
                  {f.text}
                </motion.p>
              )}
            </motion.button>
          ))}
        </div>

        <div className="mb-10">
          <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">My Toolkit</p>
          <ToolBelt />
        </div>

        <div className="mb-10">
          <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">How I Work</p>
          <ExpandableDetails />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <RandomQuote />
          <RandomFact />
        </div>
      </div>
    </section>
  )
}
