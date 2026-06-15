'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react'

interface PostProps {
  post: {
    title: string
    content: string
    category: string
    publishedAt: string
    readingTime: number
    tags: string[]
  }
}

export function BlogPostPage({ post }: PostProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scroll = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress((scroll / height) * 100)
    }
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
      </div>

      <article className="pt-28 pb-24">
        <div className="section-container max-w-3xl">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-10"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              All Articles
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 pb-10 border-b border-border"
          >
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-subtle mb-6">
              <span className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs">
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

            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="text-xs text-foreground-subtle bg-white/5 px-2 py-1 rounded border border-border before:content-['#']">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-foreground-subtle">
                <button className="p-2 glass rounded-lg hover:text-accent transition-colors"><Twitter size={16} /></button>
                <button className="p-2 glass rounded-lg hover:text-accent transition-colors"><Linkedin size={16} /></button>
                <button className="p-2 glass rounded-lg hover:text-accent transition-colors"><Share2 size={16} /></button>
              </div>
            </div>
          </motion.header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert prose-blue max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl prose-p:text-foreground-muted prose-p:leading-relaxed prose-a:text-accent prose-strong:text-foreground"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </motion.div>
        </div>
      </article>
    </>
  )
}
