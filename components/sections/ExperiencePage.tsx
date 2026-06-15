'use client'

import { motion } from 'framer-motion'
import { Briefcase, Users, Zap, Globe, Calendar } from 'lucide-react'

const RESPONSIBILITIES = [
  {
    icon: <Briefcase size={16} />,
    title: 'Event Management',
    desc: 'Planned and executed entrepreneurship events, hackathons, and innovation programs from concept through delivery.',
  },
  {
    icon: <Users size={16} />,
    title: 'Team Coordination',
    desc: 'Managed volunteers and student coordinators across multiple concurrent events and timelines.',
  },
  {
    icon: <Globe size={16} />,
    title: 'Industry Engagement',
    desc: 'Coordinated directly with startup founders, investors, and industry professionals for events and mentorship sessions.',
  },
  {
    icon: <Zap size={16} />,
    title: 'Operational Execution',
    desc: 'Built operational processes for logistics, venue management, communications, and post-event reporting.',
  },
]

export function ExperiencePage() {
  return (
    <div className="pt-28 pb-24">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">// experience</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Work & <span className="gradient-text-accent">Leadership</span>
          </h1>
          <p className="text-foreground-muted max-w-xl text-base">
            Beyond technical projects, I lead operations at one of Alliance University&apos;s most
            active student organizations — experience that has shaped how I think about execution and scale.
          </p>
        </motion.div>

        {/* Main role card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl border border-border overflow-hidden mb-10"
        >
          {/* Header band */}
          <div className="h-2 bg-gradient-to-r from-accent to-violet" />
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                  Operations Manager
                </h2>
                <p className="text-accent font-medium">E-Cell Alliance University</p>
                <p className="text-sm text-foreground-muted mt-1">Alliance University · Bangalore, India</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground-muted glass px-3 py-2 rounded-lg border border-border">
                <Calendar size={14} />
                <span>2025 — Present</span>
              </div>
            </div>

            <p className="text-foreground-muted leading-relaxed mb-8 max-w-2xl">
              E-Cell (Entrepreneurship Cell) is the primary student body at Alliance University driving
              innovation culture, startup thinking, and industry engagement. As Operations Manager, I own
              the end-to-end execution of the organization&apos;s programs — from planning through delivery and
              post-event analysis.
            </p>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-subtle mb-5">
              Key Responsibilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RESPONSIBILITIES.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                  className="flex gap-3 p-4 rounded-xl bg-white/3 border border-border"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-muted border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                    {r.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{r.title}</h4>
                    <p className="text-xs text-foreground-muted leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* What I learned section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-2xl border border-border p-8 mb-10"
        >
          <h3 className="font-display text-xl font-semibold mb-4">
            What this role taught me
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground-subtle mb-2 font-mono">Systems Thinking</p>
              <p className="text-foreground-muted">
                Running large events taught me to think in dependencies and failure modes — the same mental model that applies to security architecture.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground-subtle mb-2 font-mono">Communication</p>
              <p className="text-foreground-muted">
                Coordinating across students, faculty, and industry professionals required clear, context-aware communication at every level.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground-subtle mb-2 font-mono">Execution Under Pressure</p>
              <p className="text-foreground-muted">
                Events don&apos;t pause for debugging. Learning to make good decisions quickly, with incomplete information, under time pressure.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Upcoming / planned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass rounded-2xl border border-dashed border-border p-8 opacity-70"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="glow-dot" />
            <span className="text-xs font-mono text-accent uppercase tracking-widest">Upcoming</span>
          </div>
          <h3 className="font-display text-lg font-semibold mb-2">Security Engineering Role</h3>
          <p className="text-sm text-foreground-muted">
            Actively building toward internship and entry-level opportunities in security engineering, AI security research,
            or software development with a security focus. Expected: 2026–2027.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
