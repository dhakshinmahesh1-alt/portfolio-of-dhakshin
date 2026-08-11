import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './Icons'

const projects = [
  {
    title: 'Gesture-Controlled Drone',
    description: 'A drone controlled through hand gestures using computer vision and embedded systems.',
    tags: ['Python', 'ESP32', 'OpenCV', 'IoT'],
    github: 'https://github.com/agni-007/Gesture-controlled-drone',
  },
  {
    title: 'Pico ChromaStrike',
    description: 'A fast-paced 1D rhythm-defense arcade game for Raspberry Pi Pico 2 using NeoPixel LEDs.',
    tags: ['Arduino C++', 'NeoPixel', 'Raspberry Pi Pico'],
    github: 'https://github.com/agni-007/pico-chromastrike_game',
  },
  {
    title: 'ConvertX',
    description: 'Universal offline file converter. Supports audio, video, image, and document formats.',
    tags: ['Flutter', 'Dart', 'ffmpeg'],
    github: 'https://github.com/agni-007/ConvertX',
    extra: 'https://github.com/agni-007/ConvertX-Android',
    extraLabel: 'Android',
  },
  {
    title: 'Sense-AI',
    description: 'Agentic AI that classifies customer requests across platforms into priority-based queues.',
    tags: ['React', 'AI/ML', 'Node.js'],
    github: 'https://github.com/agni-007/Sense-Ai',
  },
  {
    title: 'Handwritten Digit Recognition',
    description: 'SVM classifier with PCA for dimensionality reduction. Full pipeline from binarization to prediction.',
    tags: ['Python', 'Scikit-learn', 'PCA', 'SVM'],
    github: 'https://github.com/agni-007/Hand-written-digits-recognition',
  },
  {
    title: 'Multi-Constellation GNSS Evaluator',
    description: 'Real-time GNSS receiver evaluation using multi-parameter scoring on ESP32 and Raspberry Pi.',
    tags: ['ESP32', 'Raspberry Pi', 'IoT'],
    github: 'https://github.com/agni-007/Multi-Constellation-GNSS-evaluator',
  },
  {
    title: 'MQTT Smart Home',
    description: 'Virtual smart home using MQTT protocol. ESP32 sensor data, Node-RED dashboard, mobile app control.',
    tags: ['MQTT', 'ESP32', 'Node-RED', 'IoT'],
    github: 'https://github.com/agni-007/MQTT-Virtual-smart-home',
  },
  {
    title: 'Maze Solver Bot',
    description: 'Autonomous maze-solving robot using pathfinding algorithms.',
    tags: ['Arduino', 'Robotics', 'C++'],
    github: 'https://github.com/agni-007/Maze-solver-bot',
  },
  {
    title: 'Event Ticketing',
    description: 'Live event ticketing and attendance management platform.',
    tags: ['React', 'Node.js', 'Full-Stack'],
    github: 'https://github.com/agni-007/Event-ticketing-live',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <p className="text-accent font-mono text-sm mb-3 tracking-wider uppercase">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          Things I've built
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-surface border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-accent/10 text-accent/80">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
                >
                  <GitHubIcon /> Code
                </a>
                {p.extra && (
                  <a
                    href={p.extra}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
                  >
                    <ExternalLink size={14} /> {p.extraLabel}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
