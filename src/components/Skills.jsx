import { motion } from 'framer-motion'
import { Gear, Wrench, Lightbulb, Soldering, Resistor } from './Illustrations'
import SkillBars from './SkillBars'

const categories = [
  { category: 'Vibecoding', items: ['Claude Code', 'Codex', 'OpenCode', 'AI-Assisted Coding'] },
  { category: 'Hardware', items: ['LED Strips', 'RC Cars', 'Motors', 'Soldering', 'Circuit Building', 'Repairing'] },
  { category: 'Platforms', items: ['Vercel', 'GitHub', 'Firebase', 'Supabase'] },
  { category: 'AI / APIs', items: ['OpenAI API', 'Claude API', 'REST APIs', 'Prompt Engineering'] },
  { category: 'Interests', items: ['RC Cars', 'LED Projects', 'Drones', 'IoT'] },
  { category: 'Life', items: ['Skating', 'Cycling', 'Tinkering', 'Fixing Stuff'] },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.1 }} viewport={{ once: true }} className="absolute top-12 right-[8%] rotate-30">
          <Wrench size={80} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.08 }} viewport={{ once: true }} className="absolute bottom-20 left-[5%] -rotate-15">
          <Lightbulb size={60} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.07 }} viewport={{ once: true }} className="absolute top-[50%] left-[2%] rotate-45">
          <Soldering size={50} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.06 }} viewport={{ once: true }} className="absolute bottom-[10%] right-[4%] -rotate-40">
          <Resistor size={45} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">Skills</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 tracking-tight">What I work with</h2>
        <p className="text-text-secondary text-sm mb-12 max-w-md">
          I don't write code the traditional way — I vibe it into existence with AI.
        </p>

        {/* Animated skill bars */}
        <div className="mb-12">
          <SkillBars />
        </div>

        {/* Skill category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((s, i) => (
            <motion.div
              key={s.category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#f0f0f0] border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xs font-semibold text-muted mb-3 uppercase tracking-wider">{s.category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-white text-text-secondary border border-border/50 hover:border-accent/30 hover:text-text transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
