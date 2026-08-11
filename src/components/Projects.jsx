import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './Icons'
import { PaperPlane, Gear, Pencil, Resistor } from './Illustrations'

const projects = [
  {
    title: 'Bess H1',
    description: 'An AI assistant app built with API keys — my first project.',
    tags: ['AI', 'API', 'Web'],
    live: 'https://bess-h1.vercel.app',
    rotate: -2,
    spin: 3,
  },
  {
    title: 'Lux AI',
    description: 'A more advanced AI app with better features and cleaner design.',
    tags: ['AI', 'API', 'Web'],
    live: 'https://lux-ai.vercel.app',
    rotate: 1.5,
    spin: -2,
  },
  {
    title: 'KVXX AI',
    description: 'An AI focused on gaming — built for gamers, by a gamer.',
    tags: ['AI', 'Gaming', 'API'],
    live: 'https://vaano-v1.vercel.app',
    rotate: -1,
    spin: 4,
  },
  {
    title: 'Vaano App',
    description: 'An editor app I built for creative work.',
    tags: ['Editor', 'Web', 'Creative'],
    live: 'https://vaano-v1.vercel.app',
    rotate: 2,
    spin: -3,
  },
  {
    title: 'Everything Workspace',
    description: 'A workspace tool — another project I built.',
    tags: ['Productivity', 'Web'],
    live: 'https://everything-workspace.vercel.app',
    rotate: -1.5,
    spin: 2,
  },
  {
    title: 'This Portfolio',
    description: "The site you're looking at right now.",
    tags: ['React', 'Vite', 'Tailwind'],
    github: 'https://github.com/dhakshinmahesh1-alt/portfolio-of-dhakshin',
    rotate: 0.5,
    spin: -4,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      {/* Wooden bench background */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(180deg, #d4a574 0%, #c49660 20%, #b8895a 40%, #c9a06c 60%, #d4a574 80%, #c49660 100%)`
      }} />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.08) 40px, rgba(0,0,0,0.08) 42px),
          repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(0,0,0,0.05) 120px, rgba(0,0,0,0.05) 123px)
        `
      }} />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      {/* Floating illustrations on bench */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.2 }} viewport={{ once: true }} className="absolute top-8 left-[5%] rotate-[25deg]">
          <PaperPlane size={70} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.18 }} viewport={{ once: true }} className="absolute bottom-12 right-[8%] -rotate-30">
          <Gear size={65} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.15 }} viewport={{ once: true }} className="absolute top-[15%] right-[3%] rotate-40">
          <Pencil size={50} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.12 }} viewport={{ once: true }} className="absolute bottom-[20%] left-[3%] -rotate-20">
          <Resistor size={55} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <p className="text-white/60 font-mono text-xs mb-4 tracking-widest uppercase">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Things I've built</h2>
        <p className="text-white/50 text-sm mb-14 max-w-md">
          Plans and blueprints from my workbench — each card a project brought to life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative"
              style={{ perspective: '600px' }}
            >
              {/* Continuous spinning wrapper */}
              <motion.div
                animate={{
                  rotateZ: [p.rotate, p.rotate + p.spin, p.rotate, p.rotate - p.spin, p.rotate],
                  rotateX: [0, 2, 0, -2, 0],
                  rotateY: [0, -1.5, 0, 1.5, 0],
                }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ rotateZ: 0, rotateX: 0, rotateY: 0 }}
              >
                {/* Torn paper edge — top */}
                <svg className="absolute -top-[6px] left-0 w-full h-[7px] z-10" viewBox="0 0 300 7" preserveAspectRatio="none">
                  <path d="M0,7 L0,2 Q8,0 16,3 Q24,6 32,2 Q40,0 48,4 Q56,7 64,2 Q72,0 80,3 Q88,6 96,1 Q104,0 112,4 Q120,6 128,2 Q136,0 144,3 Q152,7 160,2 Q168,0 176,4 Q184,6 192,1 Q200,0 208,3 Q216,6 224,2 Q232,0 240,4 Q248,7 256,2 Q264,0 272,3 Q280,6 288,1 Q296,0 300,2 L300,7 Z" fill="#f8f6f1"/>
                </svg>

                <div className="bg-[#f8f6f1] border border-[#e0d5c4] rounded-lg p-5 shadow-lg shadow-black/15 transition-shadow group-hover:shadow-xl cursor-default relative">
                  {/* Paper corner fold */}
                  <div className="absolute top-0 right-0 w-6 h-6 overflow-hidden rounded-tr-lg">
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#e8e0d4] rotate-45 shadow-sm" />
                  </div>

                  <h3 className="text-base font-semibold text-text mb-1.5 pr-4">{p.title}</h3>
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#e0d5c4] text-muted font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-[#e0d5c4]/60">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors">
                        <GitHubIcon /> Code
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors">
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
                  </div>
                </div>

                {/* Torn paper edge — bottom */}
                <svg className="absolute -bottom-[6px] left-0 w-full h-[7px] z-10" viewBox="0 0 300 7" preserveAspectRatio="none">
                  <path d="M0,0 L0,5 Q8,7 16,4 Q24,1 32,5 Q40,7 48,3 Q56,0 64,5 Q72,7 80,4 Q88,1 96,6 Q104,7 112,3 Q120,1 128,5 Q136,7 144,4 Q152,0 160,5 Q168,7 176,3 Q184,1 192,6 Q200,7 208,4 Q216,1 224,5 Q232,7 240,3 Q248,0 256,5 Q264,7 272,4 Q280,1 288,6 Q296,7 300,5 L300,0 Z" fill="#f8f6f1"/>
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
