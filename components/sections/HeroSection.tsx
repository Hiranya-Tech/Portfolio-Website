'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'

const HeroBackground = dynamic(
  () => import('@/components/features/HeroBackground').then((m) => m.HeroBackground),
  { ssr: false }
)

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Three.js background */}
      <HeroBackground />

      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 section-container flex flex-col items-center text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border border-border/50 p-1 glass mb-8 mx-auto"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative bg-accent/10">
            {/* The user can drop their picture here later */}
            <Image 
              src="/images/profile.jpg" 
              alt="Hiranmai Choppavarapu" 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            {/* Fallback avatar if no image is found */}
            <div className="absolute inset-0 flex items-center justify-center text-accent/50 font-display text-4xl -z-10">
              HC
            </div>
          </div>
          {/* Status dot */}
          <div className="absolute bottom-1 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border mb-6 text-xs text-foreground-muted"
        >
          <span className="glow-dot" />
          Hi, I&apos;m Hiranmai.
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-balance mb-6"
        >
          I explore <span className="gradient-text-accent">cybersecurity</span> <br className="hidden sm:block" />
          and build things that <span className="gradient-text">keep systems safe.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-foreground-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I&apos;m an engineering student diving deep into AI-powered threat detection, network security, and machine learning. 
          When I&apos;m not studying, I&apos;m building tools like FaceShield AI to solve real security problems.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-all duration-200 shadow-glow-blue"
          >
            See What I&apos;m Building
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-foreground-muted hover:text-foreground hover:border-border-hover font-medium text-sm transition-all duration-200"
          >
            More About Me
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground-subtle"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
