import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function GlowingLEDs() {
  const [leds] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#a855f7', '#22d3ee', '#f43f5e', '#22c55e', '#fbbf24'][Math.floor(Math.random() * 5)],
      size: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    }))
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {leds.map(led => (
        <motion.div
          key={led.id}
          className="absolute rounded-full"
          style={{
            left: `${led.x}%`,
            top: `${led.y}%`,
            width: led.size,
            height: led.size,
            backgroundColor: led.color,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.3, 1],
            boxShadow: [
              `0 0 ${led.size}px ${led.color}40`,
              `0 0 ${led.size * 3}px ${led.color}60`,
              `0 0 ${led.size}px ${led.color}40`,
            ],
          }}
          transition={{
            duration: led.duration,
            repeat: Infinity,
            delay: led.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
