import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <p className="text-accent font-mono text-sm mb-3 tracking-wider uppercase">About</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          A bit about me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              I'm Dhakshin — a developer who likes building things from scratch. Whether it's
              a gesture-controlled drone, a Raspberry Pi game, or a full-stack web app, I enjoy
              the process of turning ideas into working products.
            </p>
            <p>
              My interests span across IoT, embedded systems, AI/ML, and web development.
              I've participated in hackathons and built projects that solve real problems —
              from smart home automation to accessibility tools.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Focus', value: 'IoT, AI/ML, Full-Stack' },
              { label: 'Stack', value: 'React, Python, Flutter, Arduino' },
              { label: 'Location', value: 'India' },
              { label: 'Status', value: 'Building & Learning' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm text-muted">{item.label}</span>
                <span className="text-sm text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
