import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { GraduationCap, MapPin, Mail } from 'lucide-react'
import { about, profile, education } from '../data'
import { Reveal, SectionHeading, useSpotlight } from './ui'
import { ScrollWords } from './effects'

function Counter({ value, decimals, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: setDisplay })
    return () => c.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function About() {
  const spot = useSpotlight()

  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading index="01" kicker="About me" title={<>Turning data into <span className="text-gradient">intelligent products</span></>} />

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div onMouseMove={spot} className="spotlight-card glass h-full rounded-3xl p-8 sm:p-10">
              {about.paragraphs.map((p) => (
                <ScrollWords key={p} text={p} className="mb-5 text-lg leading-relaxed text-slate-200 last:mb-0" />
              ))}
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-400">
                <span className="chip flex items-center gap-1.5"><MapPin size={13} /> {profile.location}</span>
                <span className="chip flex items-center gap-1.5"><GraduationCap size={13} /> ANITS · 2027</span>
                <a href={`mailto:${profile.email}`} className="chip flex items-center gap-1.5 hover:text-cyan-300"><Mail size={13} /> {profile.email}</a>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-6 lg:col-span-2">
            {about.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div onMouseMove={spot} className="spotlight-card glass flex h-full flex-col justify-between rounded-3xl p-6">
                  <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                    <Counter {...s} />
                  </p>
                  <p className="mt-3 text-sm text-slate-400">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.1}>
              <div onMouseMove={spot} className="spotlight-card glass flex items-start gap-5 rounded-3xl p-6">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-cyan-300">
                  <GraduationCap size={22} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-white">{e.title}</h3>
                    <span className="text-gradient font-display font-bold">{e.score}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{e.place}</p>
                  <p className="mt-2 font-mono text-xs text-slate-500">{e.period}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
