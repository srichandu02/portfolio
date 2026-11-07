import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ease } from './ui'

export default function Loader() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 9))
      setCount(n)
      if (n === 100) clearInterval(id)
    }, 70)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl"
        >
          Sri Chandu<span className="text-gradient">.</span>
        </motion.h1>
      </div>
      <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
        <motion.div className="h-full bg-gradient-to-r from-cyan-300 to-fuchsia-400" style={{ width: `${count}%` }} />
      </div>
      <p className="mt-4 font-mono text-xs tracking-[0.3em] text-slate-500">{String(count).padStart(3, '0')}%</p>
    </motion.div>
  )
}
