import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/'

// Text that "decodes" from random characters when it scrolls into view
export function ScrambleText({ text, className = '', duration = 900 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [out, setOut] = useState(text.replace(/\S/g, ' '))

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const solved = Math.floor(p * text.length)
      setOut(
        text
          .split('')
          .map((c, i) => (c === ' ' || i < solved ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      )
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, text, duration])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
  )
}

// Each letter springs up when hovered. `gradient` spreads one gradient across all letters.
export function HoverLetters({ text, gradient = false }) {
  const letters = text.split('')
  const n = letters.length
  return (
    <span aria-label={text} className="inline-block">
      {letters.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`inline-block cursor-default ${gradient ? 'bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent' : ''}`}
          style={gradient ? { backgroundSize: `${n * 100}% 100%`, backgroundPosition: `${n > 1 ? (i / (n - 1)) * 100 : 0}% 0` } : undefined}
          whileHover={{ y: -14, scaleY: 1.12, color: gradient ? undefined : '#67e8f9', transition: { type: 'spring', stiffness: 500, damping: 12 } }}
        >
          {c === ' ' ? ' ' : c}
        </motion.span>
      ))}
    </span>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}

// Paragraph whose words light up one by one as you scroll through it
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

export function useMediaQuery(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatch(m.matches)
    on()
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return match
}
