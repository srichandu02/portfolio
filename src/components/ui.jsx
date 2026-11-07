import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ScrambleText } from './effects'

export const ease = [0.22, 1, 0.36, 1]

// Fades + slides children in when they enter the viewport
export function Reveal({ children, delay = 0, y = 40, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ index, kicker, title, subtitle }) {
  return (
    <div className="mb-14 sm:mb-20">
      <Reveal>
        <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">
          <span>{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-cyan-300/80 to-transparent" />
          <ScrambleText text={kicker.toUpperCase()} />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-base text-slate-400 sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}

// Element that drifts toward the pointer while hovered
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}

// Updates --mx/--my CSS vars so .spotlight-card can follow the pointer
export function useSpotlight() {
  return (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
