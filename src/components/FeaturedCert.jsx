import { motion } from 'framer-motion'
import { Award, FileText, Sparkles } from 'lucide-react'
import { featuredCertification as cert } from '../data'
import { Reveal, Magnetic, ease } from './ui'

// Big highlighted card for the IIT Patna AI/ML certificate
export default function FeaturedCert() {
  return (
    <Reveal className="mb-6">
      <div className="group relative overflow-hidden rounded-[2rem] p-[1.5px]">
        {/* spinning gradient border */}
        <div className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2">
          <div className="h-full w-full animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,#22d3ee_60deg,#a855f7_120deg,transparent_180deg,transparent_360deg)] [animation-duration:5s]" />
        </div>

        <div className="relative overflow-hidden rounded-[calc(2rem-1.5px)] bg-ink-900/95 p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          {/* shine sweep on hover */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
                <Sparkles size={13} /> Highlight certification
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-ink-950 shadow-[0_0_40px_-6px_rgba(168,85,247,0.7)]">
                  <Award size={26} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">{cert.title}</h3>
                  <p className="text-gradient mt-2 text-lg font-semibold">{cert.issuer}</p>
                  <p className="text-sm text-slate-400">
                    {cert.partner} · Batch {cert.batch}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {cert.stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, ease }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center"
                  >
                    <p className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
                    <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Magnetic>
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink-950 transition hover:bg-cyan-200"
                  >
                    <FileText size={15} /> View score card
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* module score bars */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-slate-500">Module scores</p>
              <div className="space-y-5">
                {cert.modules.map((m, i) => (
                  <div key={m.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-300">{m.label}</span>
                      <span className="font-mono text-white">{m.score.toFixed(1)}/10</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.score * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.3 + i * 0.12, ease }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
