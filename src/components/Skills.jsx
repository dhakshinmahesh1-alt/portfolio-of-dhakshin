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
    <section id="skills" className="py-24 px-6 bg-surface-2/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <p className="text-accent font-mono text-sm mb-3 tracking-wider uppercase">Skills</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          What I work with
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s, i) => (
            <motion.div
              key={s.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-surface border border-border rounded-xl p-5 hover:border-accent/30 transition-colors"
            >
              <h3 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">
                {s.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-full bg-surface-3 text-gray-300 border border-border/50"
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
