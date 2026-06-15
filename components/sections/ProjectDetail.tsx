'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Github } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/utils'

interface Feature { label: string; desc: string }

interface ProjectData {
  slug: string
  title: string
  category: string
  status: 'Completed' | 'In Progress' | 'Planned'
  description: string
  problem: string
  research: string
  architecture: string
  challenges: string
  lessons: string
  future: string
  tech: string[]
  features: Feature[]
}

interface Props { project: ProjectData }

const SECTIONS = [
  { key: 'problem', label: 'Problem Statement' },
  { key: 'research', label: 'Research' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'challenges', label: 'Challenges' },
  { key: 'lessons', label: 'Lessons Learned' },
  { key: 'future', label: 'Future Improvements' },
] as const

export function ProjectDetail({ project }: Props) {
  return (
    <div className="pt-28 pb-24">
      <div className="section-container">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            All Projects
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono">
              {project.category}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              {project.status}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-foreground-muted text-lg max-w-2xl leading-relaxed mb-6">
            {project.description}
          </p>
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border hover:border-border-hover text-foreground-muted hover:text-foreground text-sm transition-all duration-200"
            >
              <Github size={16} />
              View on GitHub
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  {section.label}
                </h2>
                <div className="prose prose-sm max-w-none text-foreground-muted leading-relaxed">
                  {project[section.key].split('\n\n').map((para, pi) => (
                    <p key={pi} className="mb-4 last:mb-0">
                      {para.split('\n').map((line, li) => {
                        const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-medium">$1</strong>')
                        return (
                          <span
                            key={li}
                            dangerouslySetInnerHTML={{ __html: bold + (li < line.length - 1 ? '<br/>' : '') }}
                          />
                        )
                      })}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="glass rounded-xl border border-border p-5 sticky top-24"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent">
                    {t}
                  </span>
                ))}
              </div>

              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle mb-4">
                Key Features
              </h3>
              <div className="space-y-3">
                {project.features.map((f) => (
                  <div key={f.label} className="border-l-2 border-accent/30 pl-3">
                    <p className="text-sm font-medium text-foreground">{f.label}</p>
                    <p className="text-xs text-foreground-muted mt-0.5">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
