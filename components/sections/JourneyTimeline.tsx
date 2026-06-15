'use client'

import { motion } from 'framer-motion'

const EVENTS = [
  {
    year: '2024',
    title: 'Started Cybersecurity Journey',
    description:
      'Enrolled in cybersecurity studies at Alliance University. Began self-directed learning in network security, ethical hacking fundamentals, and Linux security.',
    type: 'education',
    dot: 'bg-blue-500',
    glow: 'shadow-[0_0_12px_rgba(59,130,246,0.5)]',
  },
  {
    year: '2025',
    title: 'Joined E-Cell Leadership',
    description:
      'Selected to join the Entrepreneurship Cell at Alliance University — working with a team dedicated to building an innovation-first campus culture.',
    type: 'work',
    dot: 'bg-violet-500',
    glow: 'shadow-[0_0_12px_rgba(139,92,246,0.5)]',
  },
  {
    year: '2025',
    title: 'Operations Manager, E-Cell',
    description:
      'Promoted to Operations Manager. Managing entrepreneurship events, coordinating cross-functional teams, and working directly with industry professionals and startup founders.',
    type: 'work',
    dot: 'bg-violet-500',
    glow: 'shadow-[0_0_12px_rgba(139,92,246,0.5)]',
  },
  {
    year: '2026',
    title: 'FaceShield AI',
    description:
      'Built FaceShield AI — an AI-powered identity protection platform using computer vision to detect face misuse and combat digital identity fraud.',
    type: 'project',
    dot: 'bg-emerald-500',
    glow: 'shadow-[0_0_12px_rgba(52,211,153,0.5)]',
  },
  {
    year: 'Future',
    title: 'Security Engineer',
    description:
      'Target: security engineering role or research position in AI security, threat detection, or identity protection. Building toward that goal every day.',
    type: 'future',
    dot: 'bg-foreground-subtle border-2 border-dashed border-foreground-subtle',
    glow: '',
  },
]

export function JourneyTimeline() {
  return (
    <section className="py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
            // journey
          </p>
          <h2 className="font-display text-3xl font-bold">
            How I got <span className="gradient-text-accent">here</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-10">
            {EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="md:w-1/2 pl-12 md:pl-0 md:pr-10 md:text-right">
                  {i % 2 !== 0 && <div className="hidden md:block" />}
                  <div
                    className={`glass rounded-xl border border-border p-5 ${
                      i % 2 === 0 ? 'md:ml-auto' : ''
                    } ${event.type === 'future' ? 'border-dashed opacity-70' : ''}`}
                  >
                    <span className="text-xs font-mono text-accent mb-2 block">{event.year}</span>
                    <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-5 -translate-x-1/2 z-10">
                  <div
                    className={`w-3 h-3 rounded-full ${event.dot} ${event.glow}`}
                  />
                </div>

                {/* Empty side */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
