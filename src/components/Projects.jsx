import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './Icons'
import { PaperPlane, Gear } from './Illustrations'

const projects = [
  {
    title: 'Bess H1',
    description: 'An AI assistant app built with API keys — my first project.',
    tags: ['AI', 'API', 'Web'],
    live: 'https://bess-h1.vercel.app',
    rotate: -2,
  },
  {
    title: 'Lux AI',
    description: 'A more advanced AI app with better features and cleaner design.',
    tags: ['AI', 'API', 'Web'],
    live: 'https://lux-ai.vercel.app',
    rotate: 1.5,
  },
  {
    title: 'KVXX AI',
    description: 'An AI focused on gaming — built for gamers, by a gamer.',
    tags: ['AI', 'Gaming', 'API'],
    live: 'https://vaano-v1.vercel.app',
    rotate: -1,
  },
  {
    title: 'Vaano App',
    description: 'An editor app I built for creative work.',
    tags: ['Editor', 'Web', 'Creative'],
    live: 'https://vaano-v1.vercel.app',
    rotate: 2,
  },
  {
    title: 'Everything Workspace',
    description: 'A workspace tool — another project I built.',
    tags: ['Productivity', 'Web'],
    live: 'https://everything-workspace.vercel.app',
    rotate: -1.5,
  },
  {
    title: 'This Portfolio',
    description: "The site you're looking at right now.",
    tags: ['React', 'Vite', 'Tailwind'],
    github: 'https://github.com/dhakshinmahesh1-alt/portfolio-of-dhakshin',
    rotate: 0.5,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      {/* Wooden bench background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, #d4a574 0%, #c49660 20%, #b8895a 40%, #c9a06c 60%, #d4a574 80%, #c49660 100%)
          `,
        }}
      />
      {/* Wood grain lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(0,0,0,0.08) 40px,
              rgba(0,0,0,0.08) 42px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 120px,
              rgba(0,0,0,0.05) 120px,
              rgba(0,0,0,0.05) 123px
            )
          `,
        }}
      />
      {/* Subtle shadow at top and bottom for depth */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      {/* Floating illustrations on the bench */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          className="absolute top-8 left-[5%] rotate-[25deg]"
        >
          <PaperPlane size={70} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.18 }}
          viewport={{ once: true }}
          className="absolute bottom-12 right-[8%] -rotate-30"
        >
          <Gear size={65} />
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
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Things I've built
        </h2>
        <p className="text-white/50 text-sm mb-14 max-w-md">
          Plans and blueprints from my workbench — each card a project brought to life.
        </p>

        {/* Scattered cards on bench */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20, rotate: p.rotate * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ rotate: 0, y: -4, scale: 1.02 }}
              className="group bg-[#f8f6f1] border border-[#e0d5c4] rounded-lg p-5 shadow-lg shadow-black/15 transition-all cursor-default"
              style={{ transform: `rotate(${p.rotate}deg)` }}
            >
              {/* Paper corner fold effect */}
              <div className="absolute top-0 right-0 w-6 h-6 overflow-hidden rounded-tr-lg">
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#e8e0d4] rotate-45 shadow-sm" />
              </div>

              <h3 className="text-base font-semibold text-text mb-1.5 pr-4">
                {p.title}
              </h3>
              <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#e0d5c4] text-muted font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#e0d5c4]/60">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors"
                  >
                    <GitHubIcon /> Code
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors"
                  >
                    <ExternalLink size={13} /> Live
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
