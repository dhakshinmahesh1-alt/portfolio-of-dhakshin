import { motion } from 'framer-motion'
import { PaperPlane, Motor, Screw, Bolt } from './Illustrations'

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
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">About</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-10 tracking-tight">A bit about me</h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            I'm Dhakshin — a 13-year-old student at St. Paul's International School in Kochi, Kerala.
            I love hardware — repairing broken stuff, building new things, and tinkering with RC cars,
            LED strips, and motors.
          </p>
          <p>
            When I'm not soldering circuits, I build AI apps and web tools. I also enjoy skating
            (it's actually a subject at school!) and cycling. Oh, and my favorite color is black.
          </p>
        </div>

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
