import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

// Soft glow + ring that trail the pointer (desktop only).
// The ring grows over links, and shows a label over elements with data-cursor-label.
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 30 })
  const ry = useSpring(y, { stiffness: 350, damping: 30 })
  const gx = useSpring(x, { stiffness: 60, damping: 20 })
  const gy = useSpring(y, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const labelled = e.target.closest('[data-cursor-label]')
      const overLink = e.target.closest('a, button, [data-cursor]')
      // Show the card label only when not over a specific button/link inside it
      setLabel(labelled && !overLink ? labelled.dataset.cursorLabel : '')
      setHovering(!!overLink)
    }
    const press = () => setDown(true)
    const release = () => setDown(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
    }
  }, [x, y])

  if (!enabled) return null

  const size = label ? 84 : hovering ? 56 : 22

  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-0" style={{ x: gx, y: gy }}>
        <div className="h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.07] blur-3xl" />
      </motion.div>
      {/* outer div follows the pointer; inner div is centred on it */}
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70]" style={{ x: rx, y: ry }}>
      <motion.div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-300/70"
        style={{ x: '-50%', y: '-50%' }}
        animate={{
          width: size,
          height: size,
          scale: down ? 0.85 : 1,
          backgroundColor: label ? 'rgba(103,232,249,0.95)' : hovering ? 'rgba(103,232,249,0.15)' : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-950"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      </motion.div>
    </>
  )
}
