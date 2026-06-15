'use client'

import { motion } from 'framer-motion'

const SKILL_GROUPS = [
  {
    label: 'Cybersecurity',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    skills: ['Network Security', 'Vulnerability Assessment', 'Pen Testing', 'Threat Detection', 'Linux Security'],
  },
  {
    label: 'AI & Machine Learning',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    skills: ['Machine Learning', 'Computer Vision', 'NLP', 'Data Analysis', 'Feature Engineering'],
  },
  {
    label: 'Programming',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    skills: ['Python', 'C++', 'SQL', 'JavaScript', 'TypeScript'],
  },
  {
    label: 'Tools & Platform',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    skills: ['Linux', 'Git', 'VS Code', 'Postman', 'Vercel'],
  },
]

export function SkillsSnapshot() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">// skills</p>
          <h2 className="font-display text-3xl font-bold">
            Tools of the <span className="gradient-text-accent">trade</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.1 }}
              className="glass rounded-2xl border border-border p-5"
            >
              <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${group.color}`}>
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-xs px-2.5 py-1 rounded-lg border ${group.bg} text-foreground-muted`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
