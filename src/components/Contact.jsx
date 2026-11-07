import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Copy, Check, Send, Download } from 'lucide-react'
import { profile } from '../data'
import { Reveal, Magnetic, useSpotlight } from './ui'
import { GithubIcon, LinkedinIcon } from './icons'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', message: '' })
  const spot = useSpotlight()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  // Opens the visitor's email app with the message pre-filled (no backend needed)
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(form.message)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const cards = [
    { Icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { Icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { Icon: MapPin, label: 'Location', value: profile.location },
  ]

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <Reveal>
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">
            <span>06</span>
            <span className="h-px w-10 bg-gradient-to-r from-cyan-300/80 to-transparent" />
            <span>Contact</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-[clamp(2.6rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-white">
            Let's build <br />
            <span className="text-gradient animate-shine">something great.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg text-slate-400">
            Looking for an intern or junior engineer who ships? I'm open to internships, full-time roles and interesting collaborations.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {cards.map(({ Icon, label, value, href }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <div onMouseMove={spot} className="spotlight-card glass flex items-center gap-4 rounded-2xl p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-cyan-300">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500">{label}</p>
                    {href ? (
                      <a href={href} className="block truncate text-white hover:text-cyan-300">{value}</a>
                    ) : (
                      <p className="text-white">{value}</p>
                    )}
                  </div>
                  {label === 'Email' && (
                    <button onClick={copy} aria-label="Copy email" className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white">
                      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  )}
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={profile.github} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white transition hover:bg-white/10">
                  <GithubIcon className="h-4 w-4" /> GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white transition hover:bg-white/10">
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn
                </a>
                <a href={profile.resume} download="Sri_Chandu_Nannaka_Resume.pdf" className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white transition hover:bg-white/10">
                  <Download size={16} /> Resume
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={submit} onMouseMove={spot} className="spotlight-card glass rounded-3xl p-7 sm:p-9">
              <label className="block">
                <span className="text-sm text-slate-400">Your name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:bg-white/[0.05]"
                  placeholder="Jane from Acme Inc."
                />
              </label>
              <label className="mt-5 block">
                <span className="text-sm text-slate-400">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:bg-white/[0.05]"
                  placeholder="Hi Sri Chandu, we'd love to talk about…"
                />
              </label>
              <div className="mt-6">
                <Magnetic>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-7 py-3.5 font-medium text-ink-950 shadow-[0_0_40px_-8px_rgba(34,211,238,0.6)]"
                  >
                    Send message <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.button>
                </Magnetic>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
