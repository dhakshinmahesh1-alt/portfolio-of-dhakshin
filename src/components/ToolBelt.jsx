import { useState } from 'react'
import { motion } from 'framer-motion'

const tools = [
  { name: 'Scissors', icon: '✂️', desc: 'Cut wires, trim insulation, strip cables — my most used tool' },
  { name: 'Screwdrivers', icon: '🪛', desc: 'Phillips and flathead set — opens anything from toys to electronics' },
  { name: 'Screws', icon: '🔩', desc: 'M2, M3, M4 assorted — I keep every screw I find from broken stuff' },
  { name: 'Tape', icon: '📎', desc: 'Electrical tape + masking tape — insulate connections, hold things together' },
  { name: 'Wire Cutters', icon: '🔧', desc: 'Flush cutters for clean cuts on component leads and wires' },
  { name: 'Hot Glue Gun', icon: '🧴', desc: 'Quick mounting, insulating, and fixing broken plastic parts' },
  { name: 'Sandpaper', icon: '📄', desc: 'Smooth rough edges on 3D prints and cut plastic' },
  { name: 'Ruler', icon: '📏', desc: 'Measure twice, cut once — essential for any project' },
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
                ? 'bg-text text-white border-text shadow-md'
                : 'bg-white border-border text-text hover:border-text/30 hover:shadow-sm'
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
