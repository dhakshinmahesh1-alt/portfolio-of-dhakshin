import { motion } from 'framer-motion'
import { Gear, Lightbulb, Resistor, Motor, Screw, Bolt } from './Illustrations'

const experiments = [
  {
    number: '07',
    title: 'LED Music Light',
    goal: 'Make an LED strip react to sound',
    materials: ['LED Strip', 'Sound Sensor', 'Arduino', 'Wires'],
    tried: ['Connected sound sensor to Arduino', 'Programmed LED strip to pulse with sound', 'Tried different sensitivity levels'],
    result: 'LED strip pulses with music beats — works great in dark rooms!',
    learned: 'Sound sensors are noisy — need to filter the signal for clean reactions.',
  },
  {
    number: '06',
    title: 'Remote Control Switch',
    goal: 'Control a fan with a remote',
    materials: ['IR Remote', 'IR Receiver', 'Relay Module', 'Fan', 'Arduino'],
    tried: ['Wired IR receiver to Arduino', 'Mapped remote buttons to relay', 'Connected relay to fan circuit'],
    result: 'Fan turns on/off with remote press — no more getting up!',
    learned: 'Relays can handle high voltage, but always double-check wiring before powering on.',
  },
  {
    number: '05',
    title: 'Line Following Robot',
    goal: 'Build a robot that follows a black line',
    materials: ['Chassis', '2 DC Motors', 'IR Sensors', 'Arduino', 'Wheels'],
    tried: ['Mounted IR sensors at the front', 'Wrote motor control logic', 'Tested on white surface with black tape'],
    result: 'Robot follows the line but sometimes overshoots on sharp turns.',
    learned: 'PID control would help — need to learn it for smoother turns.',
  },
  {
    number: '04',
    title: 'Automatic Night Light',
    goal: 'LED turns on automatically when it gets dark',
    materials: ['LDR Sensor', 'LED', 'Arduino', 'Resistor'],
    tried: ['Connected LDR to analog pin', 'Set threshold value for light level', 'Wired LED to digital pin'],
    result: 'Works perfectly — LED turns on at dusk, off at dawn.',
    learned: 'LDRs are simple but effective — great for learning analog input.',
  },
]

export default function Experiments() {
  return (
    <section id="experiments" className="py-32 px-6 bg-[#f0f0f0] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.1 }} viewport={{ once: true }} className="absolute top-10 right-[5%] rotate-20">
          <Gear size={60} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.08 }} viewport={{ once: true }} className="absolute bottom-10 left-[3%] -rotate-15">
          <Lightbulb size={50} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">My Experiments</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 tracking-tight">Lab notebook</h2>
        <p className="text-text-secondary text-sm mb-14 max-w-md">
          Not every project is perfect. Here's what I tried, what worked, and what I learned.
        </p>

        <div className="space-y-6">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
            >
              {/* Header */}
              <div className="px-6 py-3 rgb-header flex items-center justify-between">
                <span className="text-white/70 font-mono text-xs">EXPERIMENT #{exp.number}</span>
                <span className="text-white/60 text-[10px] uppercase tracking-wider">Lab Notes</span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-text mb-4">{exp.title}</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left column */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-1">Goal</p>
                      <p className="text-sm text-text-secondary">{exp.goal}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-1">Materials</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.materials.map((m) => (
                          <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-2 text-text-secondary border border-border/30">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-1">What I Tried</p>
                      <ul className="space-y-1">
                        {exp.tried.map((t, j) => (
                          <li key={j} className="text-sm text-text-secondary flex items-start gap-2">
                            <span className="text-muted mt-1">→</span> {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200/50">
                      <p className="text-xs text-green-700 font-semibold uppercase tracking-wider mb-1">Result ✓</p>
                      <p className="text-sm text-green-800">{exp.result}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/50">
                      <p className="text-xs text-blue-700 font-semibold uppercase tracking-wider mb-1">What I Learned</p>
                      <p className="text-sm text-blue-800">{exp.learned}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
