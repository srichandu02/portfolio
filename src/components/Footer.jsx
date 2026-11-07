import { ArrowUp } from 'lucide-react'
import { profile } from '../data'
import { scrollToId } from './ui'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Designed & built with React, Tailwind & Framer Motion.
        </p>
        <button onClick={() => scrollToId('home')} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-slate-300 transition hover:text-white">
          Back to top <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  )
}
