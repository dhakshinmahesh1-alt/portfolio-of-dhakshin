import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  { name: 'Hardware Tinkering', level: 85, color: '#a855f7' },
  { name: 'Soldering', level: 70, color: '#22d3ee' },
  { name: 'LED Projects', level: 90, color: '#22c55e' },
  { name: 'RC Cars', level: 80, color: '#f43f5e' },
  { name: 'AI App Building', level: 75, color: '#fbbf24' },
  { name: 'Vibecoding', level: 95, color: '#a855f7' },
]

export default function SkillBars() {
  return (
    <div className="space-y-3">
      {skills.map((s, i) => (
        <SkillBar key={s.name} skill={s} delay={i * 0.1} />
      ))}
    </div>
  )
}

function SkillBar({ skill, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-text">{skill.name}</span>
        <span className="text-[10px] text-muted">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
