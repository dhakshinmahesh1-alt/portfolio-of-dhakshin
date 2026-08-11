import { motion } from 'framer-motion'

const learningItems = [
  { icon: '🤖', label: 'Robotics', level: 60, color: '#ef4444', detail: 'Building automated systems with motors and sensors' },
  { icon: '💻', label: 'Web Development', level: 65, color: '#a855f7', detail: 'React, Tailwind, building apps and websites' },
  { icon: '⚡', label: 'Electronics', level: 80, color: '#22d3ee', detail: 'Arduino, ESP32, circuit design, sensors' },
  { icon: '🧠', label: 'AI & APIs', level: 70, color: '#22c55e', detail: 'Claude API, OpenAI, prompt engineering' },
  { icon: '🖨️', label: '3D Design', level: 30, color: '#f59e0b', detail: 'Tinkercad, basic CAD modeling' },
  { icon: '🐍', label: 'Python', level: 35, color: '#ec4899', detail: 'Scripting, automation, data basics' },
]

export default function Learning() {
  return (
    <section id="learning" className="py-32 px-6 bg-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">Currently Learning</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 tracking-tight">What's on my desk right now</h2>
        <p className="text-text-secondary text-sm mb-12 max-w-md">
          Always picking up new skills — these are the things I'm actively working on.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {learningItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl bg-[#f0f0f0] border border-border/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-text">{item.label}</p>
                  <p className="text-[10px] text-muted">{item.detail}</p>
                </div>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <p className="text-[10px] text-muted mt-1.5 text-right font-mono">{item.level}%</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
