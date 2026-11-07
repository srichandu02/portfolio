import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { experience } from '../data'
import { Reveal, SectionHeading, useSpotlight } from './ui'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const spot = useSpotlight()

  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionHeading
          index="03"
          kicker="Experience"
          title={<>Where I've <span className="text-gradient">worked</span></>}
          subtitle="Internships across AI/ML, software development and cybersecurity."
        />

        <div ref={ref} className="relative">
          {/* timeline track + animated fill */}
          <div className="absolute left-5 top-0 h-full w-px bg-white/10 md:left-1/2" />
          <motion.div style={{ scaleY }} className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan-300 via-sky-400 to-fuchsia-500 md:left-1/2" />

          <div className="space-y-12">
            {experience.map((exp, i) => {
              const left = i % 2 === 0
              return (
                <div key={exp.company} className={`relative flex md:items-center ${left ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-5 top-8 z-10 -translate-x-1/2 md:left-1/2">
                    <span className="relative grid h-10 w-10 place-items-center rounded-full border border-cyan-300/40 bg-ink-900 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                      <Briefcase size={16} />
                      {exp.current && <span className="absolute inset-0 animate-ping rounded-full border border-cyan-300/50" />}
                    </span>
                  </div>

                  <div className={`w-full pl-16 md:w-1/2 md:pl-0 ${left ? 'md:pr-16' : 'md:pl-16'}`}>
                    <Reveal y={30}>
                      <div onMouseMove={spot} className="spotlight-card glass rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1">
                        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-xs text-cyan-300">{exp.period}</span>
                          {exp.current && (
                            <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">Current</span>
                          )}
                        </div>
                        <h3 className="mt-2 font-display text-2xl font-semibold text-white">{exp.role}</h3>
                        <p className="text-gradient font-medium">{exp.company}</p>
                        <ul className="mt-5 space-y-2.5">
                          {exp.points.map((p) => (
                            <li key={p} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {exp.tags.map((t) => (
                            <span key={t} className="chip">{t}</span>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
