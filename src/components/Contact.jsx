import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Loader2 } from 'lucide-react'
import { PaperPlane, Gear } from './Illustrations'

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
    <section id="contact" className="py-32 px-6 bg-[#f0f0f0] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          viewport={{ once: true }}
          className="absolute top-10 left-[8%] rotate-12"
        >
          <PaperPlane size={70} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          className="absolute bottom-16 right-[6%] -rotate-25"
        >
          <Gear size={55} />
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
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-10 tracking-tight">
          Get in touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-text-secondary leading-relaxed">
              Have a project idea, want to collaborate, or just want to say hi?
              Drop me a message.
            </p>

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
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-border text-text placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-text/5 focus:border-text/20 transition-all"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-border text-text placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-text/5 focus:border-text/20 transition-all"
            />
            <textarea
              placeholder="Message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-border text-text placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-text/5 focus:border-text/20 transition-all resize-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl bg-text text-white text-sm font-medium hover:bg-text/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {sending ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : sent ? (
                'Sent!'
              ) : (
                <><Send size={16} /> Send</>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
