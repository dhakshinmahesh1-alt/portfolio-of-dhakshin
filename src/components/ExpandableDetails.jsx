import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const details = [
  {
    icon: '🔩',
    title: 'How I Solder',
    short: 'My soldering technique',
    content: 'I use a TS101 soldering iron at 320°C for lead-free solder. For SMD components, I use the drag soldering method with flux. The key is patience — heat the pad, not the component.',
  },
  {
    icon: '⚡',
    title: 'LED Wiring',
    short: 'How I wire LED strips',
    content: 'WS2812B strips need 3 wires: 5V, Data, and Ground. I always add a 330Ω resistor on the data line and a 1000µF capacitor across power. For long runs, inject power every 50 LEDs.',
  },
  {
    icon: '🏎️',
    title: 'RC Car Mods',
    short: 'My modification process',
    content: 'I start with a brushed motor car, swap to brushless, upgrade the ESC, add a gyro for stability, and 3D print custom body shells. My fastest car hits 60km/h!',
  },
  {
    icon: '🔧',
    title: 'Tools I Use',
    short: 'Essential hardware toolkit',
    content: 'TS101 soldering iron, FNIRSI multimeter, mini wire stripper, helping hands with magnifier, flux paste, solder wick, and a cheap oscilloscope. Total cost: under ₹5000.',
  },
  {
    icon: '💡',
    title: 'LED Patterns',
    short: 'My favorite effects',
    content: 'Rainbow chase, breathing pulse, music reactive (using MSGEQ7), fire simulation, and matrix rain. All controlled via ESP32 with WLED firmware.',
  },
  {
    icon: '🤖',
    title: 'Drone Build',
    short: 'Gesture control system',
    content: 'ESP32 reads MPU6050 gyroscope data from a hand-mounted controller. Maps pitch/roll/yaw to motor speeds. Uses nRF24L01 for wireless communication at 2.4GHz.',
  },
]

export default function ExpandableDetails() {
  const [open, setOpen] = useState(null)

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {details.map((d, i) => (
        <motion.div
          key={d.title}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
              open === i
                ? 'bg-white border-accent/20 shadow-lg shadow-accent/5'
                : 'bg-[#f0f0f0] border-border/50 hover:shadow-md hover:border-border'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{d.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text">{d.title}</p>
                <p className="text-[11px] text-muted truncate">{d.short}</p>
              </div>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                className="text-muted text-lg shrink-0"
              >
                +
              </motion.span>
            </div>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-text-secondary mt-3 pt-3 border-t border-border/50 leading-relaxed">
                    {d.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      ))}
    </div>
  )
}
