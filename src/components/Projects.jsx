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
    description: 'The site you\'re looking at right now. Built with React, Vite, and Tailwind.',
    tags: ['React', 'Vite', 'Tailwind'],
    github: 'https://github.com/dhakshinmahesh1-alt/portfolio-of-dhakshin',
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
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
                  >
                    <GitHubIcon /> Code
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
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
