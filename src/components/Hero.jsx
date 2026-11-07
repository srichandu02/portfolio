import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react'
import { profile } from '../data'
import { Magnetic, scrollToId, ease } from './ui'
import { HoverLetters } from './effects'
import { GithubIcon, LinkedinIcon } from './icons'

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2400)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[i]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="text-gradient animate-shine whitespace-nowrap font-semibold"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const Word = ({ children, delay }) => (
  <span className="-mt-4 inline-block overflow-hidden pb-2 pt-4 align-bottom">
    <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease }}>
      {children}
    </motion.span>
  </span>
)

export default function Hero({ ready }) {
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 600], [0, 120])
  const yImg = useTransform(scrollY, [0, 600], [0, -60])
  const fade = useTransform(scrollY, [0, 500], [1, 0])

  // Portrait tilts toward the mouse; badges drift the opposite way for depth
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const tiltX = useSpring(useTransform(py, [-1, 1], [10, -10]), { stiffness: 120, damping: 18 })
  const tiltY = useSpring(useTransform(px, [-1, 1], [-14, 14]), { stiffness: 120, damping: 18 })
  const badgeX = useSpring(useTransform(px, [-1, 1], [18, -18]), { stiffness: 100, damping: 20 })
  const badgeY = useSpring(useTransform(py, [-1, 1], [14, -14]), { stiffness: 100, damping: 20 })

  useEffect(() => {
    const move = (e) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1)
      py.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [px, py])

  if (!ready) return <section id="home" className="min-h-screen" />

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-slate-300 sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to internships & full-time roles
          </motion.div>

          <h1 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-white">
            <Word delay={0.3}>Hi, I'm</Word> <br />
            <Word delay={0.42}>
              <HoverLetters text={profile.firstName} />
            </Word>{' '}
            <Word delay={0.54}>
              <HoverLetters text={profile.lastName} gradient />
            </Word>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-6 text-xl text-slate-300 sm:text-2xl"
          >
            <RotatingRole />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                onClick={() => scrollToId('projects')}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-7 py-3.5 font-medium text-ink-950 shadow-[0_0_40px_-8px_rgba(34,211,238,0.6)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
                View my work <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </button>
            </Magnetic>
            <Magnetic>
              <button onClick={() => scrollToId('contact')} className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-white transition hover:bg-white/10">
                Let's talk
              </button>
            </Magnetic>
            <div className="flex items-center gap-2">
              {[
                { href: profile.github, Icon: GithubIcon, label: 'GitHub' },
                { href: profile.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
              ].map(({ href, Icon, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="glass grid h-12 w-12 place-items-center rounded-full text-slate-300 transition hover:text-cyan-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
          className="relative mx-auto w-full max-w-[360px]"
          style={{ y: yImg, perspective: 1000 }}
        >
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}>
          <div className="relative aspect-[4/5] animate-float">
            <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-cyan-500/25 to-fuchsia-500/25 blur-3xl" />
            {/* spinning gradient border: a big conic square rotates behind a 2px gap */}
            <div className="absolute -inset-[2px] overflow-hidden rounded-[2.1rem]">
              <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2">
                <div className="h-full w-full animate-spin-slow bg-[conic-gradient(from_0deg,#22d3ee,#a855f7,#f472b6,#22d3ee)] [animation-duration:6s]" />
              </div>
            </div>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-ink-800">
              <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover object-top grayscale-[15%] transition duration-700 hover:scale-105 hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <MapPin size={14} className="text-cyan-300" /> {profile.location}
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ x: badgeX, y: badgeY }}
              transition={{ delay: 1.4, duration: 0.8, ease }}
              className="glass absolute -right-4 top-10 rounded-2xl px-4 py-3 sm:-right-10"
            >
              <p className="font-display text-2xl font-bold text-white">8.7</p>
              <p className="text-xs text-slate-400">CGPA · ANITS</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ x: badgeX, y: badgeY }}
              transition={{ delay: 1.6, duration: 0.8, ease }}
              className="glass absolute -left-4 bottom-20 flex items-center gap-2 rounded-2xl px-4 py-3 sm:-left-10"
            >
              <Sparkles size={18} className="text-fuchsia-300" />
              <div>
                <p className="text-sm font-semibold text-white">AI & ML</p>
                <p className="text-xs text-slate-400">IIT Patna certified</p>
              </div>
            </motion.div>
          </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 sm:flex"
        aria-label="Scroll down"
      >
        Scroll
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  )
}
