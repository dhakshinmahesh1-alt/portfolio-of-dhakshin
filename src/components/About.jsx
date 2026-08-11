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
              I'm Dhakshin — a 13-year-old student at St. Paul's International School in Kochi, Kerala.
              I love hardware — repairing broken stuff, building new things, and tinkering with RC cars,
              LED strips, and motors.
            </p>
            <p>
              When I'm not soldering circuits, I build AI apps and web tools. I also enjoy skating
              (it's actually a subject at school!) and cycling. Oh, and my favorite color is black.
            </p>
            <p>
              This portfolio is where I showcase the things I've built — from hardware projects
              to AI apps and web tools. Most of my hardware work wasn't photographed, so you'll
              mostly see my software projects here.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Name', value: 'Dhakshin Mahesh' },
              { label: 'Age', value: '13 years old' },
              { label: 'School', value: "St. Paul's International School" },
              { label: 'Class', value: '7th Standard' },
              { label: 'Location', value: 'Kochi, Kerala, India' },
              { label: 'Focus', value: 'Hardware, AI Apps, Web Tools' },
              { label: 'Hobbies', value: 'Skating, Cycling, Tinkering' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm text-muted">{item.label}</span>
                <span className="text-sm text-white font-medium text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
