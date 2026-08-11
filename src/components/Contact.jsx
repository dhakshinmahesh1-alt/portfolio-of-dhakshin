import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Loader2 } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="py-24 px-6 bg-surface-2/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <p className="text-accent font-mono text-sm mb-3 tracking-wider uppercase">Contact</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          Get in touch
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className="text-muted leading-relaxed">
              Have a project idea, want to collaborate, or just want to say hi?
              Drop me a message and I'll get back to you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-accent" />
                <span className="text-muted">dhakshinmahesh1@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-accent" />
                <span className="text-muted">Kochi, Kerala, India</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder-muted/60 text-sm focus:outline-none focus:border-accent/50 transition-colors"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder-muted/60 text-sm focus:outline-none focus:border-accent/50 transition-colors"
            />
            <textarea
              placeholder="Your message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder-muted/60 text-sm focus:outline-none focus:border-accent/50 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {sending ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : sent ? (
                'Sent!'
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
