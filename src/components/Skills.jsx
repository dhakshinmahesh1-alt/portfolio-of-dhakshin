import { motion } from 'framer-motion'

const skills = [
  {
    category: 'Hardware',
    items: ['LED Strips', 'RC Cars', 'Motors', 'Soldering', 'Circuit Building', 'Repairing'],
  },
  {
    category: 'Languages',
    items: ['Python', 'JavaScript', 'HTML/CSS', 'Dart'],
  },
  {
    category: 'Frameworks',
    items: ['React', 'Flutter', 'Node.js', 'Tailwind CSS'],
  },
  {
    category: 'AI / APIs',
    items: ['OpenAI API', 'REST APIs', 'AI App Building'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Vercel', 'VS Code', 'Figma'],
  },
  {
    category: 'Other',
    items: ['Skating', 'Cycling', 'Tinkering', 'Fixing Stuff'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-surface-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">Skills</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 tracking-tight">
          What I work with
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xs font-semibold text-muted mb-3 uppercase tracking-wider">
                {s.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-full bg-surface-2 text-text-secondary border border-border/50"
                  >
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
