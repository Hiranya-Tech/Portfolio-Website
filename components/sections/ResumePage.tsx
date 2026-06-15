'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, CheckCircle, Info } from 'lucide-react'
import { toast } from 'sonner'

export function ResumePage() {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const res = await fetch('/api/resume/download')
      const data = await res.json()
      if (data.url) {
        window.open(data.url, '_blank')
        toast.success('Resume opened — download from your browser.')
      } else {
        toast.error('Resume not yet uploaded. Check back soon.')
      }
    } catch {
      toast.error('Failed to fetch resume. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="pt-28 pb-24">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">// resume</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">
              Resume
            </h1>
            <p className="text-foreground-muted">
              ATS-optimized · Updated 2026
            </p>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-all duration-200 shadow-glow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            {downloading ? 'Fetching...' : 'Download PDF'}
          </button>
        </motion.div>

        {/* ATS note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20 mb-8"
        >
          <CheckCircle size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <span className="font-medium text-emerald-400">ATS Optimized</span>
            <span className="text-foreground-muted ml-2">
              This resume is formatted for clean parsing by Workday, Greenhouse, Taleo, and similar ATS systems.
              Single-column layout, standard section headers, no tables or graphics.
            </span>
          </div>
        </motion.div>

        {/* PDF viewer area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-2xl border border-border overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
            <FileText size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Hiranmai_Choppavarapu_Resume.pdf</span>
          </div>

          {/* Resume preview placeholder — populated when PDF is uploaded to Supabase */}
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent-muted border border-accent/20 flex items-center justify-center mb-6">
              <FileText size={28} className="text-accent" />
            </div>
            <h2 className="font-display text-xl font-semibold mb-3">Resume Preview</h2>
            <p className="text-foreground-muted text-sm max-w-sm mb-6">
              Upload your resume PDF to Supabase Storage (bucket: <code className="text-accent font-mono bg-accent/10 px-1 py-0.5 rounded text-xs">resumes</code>) to enable the inline viewer and download.
            </p>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/8 border border-blue-500/20 text-left max-w-sm">
              <Info size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-foreground-muted">
                Go to <strong className="text-foreground">Admin → Resume</strong> to upload your PDF. Once uploaded, this view will display the embedded PDF automatically.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
