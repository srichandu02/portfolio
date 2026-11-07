import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Globe, FolderGit2 } from 'lucide-react'
import { projects, profile } from '../data'
import { SectionHeading, Reveal, Magnetic } from './ui'
import { GithubIcon } from './icons'

const filters = ['All', 'AI / ML', 'Full-Stack', 'Web3']

function TiltCard({ p, index }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }


  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        data-cursor-label={p.live ? 'Live' : p.github ? 'Code' : undefined}
        className="spotlight-card glass group relative flex h-full flex-col overflow-hidden rounded-3xl"
      >
        {/* Visual header */}
        <div className="relative h-44 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-25 transition-opacity duration-500 group-hover:opacity-40`} />
          <div className="bg-grid absolute inset-0 opacity-60" />
          <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${p.accent} opacity-50 blur-2xl transition-transform duration-700 group-hover:scale-150`} />
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(40px)' }}>
            <span className="font-display text-6xl font-bold text-white/90 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              {p.title
                .split(' ')
                .filter((w) => /^[A-Za-z0-9]/.test(w))
                .slice(0, 2)
                .map((w) => w[0])
                .join('')}
            </span>
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-ink-950/60 px-3 py-1 font-mono text-[11px] text-slate-200 backdrop-blur">{p.category}</span>
          {p.featured && (
            <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink-950">Featured</span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(20px)' }}>
          <p className="font-mono text-xs text-cyan-300/80">{p.subtitle}</p>
          <h3 className="mt-1.5 font-display text-2xl font-semibold text-white">{p.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="chip text-[11px]">{s}</span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-cyan-300/50 hover:bg-white/5">
                <GithubIcon className="h-4 w-4" /> Code
              </a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-cyan-200">
                <Globe size={15} /> Live demo
              </a>
            )}
            {!p.github && !p.live && <span className="text-xs text-slate-500">Internal / private project</span>}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Projects({ hideFeatured = false }) {
  const [filter, setFilter] = useState('All')
  // On desktop the featured four already appear in the horizontal showcase above
  const pool = hideFeatured ? projects.filter((p) => !p.featured) : projects
  const list = pool.filter((p) => filter === 'All' || p.category === filter)

  return (
    <section id={hideFeatured ? 'more-projects' : 'projects'} className="section">
      <div className="container-x">
        <SectionHeading
          index="04"
          kicker={hideFeatured ? 'More projects' : 'Projects'}
          title={hideFeatured ? <>More things I've <span className="text-gradient">built</span></> : <>Things I've <span className="text-gradient">built</span></>}
          subtitle="A selection of AI, full-stack and Web3 projects. Hover the cards — they move."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative isolate rounded-full px-5 py-2 text-sm transition-colors ${filter === f ? 'text-ink-950' : 'glass text-slate-300 hover:text-white'}`}
              >
                {filter === f && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-400" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                {f}
                <span className="ml-2 font-mono text-xs opacity-60">
                  {f === 'All' ? pool.length : pool.filter((p) => p.category === f).length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {list.map((p, i) => (
              <TiltCard key={p.title} p={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-14 text-center">
          <Magnetic>
            <a href={profile.github} target="_blank" rel="noreferrer" className="glass group inline-flex items-center gap-3 rounded-full px-7 py-4 font-medium text-white transition hover:bg-white/10">
              <FolderGit2 size={18} className="text-cyan-300" /> See all repositories on GitHub
              <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
