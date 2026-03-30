'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Phone, Zap, Brain, Users } from 'lucide-react'

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 120 120" fill="none">
    <rect width="120" height="120" rx="24" fill="#1D9E75"/>
    <path d="M25 88 Q38 72 54 60 Q70 48 88 30" stroke="white" strokeWidth="10" strokeLinecap="round" fill="none"/>
    <path d="M74 23 L89 31 L81 46" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M22 78 Q44 90 64 76" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.55"/>
  </svg>
)

const FADE_UP = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const STAGGER = { show: { transition: { staggerChildren: 0.1 } } }

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#090909' }}>
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: 'rgba(9,9,9,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-display font-bold text-lg tracking-tight" style={{ color: '#F0EFEA' }}>
            Hire Next<span style={{ color: '#1D9E75' }}> AI</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="btn-ghost text-sm hidden md:flex">Sign in</Link>
          <Link href="/auth/signup" className="btn-primary text-sm">
            Start hiring <ArrowUpRight size={14} />
          </Link>
        </div>
      </nav>
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <motion.div variants={STAGGER} initial="hidden" animate="show" className="max-w-4xl mx-auto">
          <motion.h1 variants={FADE_UP} className="font-display font-extrabold leading-none tracking-tight mb-6" style={{ fontSize: 'clamp(48px, 8vw, 88px)', color: '#F0EFEA' }}>
            Hire great people.<br /><span style={{ color: '#1D9E75' }}>Without the grind.</span>
          </motion.h1>
          <motion.p variants={FADE_UP} className="text-lg max-w-2xl mx-auto mb-10" style={{ color: '#8A8880' }}>
            AI screens, interviews, scores, and delivers ranked candidates. You only show up when someone is worth hiring.
          </motion.p>
          <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn-primary text-base px-8 py-3.5 rounded-2xl">Start for free <ArrowUpRight size={16} /></Link>
            <Link href="#pricing" className="btn-secondary text-base px-8 py-3.5 rounded-2xl">See pricing</Link>
          </motion.div>
        </motion.div>
      </section>
      <section id="pricing" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold text-4xl mb-4" style={{ color: '#F0EFEA' }}>Simple pricing</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Solo', price: '$199', features: ['1 role', '100 resumes', '10 interviews'], highlight: false },
            { name: 'Growth', price: '$349', features: ['3 roles', '300 resumes', '30 interviews'], highlight: true },
            { name: 'Scale', price: '$599', features: ['8 roles', '600 resumes', '60 interviews'], highlight: false },
          ].map((p, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ background: p.highlight ? 'rgba(29,158,117,0.08)' : '#111111', border: p.highlight ? '2px solid rgba(29,158,117,0.4)' : '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-sm font-medium mb-2" style={{ color: '#8A8880' }}>{p.name}</div>
              <div className="font-display font-extrabold text-4xl mb-6" style={{ color: '#F0EFEA' }}>{p.price}<span className="text-base" style={{ color: '#4A4845' }}>/mo</span></div>
              <ul className="space-y-2 mb-6">{p.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-sm" style={{ color: '#8A8880' }}><Check size={14} style={{ color: '#1D9E75' }} /> {f}</li>)}</ul>
              <Link href="/auth/signup" className={p.highlight ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}>Get started</Link>
            </div>
          ))}
        </div>
      </section>
      <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-display font-bold" style={{ color: '#F0EFEA' }}>Hire Next AI</span>
          <p className="text-sm" style={{ color: '#3A3A3A' }}>© 2025 Mindscript LLC</p>
        </div>
      </footer>
    </div>
  )
}
