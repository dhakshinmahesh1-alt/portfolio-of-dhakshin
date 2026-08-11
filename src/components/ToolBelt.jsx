import { useState } from 'react'
import { motion } from 'framer-motion'

const tools = [
  { name: 'TS101 Iron', icon: '🔧', desc: 'My soldering iron — 320°C, portable, USB-C powered' },
  { name: 'Multimeter', icon: '📊', desc: 'FNIRSI DMT-99 — measures voltage, current, resistance' },
  { name: 'Wire Stripper', icon: '✂️', desc: 'Mini automatic wire stripper — handles 24-30 AWG' },
  { name: 'Helping Hands', icon: '🤝', desc: 'Magnifier + alligator clips — holds PCBs while soldering' },
  { name: 'Flux Paste', icon: '🧴', desc: 'Amtech NC-559-V2 — makes solder flow like butter' },
  { name: 'Solder Wick', icon: '🧵', desc: 'Desoldering braid — fixes mistakes cleanly' },
  { name: 'ESP32', icon: '🧠', desc: 'Dual-core 240MHz — my go-to microcontroller' },
  { name: 'NeoPixels', icon: '💡', desc: 'WS2812B addressable LEDs — 16.7M colors each' },
  { name: 'Oscilloscope', icon: '📈', desc: 'See signal waveforms — debug I2C, SPI, PWM' },
  { name: '3D Printer', icon: '🖨️', desc: 'Custom parts — motor mounts, enclosures, gears' },
]

export default function ToolBelt() {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tools.map((t, i) => (
          <motion.button
            key={t.name}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
              selected === i
                ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                : 'bg-white border-border text-text hover:border-accent/30 hover:shadow-sm'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.name}</span>
          </motion.button>
        ))}
      </div>
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-border rounded-xl p-4 shadow-sm"
        >
          <p className="text-xs text-text-secondary leading-relaxed">
            <span className="text-base mr-2">{tools[selected].icon}</span>
            <strong className="text-text">{tools[selected].name}:</strong>{' '}
            {tools[selected].desc}
          </p>
        </motion.div>
      )}
    </div>
  )
}
