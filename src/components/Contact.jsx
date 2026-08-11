import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { PaperPlane, Gear, Screw, Bolt } from './Illustrations'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.open(`mailto:dhakshinmahesh1@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-32 px-6 bg-[#f0f0f0] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.12 }} viewport={{ once: true }} className="absolute top-10 left-[8%] rotate-12">
          <PaperPlane size={70} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.1 }} viewport={{ once: true }} className="absolute bottom-16 right-[6%] -rotate-25">
          <Gear size={55} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.08 }} viewport={{ once: true }} className="absolute top-[40%] right-[2%] rotate-20">
          <Screw size={30} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.07 }} viewport={{ once: true }} className="absolute bottom-[30%] left-[3%] -rotate-35">
          <Bolt size={28} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">Contact</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 tracking-tight">Let's build something</h2>
        <p className="text-text-secondary text-sm mb-12 max-w-md">
          Have a project idea, want to collaborate, or just want to say hi? I'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-muted" />
                <span className="text-text-secondary">dhakshinmahesh1@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-muted" />
                <span className="text-text-secondary">Kochi, Kerala, India</span>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <a
                href="https://github.com/agni-007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-text text-white text-sm font-medium hover:bg-text/80 transition-colors"
              >
                <GitHubIcon /> Follow on GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dhakshin-mahesh-4000b6423/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-white text-text text-sm font-medium hover:shadow-md transition-all"
              >
                <LinkedInIcon /> Follow on LinkedIn
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-border text-text placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-text/5 focus:border-text/20 transition-all" />
            <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-border text-text placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-text/5 focus:border-text/20 transition-all" />
            <textarea placeholder="Message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-border text-text placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-text/5 focus:border-text/20 transition-all resize-none" />
            <button type="submit"
              className="w-full py-3 rounded-xl bg-text text-white text-sm font-medium hover:bg-text/80 transition-colors flex items-center justify-center gap-2">
              {sent ? '✓ Opened Email Client' : <><Send size={14} /> Send Message</>}
            </button>
            <p className="text-[10px] text-muted text-center">Opens your email client with the message pre-filled</p>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
