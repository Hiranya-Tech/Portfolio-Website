'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Brain, Search } from 'lucide-react'

const PROJECTS = [
  {
    slug: 'faceshield-ai',
    title: 'FaceShield AI',
    description:
      'AI-powered identity protection platform detecting face misuse and digital identity fraud using computer vision.',
    category: 'AI Security',
    status: 'Completed',
    tech: ['Python', 'Computer Vision', 'ML'],
    icon: <Shield size={20} />,
    accent: 'from-blue-500/20 to-violet-500/20',
    border: 'hover:border-blue-500/40',
  },
  {
    slug: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    description:
      'NLP-powered ATS optimization tool that analyzes resumes and provides targeted recommendations to improve job application success.',
    category: 'ML · NLP',
    status: 'Completed',
    tech: ['Python', 'NLP', 'spaCy'],
    icon: <Brain size={20} />,
    accent: 'from-violet-500/20 to-pink-500/20',
    border: 'hover:border-violet-500/40',
  },
  {
    slug: 'phishing-website-detection',
    title: 'Phishing Detection',
    description:
      'ML classifier that identifies phishing websites through URL structure analysis and 56-feature classification pipeline.',
    category: 'Cybersecurity',
    status: 'Completed',
    tech: ['Python', 'scikit-learn', 'XGBoost'],
    icon: <Search size={20} />,
    accent: 'from-emerald-500/20 to-blue-500/20',
    border: 'hover:border-emerald-500/40',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function FeaturedProjects() {
  return (
    <section className="py-28 relative">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
              // selected work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Projects that solve{' '}
              <span className="gradient-text-accent">real problems</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors group flex-shrink-0"
          >
            All projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Cards — asymmetric bento layout */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {PROJECTS.map((project, i) => (
            <motion.div key={project.slug} variants={card}>
              <Link href={`/projects/${project.slug}`} className="block h-full group">
                <article
                  className={`h-full glass glass-hover rounded-2xl border border-border ${project.border} transition-all duration-300 overflow-hidden relative`}
                >
                  {/* Gradient top */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${project.accent} opacity-70`}
                  />

                  <div className="p-6 flex flex-col h-full">
                    {/* Icon + meta */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.accent} flex items-center justify-center text-foreground-muted`}
                      >
                        {project.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/4 border border-border text-foreground-muted">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground-muted leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-border">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded bg-white/4 text-foreground-subtle font-mono"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="ml-auto text-xs text-foreground-subtle flex items-center gap-1 group-hover:text-accent transition-colors">
                        Case study
                        <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
