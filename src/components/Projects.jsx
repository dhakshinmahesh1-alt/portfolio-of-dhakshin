import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './Icons'

const projects = [
  {
    title: 'Bess H1',
    description: 'An AI assistant app built with API keys — my first project.',
    tags: ['AI', 'API', 'Web'],
    live: 'https://bess-h1.vercel.app',
  },
  {
    title: 'Lux AI',
    description: 'A more advanced AI app with better features and cleaner design.',
    tags: ['AI', 'API', 'Web'],
    live: 'https://lux-ai.vercel.app',
  },
  {
    title: 'KVXX AI',
    description: 'An AI focused on gaming — built for gamers, by a gamer.',
    tags: ['AI', 'Gaming', 'API'],
    live: 'https://vaano-v1.vercel.app',
  },
  {
    title: 'Vaano App',
    description: 'An editor app I built for creative work.',
    tags: ['Editor', 'Web', 'Creative'],
    live: 'https://vaano-v1.vercel.app',
  },
  {
    title: 'Everything Workspace',
    description: 'A workspace tool — another project I built.',
    tags: ['Productivity', 'Web'],
    live: 'https://everything-workspace.vercel.app',
  },
  {
    title: 'This Portfolio',
    description: "The site you're looking at right now.",
    tags: ['React', 'Vite', 'Tailwind'],
    github: 'https://github.com/dhakshinmahesh1-alt/portfolio-of-dhakshin',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 tracking-tight">
          Things I've built
        </h2>

        <div className="space-y-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="text-base font-semibold text-text group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-surface-2 text-muted border border-border/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
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
                    <ExternalLink size={14} /> Live
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
