'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Brain, Search } from 'lucide-react'

type Category = 'all' | 'cybersecurity' | 'ai-security' | 'ml'

const PROJECTS = [
  {
    slug: 'faceshield-ai',
    title: 'FaceShield AI',
    description: 'AI-powered identity protection platform detecting face misuse and digital identity fraud using computer vision.',
    category: 'ai-security' as Category,
    tech: ['Python', 'Computer Vision', 'FaceNet', 'OpenCV'],
    icon: <Shield size={22} />,
    accentFrom: 'from-blue-500/15',
    accentTo: 'to-violet-500/15',
    borderHover: 'hover:border-blue-500/40',
    tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    tagLabel: 'AI Security',
  },
  {
    slug: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    description: 'NLP-powered ATS optimization tool analyzing resumes and providing targeted recommendations for job application success.',
    category: 'ml' as Category,
    tech: ['Python', 'NLP', 'spaCy', 'pdfplumber'],
    icon: <Brain size={22} />,
    accentFrom: 'from-violet-500/15',
    accentTo: 'to-pink-500/15',
    borderHover: 'hover:border-violet-500/40',
    tagColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    tagLabel: 'ML · NLP',
  },
  {
    slug: 'phishing-website-detection',
    title: 'Phishing Detection',
    description: 'Machine learning classifier identifying phishing websites via 56-feature URL analysis and content classification pipeline.',
    category: 'cybersecurity' as Category,
    tech: ['Python', 'scikit-learn', 'XGBoost', 'pandas'],
    icon: <Search size={22} />,
    accentFrom: 'from-emerald-500/15',
    accentTo: 'to-blue-500/15',
    borderHover: 'hover:border-emerald-500/40',
    tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    tagLabel: 'Cybersecurity',
  },
]

const CATS: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'ai-security', label: 'AI Security' },
  { id: 'ml', label: 'Machine Learning' },
]

export function ProjectsPage() {
  const [active, setActive] = useState<Category | 'all'>('all')

  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <div className="pt-28 pb-24">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">// work</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Projects &{' '}
            <span className="gradient-text-accent">Case Studies</span>
          </h1>
          <p className="text-foreground-muted max-w-xl text-base">
            Each project below is documented as an engineering case study — problem, research,
            architecture decisions, challenges, and lessons learned. Not just feature lists.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id as Category | 'all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === cat.id
                  ? 'bg-accent text-white shadow-glow-sm'
                  : 'glass border border-border text-foreground-muted hover:text-foreground hover:border-border-hover'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/projects/${project.slug}`} className="block h-full group">
                  <article
                    className={`h-full glass glass-hover rounded-2xl border border-border ${project.borderHover} transition-all duration-300 overflow-hidden`}
                  >
                    {/* Gradient header band */}
                    <div className={`h-32 bg-gradient-to-br ${project.accentFrom} ${project.accentTo} flex items-center justify-center`}>
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground-muted group-hover:scale-105 transition-transform duration-300">
                        {project.icon}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="font-display font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
                          {project.title}
                        </h2>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${project.tagColor} ml-2 flex-shrink-0`}>
                          {project.tagLabel}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-muted leading-relaxed mb-5">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                        {project.tech.map((t) => (
                          <span key={t} className="font-mono text-xs px-2 py-0.5 rounded bg-white/4 text-foreground-subtle">
                            {t}
                          </span>
                        ))}
                        <span className="ml-auto text-xs text-foreground-subtle flex items-center gap-1 group-hover:text-accent transition-colors">
                          Read case study
                          <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
