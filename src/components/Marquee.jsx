import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { marquee } from '../data'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

// Endless row whose speed, direction and skew follow the page's scroll velocity
function VelocityRow({ baseVelocity }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(velocity, [-2500, 2500], [12, -12])
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += move * Math.abs(f) // faster scrolling = faster row
    baseX.set(baseX.get() + move)
  })

  return (
    <motion.div className="flex w-max gap-4" style={{ x, skewX }}>
      {[...marquee, ...marquee].map((t, i) => (
        <span
          key={i}
          className="glass flex items-center gap-3 whitespace-nowrap rounded-full px-6 py-3 font-display text-lg text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-400" />
          {t}
        </span>
      ))}
    </motion.div>
  )
}

export default function Marquee() {
  return (
    <div className="relative space-y-4 overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
      <div className="-rotate-1">
        <VelocityRow baseVelocity={-2} />
      </div>
      <div className="rotate-1">
        <VelocityRow baseVelocity={2} />
      </div>
    </div>
  )
}
