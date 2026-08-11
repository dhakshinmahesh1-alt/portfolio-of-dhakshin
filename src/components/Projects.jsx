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
    spin: 3,
  },
  {
    title: 'Lux AI',
    description: 'A more advanced AI app with better features and cleaner design.',
    tags: ['AI', 'API', 'Web'],
    live: 'https://lux-ai.vercel.app',
    spin: -2,
  },
  {
    title: 'KVXX AI',
    description: 'An AI focused on gaming — built for gamers, by a gamer.',
    tags: ['AI', 'Gaming', 'API'],
    live: 'https://vaano-v1.vercel.app',
    spin: 4,
  },
  {
    title: 'Vaano App',
    description: 'An editor app I built for creative work.',
    tags: ['Editor', 'Web', 'Creative'],
    live: 'https://vaano-v1.vercel.app',
    spin: -3,
  },
  {
    title: 'Everything',
    description: 'A workspace tool — another project I built.',
    tags: ['Productivity', 'Web'],
    live: 'https://everything-workspace.vercel.app',
    spin: 2,
  },
  {
    title: 'Portfolio',
    description: "The site you're looking at right now.",
    tags: ['React', 'Vite', 'Tailwind'],
    github: 'https://github.com/dhakshinmahesh1-alt/portfolio-of-dhakshin',
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

      {/* Floating illustrations */}
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
              whileHover={{ scale: 1.04, y: -6 }}
              className="group relative"
              style={{ perspective: '600px' }}
            >
              <motion.div
                animate={{
                  rotateZ: [p.spin * 0.3, p.spin * 0.5, p.spin * 0.3, p.spin * 0.1, p.spin * 0.3],
                  rotateX: [0, 1.5, 0, -1.5, 0],
                  rotateY: [0, -1, 0, 1, 0],
                }}
                transition={{ duration: 7 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ rotateZ: 0, rotateX: 0, rotateY: 0 }}
              >
                {/* macOS Calendar Card */}
                <div className="bg-white rounded-2xl shadow-lg shadow-black/15 overflow-hidden cursor-default group-hover:shadow-xl transition-shadow">
                  {/* Colored header — like macOS calendar date */}
                  <div className="px-5 pt-4 pb-3 relative overflow-hidden rgb-header">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />
                    <p className="text-white/70 text-[10px] font-semibold uppercase tracking-widest relative z-10">Project</p>
                  </div>

                  {/* Content body */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-text mb-1">{p.title}</h3>
                    <p className="text-sm text-text-secondary mb-3 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-2 text-muted font-medium border border-border/30">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                      {p.github && (
                        <div className="relative group/link">
                          <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors">
                            <GitHubIcon /> Code
                          </a>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/link:opacity-100 transition-all duration-200 pointer-events-none z-50">
                            <div className="bg-[#1e1e2e] text-white text-[10px] px-3 py-2 rounded-lg shadow-xl whitespace-nowrap font-mono border border-white/10">
                              <div className="flex gap-1 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                              </div>
                              <div className="text-green-400/90">{p.github.replace('https://', '')}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      {p.live && (
                        <div className="relative group/link">
                          <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors">
                            <ExternalLink size={13} /> Live
                          </a>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/link:opacity-100 transition-all duration-200 pointer-events-none z-50">
                            <div className="bg-[#1e1e2e] text-white text-[10px] px-3 py-2 rounded-lg shadow-xl whitespace-nowrap font-mono border border-white/10">
                              <div className="flex gap-1 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                              </div>
                              <div className="text-cyan-400/90">{p.live.replace('https://', '')}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
