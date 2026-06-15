'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/data'
import { formatDate } from '@/lib/utils'

const CATS = ['All', 'Cybersecurity', 'AI Security']

export function BlogListPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === active)

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
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">// thoughts</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Writing & <span className="gradient-text-accent">Research</span>
          </h1>
          <p className="text-foreground-muted max-w-xl text-base">
            Articles, tutorials, and notes on cybersecurity, artificial intelligence, and building
            secure systems.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-accent text-white shadow-glow-sm'
                  : 'glass border border-border text-foreground-muted hover:text-foreground hover:border-border-hover'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full group">
                  <article className="h-full glass glass-hover rounded-2xl border border-border p-6 md:p-8 flex flex-col transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-subtle mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.readingTime} min read
                      </div>
                    </div>
                    
                    <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h2>
                    
                    <p className="text-sm text-foreground-muted leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border">
                      {post.tags.map((t) => (
                        <span key={t} className="text-[11px] text-foreground-subtle before:content-['#']">
                          {t}
                        </span>
                      ))}
                      <span className="ml-auto text-xs font-medium text-foreground-muted group-hover:text-accent transition-colors flex items-center gap-1">
                        Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
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
