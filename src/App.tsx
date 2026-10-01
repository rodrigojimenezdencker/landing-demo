import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import './index.css'

const features = [
  { t: 'Plan in minutes', d: 'Drag a route together and share it with one link.' },
  { t: 'Works offline', d: 'Maps and notes stay available with no signal.' },
  { t: 'Split costs', d: 'Everyone sees who paid what, in any currency.' },
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div initial={reduce ? false : { y: 28 }} whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

export default function App() {
  const hero = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -240])

  useEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.to('.marquee-track', { xPercent: -50, repeat: -1, duration: 22, ease: 'none' })
    }, hero)
    return () => ctx.revert()
  }, [reduce])

  const words = 'Plan trips together, without the group chat chaos.'.split(' ')
  return (
    <>
      <header className="nav"><strong>Orbit</strong><a href="#features">Features</a></header>
      <section className="hero" ref={hero}>
        <motion.div className="blob" style={{ y: blobY }} aria-hidden />
        <h1>{words.map((w, i) => <span className="mask" key={i}><span className="word" style={{ ['--i' as string]: i }}>{w}&nbsp;</span></span>)}</h1>
        <p>Orbit is a concept travel planner. This page is a front-end demo.</p>
        <a className="cta" href="#features">See how it works</a>
        <div className="marquee" aria-hidden><div className="marquee-track">
          {[0, 1].map((k) => <span key={k}>Lisbon · Kyoto · Oaxaca · Tbilisi · Reykjavik · Hanoi · Cusco · </span>)}
        </div></div>
      </section>
      <section id="features" className="features">
        {features.map((f, i) => <Reveal key={f.t} delay={i * 0.1}>
          <article className="card"><h2>{f.t}</h2><p>{f.d}</p></article></Reveal>)}
      </section>
      <footer>Demo project by Rodrigo. Fictional product, no real service.</footer>
    </>
  )
}
