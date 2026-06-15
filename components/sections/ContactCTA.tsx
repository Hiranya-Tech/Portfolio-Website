'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/utils'

export function ContactCTA() {
  return (
    <section className="py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative glass rounded-3xl border border-border overflow-hidden p-10 md:p-16 text-center"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(59,130,246,0.08) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4 relative">
            // contact
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 relative">
            Let&apos;s build something{' '}
            <span className="gradient-text-accent">secure</span> together
          </h2>
          <p className="text-foreground-muted text-base max-w-xl mx-auto mb-10 relative">
            Open to internships, research collaborations, and conversations about cybersecurity,
            AI security, or software engineering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-all duration-200 shadow-glow-sm"
            >
              Get in Touch
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="p-3 rounded-xl glass border border-border hover:border-border-hover text-foreground-muted hover:text-foreground transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass border border-border hover:border-border-hover text-foreground-muted hover:text-foreground transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass border border-border hover:border-border-hover text-foreground-muted hover:text-foreground transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
