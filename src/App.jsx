import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Loader from './components/Loader'
import Background from './components/Background'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import FeaturedRail from './components/FeaturedRail'
import { useMediaQuery } from './components/effects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Pinned horizontal showcase only on large screens; phones get the normal grid
  const desktop = useMediaQuery('(min-width: 1024px)')
  // ?skip in the URL skips the intro loader (handy for screenshots/testing)
  const [loading, setLoading] = useState(() => !new URLSearchParams(window.location.search).has('skip'))

  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 1900)
    return () => clearTimeout(t)
  }, [])

  // Smooth scrolling (skipped for users who prefer reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    let id
    const raf = (time) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  // ?at=<section-id>&dy=<px> jumps straight to a section (for previews/screenshots)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const id = q.get('at')
    if (!id || loading) return
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY + Number(q.get('dy') || 0)
      if (window.__lenis) window.__lenis.scrollTo(top, { immediate: true })
      else window.scrollTo(0, top)    }, 300)
    return () => clearTimeout(t)
  }, [loading])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (window.__lenis) loading ? window.__lenis.stop() : window.__lenis.start()
  }, [loading])

  return (
    <div className="noise relative min-h-screen">
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <About />
        <Marquee />
        <Skills />
        <Experience />
        {desktop && <FeaturedRail />}
        <Projects hideFeatured={desktop} />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
