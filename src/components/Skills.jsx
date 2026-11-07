import { motion } from 'framer-motion'
import { Brain, Layout, Server, Code2, Database, ShieldCheck, Wrench } from 'lucide-react'
import { skills } from '../data'
import { Reveal, SectionHeading, useSpotlight } from './ui'

const icons = { Brain, Layout, Server, Code2, Database, ShieldCheck, Wrench }

export default function Skills() {
  const spot = useSpotlight()
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionHeading
          index="02"
          kicker="Skills"
          title={<>My <span className="text-gradient">tech arsenal</span></>}
          subtitle="Tools I use to take an idea from a notebook experiment to a shipped product."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {skills.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08} className={s.span || ''}>
                <div onMouseMove={spot} className="spotlight-card glass group h-full rounded-3xl p-7">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-cyan-300 transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item, j) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + j * 0.03 }}
                        whileHover={{ y: -3 }}
                        className="chip cursor-default transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
