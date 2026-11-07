import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Globe } from 'lucide-react'
import { projects } from '../data'
import { GithubIcon } from './icons'
import { ScrambleText } from './effects'

const featured = projects.filter((p) => p.featured)

function initials(title) {
  return title
    .split(' ')
    .filter((w) => /^[A-Za-z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}

// Desktop-only: the section pins while vertical scroll moves the cards sideways
export default function FeaturedRail() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [dist, setDist] = useState(0)

  useLayoutEffect(() => {
    const measure = () => setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const x = useTransform(smooth, [0, 1], [0, -dist])
  const bar = useTransform(smooth, [0, 1], ['0%', '100%'])

  return (
    <section id="projects" ref={sectionRef} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-8 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-24">
          {/* Intro panel */}
          <div className="flex w-[420px] shrink-0 flex-col justify-center">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">
              <span>✦</span>
              <span className="h-px w-10 bg-gradient-to-r from-cyan-300/80 to-transparent" />
              <ScrambleText text="FEATURED WORK" />
            </div>
            <h2 className="font-display text-6xl font-semibold leading-[1.02] tracking-tight text-white">
              Projects I'm <span className="text-gradient">proud of</span>
            </h2>
            <p className="mt-6 text-lg text-slate-400">Keep scrolling. These four show the range: computer vision, multimodal search, RAG and real-time apps.</p>
            <div className="mt-10 flex items-center gap-3 font-mono text-xs text-slate-500">
              <motion.span animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                →
              </motion.span>
              scroll
            </div>
          </div>

          {featured.map((p, i) => (
            <article
              key={p.title}
              data-cursor-label={p.live ? 'Live' : 'Code'}
              className="group relative flex h-[min(560px,72vh)] w-[min(720px,70vw)] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/70 backdrop-blur-xl"
            >
              <div className="relative w-[45%] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:opacity-50`} />
                <div className="bg-grid absolute inset-0" />
                <div className={`absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${p.accent} opacity-60 blur-3xl transition-transform duration-1000 group-hover:scale-150`} />
                <span className="absolute inset-0 grid place-items-center font-display text-[8rem] font-bold leading-none text-white/90 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
                  {initials(p.title)}
                </span>
                <span className="absolute bottom-6 left-6 font-mono text-sm text-white/70">
                  0{i + 1} / 0{featured.length}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-9">
                <span className="w-fit rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate-300">{p.category}</span>
                <p className="mt-6 font-mono text-xs text-cyan-300/80">{p.subtitle}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-white">{p.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-slate-400">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="chip text-[11px]">{s}</span>
                  ))}
                </div>
                <div className="mt-7 flex items-center gap-3">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:border-cyan-300/50 hover:bg-white/5">
                      <GithubIcon className="h-4 w-4" /> Code <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink-950 transition hover:bg-cyan-200">
                      <Globe size={15} /> Live demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="container-x mt-10">
          <div className="h-px w-full bg-white/10">
            <motion.div style={{ width: bar }} className="h-full bg-gradient-to-r from-cyan-300 to-fuchsia-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
