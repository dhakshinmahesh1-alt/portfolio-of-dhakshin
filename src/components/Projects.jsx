import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './Icons'
import { PaperPlane, Gear, Pencil, Resistor, Motor, Lightbulb, Chip, Wrench, Screw, Bolt } from './Illustrations'

const projects = [
  {
    id: '001',
    title: 'Bess H1',
    description: 'An AI assistant app built with API keys — my first project.',
    tags: ['AI', 'API', 'Web'],
    live: 'https://bess-h1.vercel.app',
    status: 'Completed',
    difficulty: 2,
    builtWith: ['API', 'HTML', 'CSS', 'JS'],
    color: '#ef4444',
  },
  {
    id: '002',
    title: 'Lux AI',
    description: 'A more advanced AI app with better features and cleaner design.',
    tags: ['AI', 'API', 'Web'],
    live: 'https://lux-ai.vercel.app',
    status: 'Completed',
    difficulty: 3,
    builtWith: ['API', 'React', 'Tailwind'],
    color: '#a855f7',
  },
  {
    id: '003',
    title: 'KVXX AI',
    description: 'An AI focused on gaming — built for gamers, by a gamer.',
    tags: ['AI', 'Gaming', 'API'],
    live: 'https://vaano-v1.vercel.app',
    status: 'Completed',
    difficulty: 3,
    builtWith: ['API', 'React', 'Gaming UI'],
    color: '#22d3ee',
  },
  {
    id: '004',
    title: 'Vaano App',
    description: 'An editor app I built for creative work.',
    tags: ['Editor', 'Web', 'Creative'],
    live: 'https://vaano-v1.vercel.app',
    status: 'Completed',
    difficulty: 4,
    builtWith: ['React', 'Canvas', 'CSS'],
    color: '#22c55e',
  },
  {
    id: '005',
    title: 'Everything',
    description: 'A workspace tool — another project I built.',
    tags: ['Productivity', 'Web'],
    live: 'https://everything-workspace.vercel.app',
    status: 'Completed',
    difficulty: 3,
    builtWith: ['React', 'Vite', 'Tailwind'],
    color: '#f59e0b',
  },
  {
    id: '006',
    title: 'Portfolio',
    description: "The site you're looking at right now.",
    tags: ['React', 'Vite', 'Tailwind'],
    github: 'https://github.com/dhakshinmahesh1-alt/portfolio-of-dhakshin',
    status: 'Live',
    difficulty: 5,
    builtWith: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    color: '#ec4899',
  },
]

const difficultyStars = (level) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < level ? 'text-yellow-400' : 'text-gray-200'}>★</span>
  ))
}

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
        className="max-w-5xl mx-auto relative z-10"
      >
        <p className="text-white/60 font-mono text-xs mb-4 tracking-widest uppercase">Featured Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Things I've built</h2>
        <p className="text-white/50 text-sm mb-14 max-w-md">
          Plans and blueprints from my workbench — each project brought to life.
        </p>

        {/* Digital workshop project cards */}
        <div className="space-y-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg shadow-black/15 overflow-hidden group hover:shadow-xl transition-all"
            >
              {/* Project header bar */}
              <div className="px-6 py-3 flex items-center justify-between" style={{ backgroundColor: p.color }}>
                <div className="flex items-center gap-3">
                  <span className="text-white/70 font-mono text-xs">PROJECT #{p.id}</span>
                </div>
                <span className="text-white/80 text-xs font-medium px-3 py-1 rounded-full bg-white/20">
                  {p.status}
                </span>
              </div>

              {/* Project body */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text mb-2">{p.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{p.description}</p>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-xs">
                      <div>
                        <span className="text-muted font-semibold">STATUS</span>
                        <span className="ml-2 text-green-600">{p.status} ✓</span>
                      </div>
                      <div>
                        <span className="text-muted font-semibold">DIFFICULTY</span>
                        <span className="ml-1">{difficultyStars(p.difficulty)}</span>
                      </div>
                    </div>

                    {/* Built with */}
                    <div className="mb-4">
                      <span className="text-xs text-muted font-semibold">BUILT WITH</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {p.builtWith.map((t) => (
                          <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-surface-2 text-text-secondary border border-border/30 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project visual */}
                  <div className="w-full md:w-48 h-32 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-border/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <div className="opacity-30 scale-150">
                      {i === 0 && <Chip size={40} />}
                      {i === 1 && <Lightbulb size={40} />}
                      {i === 2 && <Wrench size={40} />}
                      {i === 3 && <Gear size={40} />}
                      {i === 4 && <Motor size={40} />}
                      {i === 5 && <Screw size={40} />}
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  {p.github && (
                    <div className="relative group/link">
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-text text-white text-xs font-medium hover:bg-text/80 transition-colors">
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
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-white text-text text-xs font-medium hover:shadow-md transition-all">
                        <ExternalLink size={13} /> Live Demo
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
