import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const details = [
  {
    icon: '🔩',
    title: 'Fixing Broken Stuff',
    short: 'How I approach repairs',
    content: 'I start by opening it up, identifying what broke, then figure out how to fix it with what I have. Hot glue and tape solve 90% of problems. The rest needs actual replacement parts.',
  },
  {
    icon: '⚡',
    title: 'LED Wiring',
    short: 'How I wire LED strips',
    content: 'Just 3 wires: 5V (red), Data (green), Ground (black). Connect to any 5V power source. Use a phone charger or USB cable. Data goes to any microcontroller pin.',
  },
  {
    icon: '🏎️',
    title: 'RC Car Mods',
    short: 'My modification process',
    content: 'Start by opening the car, see what motor it uses, then swap for a faster one. Add better wheels, tune the steering. The best mod is just adding a bigger battery.',
  },
  {
    icon: '🔧',
    title: 'My Real Tools',
    short: 'What I actually use',
    content: 'Scissors, screwdrivers, electrical tape, hot glue gun, and whatever I can find around the house. No fancy equipment — just creativity and whatever works.',
  },
  {
    icon: '💡',
    title: 'LED Patterns',
    short: 'My favorite effects',
    content: 'Breathing pulse, rainbow chase, music reactive, fire effect. Most cheap LED strips from Amazon come with a remote that already has these built in.',
  },
  {
    icon: '🧰',
    title: 'Junk → treasure',
    short: 'How I find parts',
    content: 'Broken toys, old electronics, dead fans, discarded gadgets — I take them apart for motors, gears, wheels, wires, and plastic parts. Free components everywhere.',
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
                ? 'bg-white border-text/20 shadow-lg shadow-text/5'
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
