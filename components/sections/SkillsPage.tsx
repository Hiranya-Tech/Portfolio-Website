'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Category = 'all' | 'cybersecurity' | 'programming' | 'ai-ml' | 'tools' | 'soft-skills'

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'ai-ml', label: 'AI & ML' },
  { id: 'programming', label: 'Programming' },
  { id: 'tools', label: 'Tools' },
  { id: 'soft-skills', label: 'Soft Skills' },
]

const SKILLS = [
  // Cybersecurity
  { name: 'Network Security', cat: 'cybersecurity', level: 70, desc: 'TCP/IP, firewalls, IDS/IPS, traffic analysis', usedIn: 'Academic projects, self-study' },
  { name: 'Vulnerability Assessment', cat: 'cybersecurity', level: 65, desc: 'Identifying and evaluating security weaknesses', usedIn: 'Academic projects' },
  { name: 'Penetration Testing', cat: 'cybersecurity', level: 60, desc: 'Nmap, Metasploit, Burp Suite fundamentals', usedIn: 'CTF practice, self-study' },
  { name: 'Linux Security', cat: 'cybersecurity', level: 75, desc: 'Hardening, permissions, security configuration', usedIn: 'FaceShield AI, daily driver' },
  { name: 'Threat Detection', cat: 'cybersecurity', level: 65, desc: 'IOC identification and detection logic', usedIn: 'Phishing Detection, FaceShield AI' },
  { name: 'Identity Protection', cat: 'cybersecurity', level: 70, desc: 'Anti-fraud, auth systems, digital identity', usedIn: 'FaceShield AI' },
  { name: 'Security Fundamentals', cat: 'cybersecurity', level: 80, desc: 'CIA triad, cryptography, OWASP Top 10', usedIn: 'Academic study' },
  // Programming
  { name: 'Python', cat: 'programming', level: 85, desc: 'Primary language for ML, scripting, automation', usedIn: 'All projects' },
  { name: 'C++', cat: 'programming', level: 65, desc: 'Systems programming, data structures, algorithms', usedIn: 'Academic coursework' },
  { name: 'SQL', cat: 'programming', level: 70, desc: 'Database design, queries, Supabase integration', usedIn: 'Portfolio, academic' },
  { name: 'JavaScript', cat: 'programming', level: 70, desc: 'Frontend, Next.js, web application logic', usedIn: 'Portfolio, web projects' },
  // AI & ML
  { name: 'Machine Learning', cat: 'ai-ml', level: 75, desc: 'Supervised/unsupervised learning, scikit-learn', usedIn: 'Phishing Detection, AI Resume Analyzer' },
  { name: 'Computer Vision', cat: 'ai-ml', level: 70, desc: 'Image processing, face detection, OpenCV', usedIn: 'FaceShield AI' },
  { name: 'NLP', cat: 'ai-ml', level: 70, desc: 'Text processing, NER, keyword extraction, spaCy', usedIn: 'AI Resume Analyzer' },
  { name: 'Data Analysis', cat: 'ai-ml', level: 75, desc: 'EDA, pandas, NumPy, data visualization', usedIn: 'All ML projects' },
  { name: 'Data Preprocessing', cat: 'ai-ml', level: 80, desc: 'Feature engineering, normalization, missing data', usedIn: 'Phishing Detection, AI Resume Analyzer' },
  // Tools
  { name: 'Linux', cat: 'tools', level: 80, desc: 'Daily OS for development and security work', usedIn: 'Development' },
  { name: 'Git & GitHub', cat: 'tools', level: 80, desc: 'Version control, branching, collaboration', usedIn: 'All projects' },
  { name: 'VS Code', cat: 'tools', level: 90, desc: 'Primary IDE with debugging and extensions', usedIn: 'All projects' },
  { name: 'Postman', cat: 'tools', level: 70, desc: 'API testing and documentation', usedIn: 'FaceShield AI, portfolio API' },
  { name: 'Vercel', cat: 'tools', level: 75, desc: 'Next.js deployment and edge functions', usedIn: 'Portfolio' },
  // Soft Skills
  { name: 'Leadership', cat: 'soft-skills', level: 80, desc: 'Led teams as Operations Manager at E-Cell', usedIn: 'E-Cell Alliance University' },
  { name: 'Communication', cat: 'soft-skills', level: 85, desc: 'Cross-functional coordination, industry presentations', usedIn: 'E-Cell, academic' },
  { name: 'Team Management', cat: 'soft-skills', level: 75, desc: 'Volunteer and staff coordination for events', usedIn: 'E-Cell Alliance University' },
  { name: 'Problem Solving', cat: 'soft-skills', level: 85, desc: 'Systematic approach to technical and operational problems', usedIn: 'All projects' },
  { name: 'Project Management', cat: 'soft-skills', level: 75, desc: 'Multi-stakeholder event planning and delivery', usedIn: 'E-Cell Alliance University' },
]

const CAT_COLORS: Record<string, { bar: string; badge: string }> = {
  cybersecurity: { bar: 'bg-blue-500', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  programming: { bar: 'bg-emerald-500', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  'ai-ml': { bar: 'bg-violet-500', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
  tools: { bar: 'bg-orange-500', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  'soft-skills': { bar: 'bg-pink-500', badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
}

export function SkillsPage() {
  const [active, setActive] = useState<Category>('all')
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = active === 'all' ? SKILLS : SKILLS.filter((s) => s.cat === active)

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
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">// skills</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Skills & <span className="gradient-text-accent">Technologies</span>
          </h1>
          <p className="text-foreground-muted max-w-xl text-base">
            Proficiency levels reflect honest self-assessment — not marketing. Each skill is tied to
            real project usage or structured study.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
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

        {/* Skills grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => {
              const colors = CAT_COLORS[skill.cat]
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHovered(skill.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="glass glass-hover rounded-xl border border-border p-5 group"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-foreground-muted mt-0.5">{skill.desc}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors.badge} ml-3 flex-shrink-0`}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-3">
                    <motion.div
                      className={`h-full ${colors.bar} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                    />
                  </div>

                  {/* Used in */}
                  <p className="text-xs text-foreground-subtle">
                    Used in: <span className="text-foreground-muted">{skill.usedIn}</span>
                  </p>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
