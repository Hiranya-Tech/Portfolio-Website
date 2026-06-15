'use client'

import { motion } from 'framer-motion'
import { Terminal } from '@/components/features/Terminal'

export function HomeTerminal() {
  return (
    <section className="py-24 relative">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
              // interactive
            </p>
            <h2 className="font-display text-3xl font-bold mb-4">
              Explore via{' '}
              <span className="gradient-text-accent">terminal</span>
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed">
              Prefer querying over clicking? Try the interactive terminal. Type{' '}
              <code className="text-accent font-mono bg-accent/10 px-1.5 py-0.5 rounded text-xs">
                help
              </code>{' '}
              to see what's available — skills, projects, contact info, and more.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['help', 'about', 'skills', 'projects', 'contact'].map((cmd) => (
                <span
                  key={cmd}
                  className="font-mono text-xs px-2.5 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent"
                >
                  {cmd}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Terminal />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
