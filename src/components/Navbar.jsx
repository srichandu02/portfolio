import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { profile } from '../data'
import { scrollToId, ease } from './ui'

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.1, ease }}
        className="fixed inset-x-0 top-4 z-50 px-4"
      >
        <nav
          className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
            scrolled ? 'glass shadow-[0_8px_40px_-12px_rgba(34,211,238,0.25)]' : 'border border-transparent'
          }`}
        >
          <button onClick={() => go('home')} className="flex items-center gap-2 rounded-full px-3 py-1.5" aria-label="Back to top">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-fuchsia-500 font-display text-sm font-bold text-ink-950">
              SC
            </span>
            <span className="hidden font-display font-semibold text-white sm:block">Sri Chandu</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`relative isolate rounded-full px-4 py-2 text-sm transition-colors ${active === l.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {active === l.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              download="Sri_Chandu_Nannaka_Resume.pdf"
              className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-cyan-200 sm:flex"
            >
              <Download size={15} /> Resume
            </a>
            <button onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center rounded-full text-white md:hidden" aria-label="Toggle menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink-950/95 px-8 backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.id}
                onClick={() => go(l.id)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, ease }}
                className="py-3 text-left font-display text-4xl font-semibold text-white"
              >
                <span className="mr-4 font-mono text-sm text-cyan-300">0{i + 1}</span>
                {l.label}
              </motion.button>
            ))}
            <a href={profile.resume} download className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-ink-950">
              <Download size={16} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
