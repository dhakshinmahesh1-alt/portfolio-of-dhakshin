import { motion } from 'framer-motion'
import { Gear, Wrench, Lightbulb, Soldering, Resistor, Chip, Screw, Bolt } from './Illustrations'

const skillCategories = [
  {
    title: 'Electronics',
    icon: '⚡',
    color: '#ef4444',
    items: [
      { name: 'Arduino', level: 70 },
      { name: 'ESP32', level: 50 },
      { name: 'Sensors', level: 65 },
      { name: 'Motors', level: 80 },
      { name: 'LEDs', level: 90 },
      { name: 'Breadboards', level: 75 },
      { name: 'Soldering', level: 85 },
      { name: 'Circuit Design', level: 70 },
    ],
  },
  {
    title: 'Programming',
    icon: '💻',
    color: '#a855f7',
    items: [
      { name: 'HTML', level: 60 },
      { name: 'CSS', level: 55 },
      { name: 'JavaScript', level: 50 },
      { name: 'Python', level: 40 },
      { name: 'Arduino/C++', level: 65 },
    ],
  },
  {
    title: 'Platforms',
    icon: '🌐',
    color: '#22d3ee',
    items: [
      { name: 'GitHub', level: 75 },
      { name: 'Vercel', level: 80 },
      { name: 'Firebase', level: 45 },
      { name: 'Supabase', level: 40 },
    ],
  },
  {
    title: 'AI & APIs',
    icon: '🤖',
    color: '#22c55e',
    items: [
      { name: 'Claude API', level: 70 },
      { name: 'OpenAI API', level: 65 },
      { name: 'REST APIs', level: 60 },
      { name: 'Prompt Engineering', level: 85 },
    ],
  },
  {
    title: 'Tools',
    icon: '🛠️',
    color: '#f59e0b',
    items: [
      { name: 'VS Code', level: 60 },
      { name: 'Tinkercad', level: 55 },
      { name: 'Wire Cutters', level: 90 },
      { name: 'Screwdrivers', level: 85 },
      { name: 'Scissors', level: 95 },
      { name: 'Hot Glue Gun', level: 90 },
    ],
  },
  {
    title: 'Life',
    icon: '🌟',
    color: '#ec4899',
    items: [
      { name: 'Skating', level: 80 },
      { name: 'Cycling', level: 75 },
      { name: 'Tinkering', level: 95 },
      { name: 'Fixing Stuff', level: 90 },
    ],
  },
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
        className="max-w-4xl mx-auto relative z-10"
      >
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">Skills & Tools</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 tracking-tight">What I work with</h2>
        <p className="text-text-secondary text-sm mb-12 max-w-md">
          I don't write code the traditional way — I vibe it into existence with AI. But I know my way around hardware.
        </p>

        {/* Skill category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#f0f0f0] border border-border/50 rounded-2xl p-5 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{cat.icon}</span>
                <h3 className="text-sm font-bold text-text">{cat.title}</h3>
              </div>
              <div className="space-y-2.5">
                {cat.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-secondary">{item.name}</span>
                      <span className="text-[10px] text-muted font-mono">{item.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
