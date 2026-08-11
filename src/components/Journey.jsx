import { motion } from 'framer-motion'

const milestones = [
  {
    year: '2023',
    title: 'Started Exploring Electronics',
    description: 'Took apart old toys and appliances — discovered how motors, gears, and circuits work.',
    icon: '🔧',
  },
  {
    year: '2024',
    title: 'Built First RC Project',
    description: 'Assembled and modified my first RC car — learned about motors, batteries, and wiring.',
    icon: '🏎️',
  },
  {
    year: '2024',
    title: 'Started LED Projects',
    description: 'Put LED strips everywhere — my room, my bike, and custom project installations.',
    icon: '💡',
  },
  {
    year: '2025',
    title: 'Started Programming',
    description: 'Discovered vibecoding with AI — built my first web apps and AI tools.',
    icon: '💻',
  },
  {
    year: '2026',
    title: 'Building Bigger Projects',
    description: 'Multiple AI apps, portfolio site, advanced RC cars — pushing boundaries every day.',
    icon: '🚀',
  },
]

export default function Journey() {
  return (
    <section id="journey" className="py-32 px-6 bg-[#f0f0f0] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">My Journey</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 tracking-tight">How I got here</h2>
        <p className="text-text-secondary text-sm mb-14 max-w-md">
          From taking apart toys to building real projects — here's the story so far.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex items-start gap-6 mb-10 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot on timeline */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-text border-4 border-[#f0f0f0] z-10" />

              {/* Year badge */}
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-14 md:pl-0`}>
                <span className="inline-block text-xs font-bold text-muted bg-white px-3 py-1 rounded-full border border-border/50 mb-2">
                  {m.year}
                </span>
              </div>

              {/* Content card */}
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-14 md:pl-0`}>
                <div className="bg-white rounded-2xl border border-border/50 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{m.icon}</span>
                    <h3 className="text-sm font-bold text-text">{m.title}</h3>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{m.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
