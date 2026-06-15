'use client'

import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Briefcase, Code2, Users } from 'lucide-react'

const VALUES = [
  {
    icon: <GraduationCap size={18} />,
    label: 'Always Learning',
    desc: 'Cybersecurity evolves faster than any other field. Staying current is not optional.',
  },
  {
    icon: <Code2 size={18} />,
    label: 'Build to Understand',
    desc: 'Reading about security is not enough. Building tools reveals what textbooks miss.',
  },
  {
    icon: <Users size={18} />,
    label: 'Operate at Scale',
    desc: 'E-Cell taught me that coordination and communication are as critical as technical skill.',
  },
  {
    icon: <Briefcase size={18} />,
    label: 'Product Thinking',
    desc: 'Security tools that are unusable do not get used. UX matters even in security.',
  },
]

export function AboutHero() {
  return (
    <div className="pt-28 pb-24">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 max-w-3xl"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">// about</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Building at the intersection of{' '}
            <span className="gradient-text-accent">security & intelligence</span>
          </h1>
          <div className="flex items-center gap-2 text-sm text-foreground-muted mb-8">
            <MapPin size={14} className="text-accent" />
            <span>Bangalore, India</span>
            <span className="text-border">·</span>
            <span>Alliance University</span>
          </div>
          <div className="prose prose-invert max-w-none space-y-4 text-foreground-muted leading-relaxed">
            <p>
              I&apos;m Hiranmai Choppavarapu — a cybersecurity student who started this journey in 2024
              with a clear conviction: the internet has a trust problem, and the solution sits at the
              intersection of security engineering and artificial intelligence.
            </p>
            <p>
              My work so far spans three areas. In <strong className="text-foreground">cybersecurity</strong>,
              I&apos;m building foundational knowledge in network security, vulnerability assessment, and threat
              detection — informed by hands-on practice rather than just theory. In{' '}
              <strong className="text-foreground">AI and machine learning</strong>, I&apos;ve built projects
              using computer vision, NLP, and classification models — specifically applied to security problems
              like identity fraud and phishing detection. And in{' '}
              <strong className="text-foreground">software engineering</strong>, I&apos;m developing the craft
              to ship systems that are not just functional but maintainable and production-ready.
            </p>
            <p>
              Outside of technical work, I serve as Operations Manager at E-Cell Alliance University — managing
              entrepreneurship events, coordinating teams, and working with industry professionals and founders.
              This role has sharpened how I think about execution, communication, and organizational complexity.
            </p>
            <p>
              I approach security as an engineer, not as someone who just runs tools. Understanding{' '}
              <em>why</em> something is vulnerable — the design assumptions that were violated, the threat model
              that was incomplete — is more valuable than knowing which CVE to run.
            </p>
          </div>
        </motion.div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="font-display text-xl font-semibold mb-8 text-foreground">
            How I work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="glass rounded-xl border border-border p-5 flex gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-accent-muted border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{v.label}</h3>
                  <p className="text-sm text-foreground-muted">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Currently section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-2xl border border-border p-8"
        >
          <h2 className="font-display text-xl font-semibold mb-6 text-foreground">Right now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground-subtle mb-2 font-mono">
                Building
              </p>
              <p className="text-foreground-muted">
                Expanding FaceShield AI with liveness detection and a security team dashboard
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground-subtle mb-2 font-mono">
                Learning
              </p>
              <p className="text-foreground-muted">
                Web application security, OWASP testing methodology, and adversarial ML
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground-subtle mb-2 font-mono">
                Open To
              </p>
              <p className="text-foreground-muted">
                Security internships, AI security research, and open source collaboration
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
