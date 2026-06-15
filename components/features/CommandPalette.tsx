'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Code2, User, Briefcase, BookOpen, Mail, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const PALETTE_ITEMS = [
  { id: 'home', label: 'Go to Home', href: '/', icon: <Code2 size={16} />, category: 'Navigation' },
  { id: 'about', label: 'About Hiranmai', href: '/about', icon: <User size={16} />, category: 'Navigation' },
  { id: 'projects', label: 'View Projects', href: '/projects', icon: <Code2 size={16} />, category: 'Navigation' },
  { id: 'skills', label: 'Skills & Technologies', href: '/skills', icon: <Code2 size={16} />, category: 'Navigation' },
  { id: 'experience', label: 'Work Experience', href: '/experience', icon: <Briefcase size={16} />, category: 'Navigation' },
  { id: 'blog', label: 'Blog Posts', href: '/blog', icon: <BookOpen size={16} />, category: 'Navigation' },
  { id: 'contact', label: 'Get in Touch', href: '/contact', icon: <Mail size={16} />, category: 'Navigation' },
  { id: 'resume', label: 'Download Resume', href: '/resume', icon: <FileText size={16} />, category: 'Navigation' },
  { id: 'faceshield', label: 'FaceShield AI', href: '/projects/faceshield-ai', icon: <Code2 size={16} />, category: 'Projects' },
  { id: 'analyzer', label: 'AI Resume Analyzer', href: '/projects/ai-resume-analyzer', icon: <Code2 size={16} />, category: 'Projects' },
  { id: 'phishing', label: 'Phishing Detection', href: '/projects/phishing-website-detection', icon: <Code2 size={16} />, category: 'Projects' },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const router = useRouter()

  const filtered = query.trim()
    ? PALETTE_ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : PALETTE_ITEMS

  const navigate = useCallback(
    (href: string) => {
      setOpen(false)
      setQuery('')
      router.push(href)
    },
    [router]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
        setSelected(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((v) => Math.min(v + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((v) => Math.max(v - 1, 0))
      }
      if (e.key === 'Enter' && filtered[selected]) {
        navigate(filtered[selected].href)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, selected, navigate])

  useEffect(() => setSelected(0), [query])

  const categories = [...new Set(filtered.map((i) => i.category))]

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 z-[201] w-full max-w-lg"
          >
            <div className="glass rounded-2xl border border-border shadow-card overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
                <Search size={16} className="text-foreground-muted flex-shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, projects..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground-subtle outline-none"
                />
                <button onClick={() => setOpen(false)} className="text-foreground-subtle hover:text-foreground transition-colors">
                  <X size={14} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="text-center text-sm text-foreground-muted py-8">No results found</p>
                ) : (
                  categories.map((cat) => (
                    <div key={cat}>
                      <p className="px-4 py-2 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
                        {cat}
                      </p>
                      {filtered
                        .filter((i) => i.category === cat)
                        .map((item, idx) => {
                          const globalIdx = filtered.indexOf(item)
                          return (
                            <button
                              key={item.id}
                              onClick={() => navigate(item.href)}
                              onMouseEnter={() => setSelected(globalIdx)}
                              className={cn(
                                'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors',
                                selected === globalIdx
                                  ? 'bg-accent/10 text-foreground'
                                  : 'text-foreground-muted hover:text-foreground'
                              )}
                            >
                              <span className={cn(selected === globalIdx ? 'text-accent' : 'text-foreground-subtle')}>
                                {item.icon}
                              </span>
                              {item.label}
                            </button>
                          )
                        })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2.5 border-t border-border flex items-center gap-4 text-[11px] text-foreground-subtle">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>Esc Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
