import { motion } from 'framer-motion'
import { Gear, Motor, Resistor, Screw, Bolt, Lightbulb, Wrench, Chip } from './Illustrations'

const galleryItems = [
  { icon: <Motor size={40} />, label: 'RC Car Motor', color: '#ef4444' },
  { icon: <Gear size={40} />, label: 'Gear Assembly', color: '#a855f7' },
  { icon: <Resistor size={40} />, label: 'Circuit Board', color: '#22d3ee' },
  { icon: <Screw size={40} />, label: 'Hardware Parts', color: '#22c55e' },
  { icon: <Bolt size={40} />, label: 'Bolt Collection', color: '#f59e0b' },
  { icon: <Lightbulb size={40} />, label: 'LED Setup', color: '#ec4899' },
  { icon: <Wrench size={40} />, label: 'Tools', color: '#8b5cf6' },
  { icon: <Chip size={40} />, label: 'Electronics', color: '#06b6d4' },
  { icon: <Motor size={40} />, label: 'Robot Build', color: '#10b981' },
  { icon: <Gear size={40} />, label: 'Transmission', color: '#f97316' },
  { icon: <Resistor size={40} />, label: 'Soldering Work', color: '#e11d48' },
  { icon: <Wrench size={40} />, label: 'Workbench', color: '#6366f1' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 px-6 bg-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">Project Gallery</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 tracking-tight">Behind the build</h2>
        <p className="text-text-secondary text-sm mb-14 max-w-md">
          A visual collection of components, circuits, and projects from my workbench.
        </p>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className={`relative rounded-2xl overflow-hidden border border-border/30 cursor-default group ${
                i % 5 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
              }`}
              style={{ backgroundColor: `${item.color}10` }}
            >
              {/* Color accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: item.color }}
              />

              {/* Content */}
              <div className="h-full flex flex-col items-center justify-center p-4">
                <div className="mb-2 opacity-40 group-hover:opacity-60 transition-opacity" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <p className="text-xs font-semibold text-text text-center">{item.label}</p>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: item.color }}>
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
