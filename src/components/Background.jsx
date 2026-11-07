import { useEffect, useRef } from 'react'

// Fixed backdrop: aurora blobs, a faint grid and a canvas "neural network" of particles
export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999 }
    let w, h, dpr, points, raf

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 16000))
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3 * dpr,
        vy: (Math.random() - 0.5) * 0.3 * dpr,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const max = 140 * dpr
      for (const p of points) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        // gentle push away from the pointer
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 120 * dpr && d > 0) {
          p.x += (dx / d) * 0.8
          p.y += (dy / d) * 0.8
        }
      }
      for (let i = 0; i < points.length; i++) {
        const a = points[i]
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < max) {
            ctx.strokeStyle = `rgba(56,189,248,${(1 - d / max) * 0.18})`
            ctx.lineWidth = dpr * 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = 'rgba(165,243,252,0.55)'
        ctx.beginPath()
        ctx.arc(a.x, a.y, 1.3 * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      mouse.x = e.clientX * dpr
      mouse.y = e.clientY * dpr
    }
    const onResize = () => {
      cancelAnimationFrame(raf)
      init()
      draw()
    }

    init()
    draw()
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] animate-float rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] animate-float rounded-full bg-fuchsia-600/20 blur-[140px] [animation-delay:-3s]" />
      <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] animate-float rounded-full bg-indigo-600/20 blur-[140px] [animation-delay:-1.5s]" />
      <div className="bg-grid absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
