import { Award, Users, Trophy, BadgeCheck } from 'lucide-react'
import { leadership, certifications, achievements } from '../data'
import { Reveal, SectionHeading, useSpotlight } from './ui'
import FeaturedCert from './FeaturedCert'

export default function Journey() {
  const spot = useSpotlight()
  return (
    <section id="journey" className="section">
      <div className="container-x">
        <SectionHeading
          index="05"
          kicker="Beyond code"
          title={<>Leadership & <span className="text-gradient">learning</span></>}
        />

        <FeaturedCert />

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div onMouseMove={spot} className="spotlight-card glass h-full rounded-3xl p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-400/20 to-rose-500/20 text-fuchsia-300">
                  <Users size={22} />
                </div>
                <div>
                  <p className="font-mono text-xs text-fuchsia-300">{leadership.period}</p>
                  <h3 className="font-display text-xl font-semibold text-white">{leadership.role}</h3>
                </div>
              </div>
              <p className="text-gradient mb-4 font-medium">{leadership.org}</p>
              <ul className="space-y-3">
                {leadership.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fuchsia-300" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {achievements.map((a) => (
                  <div key={a.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <Trophy size={16} className="mb-2 text-amber-300" />
                    <p className="font-display text-2xl font-bold text-white">{a.value}</p>
                    <p className="text-xs text-slate-400">{a.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div onMouseMove={spot} className="spotlight-card glass h-full rounded-3xl p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-sky-500/20 text-cyan-300">
                  <Award size={22} />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((c) => (
                  <div key={c.name} className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.04]">
                    <BadgeCheck size={20} className="mt-0.5 shrink-0 text-cyan-300 transition-transform group-hover:scale-110" />
                    <div>
                      <p className="font-medium text-white">{c.name}</p>
                      <p className="text-sm text-slate-400">{c.issuer}</p>
                      {c.note && <p className="mt-1 font-mono text-xs text-cyan-300/80">{c.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
