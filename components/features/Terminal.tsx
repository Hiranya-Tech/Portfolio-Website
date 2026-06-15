'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const COMMANDS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  about      — Who is Hiranmai?',
    '  skills     — Technical skill areas',
    '  projects   — Active projects',
    '  contact    — Get in touch',
    '  clear      — Clear terminal',
  ],
  about: [
    'Hiranmai Choppavarapu',
    'Bangalore, India',
    '',
    'Cybersecurity student at Alliance University.',
    'Building AI-powered security tools.',
    'Operations Manager at E-Cell — leading teams,',
    'organising innovation programs, coordinating',
    'industry professionals.',
    '',
    'Currently exploring: threat detection, identity',
    'protection, and AI in cybersecurity.',
  ],
  skills: [
    'Cybersecurity:  Network Security · Pen Testing',
    '                Threat Detection · Linux Security',
    '',
    'Programming:    Python · C++ · SQL · JavaScript',
    '',
    'AI / ML:        Computer Vision · NLP',
    '                Machine Learning · Data Analysis',
    '',
    'Tools:          Linux · Git · VS Code · Vercel',
  ],
  projects: [
    '1. FaceShield AI',
    '   AI identity protection using computer vision',
    '   → /projects/faceshield-ai',
    '',
    '2. AI Resume Analyzer',
    '   NLP-powered ATS optimization tool',
    '   → /projects/ai-resume-analyzer',
    '',
    '3. Phishing Website Detection',
    '   ML classifier for phishing URL analysis',
    '   → /projects/phishing-website-detection',
  ],
  contact: [
    `Email:    ${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hiranmai@example.com'}`,
    `LinkedIn: linkedin.com/in/hiranmai-choppavarapu`,
    `GitHub:   github.com/hiranmai-choppavarapu`,
    '',
    'Or use the contact form at /contact',
  ],
}

export function Terminal() {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'Hiranmai Choppavarapu — Cybersecurity Portfolio' },
    { type: 'output', text: 'Type "help" to see available commands.' },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newHistory = [...history, { type: 'input' as const, text: cmd }]

    if (trimmed === 'clear') {
      setHistory([{ type: 'output', text: 'Terminal cleared.' }])
    } else if (COMMANDS[trimmed]) {
      COMMANDS[trimmed].forEach((line) => newHistory.push({ type: 'output', text: line }))
      setHistory(newHistory)
    } else if (trimmed === '') {
      setHistory(newHistory)
    } else {
      newHistory.push({ type: 'output', text: `Command not found: "${trimmed}". Type "help".` })
      setHistory(newHistory)
    }

    setCmdHistory((prev) => [cmd, ...prev])
    setHistIdx(-1)
    setInput('')
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { run(input); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(next)
      setInput(cmdHistory[next] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : cmdHistory[next])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-2xl border border-border overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background-secondary/50">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-foreground-subtle font-mono">portfolio@hiranmai ~ </span>
      </div>

      {/* Output */}
      <div className="p-4 h-64 overflow-y-auto font-mono text-sm scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className={line.type === 'input' ? 'text-accent' : 'text-foreground-muted'}>
            {line.type === 'input' && <span className="text-violet mr-2">❯</span>}
            {line.text || '\u00a0'}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
        <span className="text-violet font-mono text-sm">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a command..."
          className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-foreground-subtle outline-none"
          spellCheck={false}
          autoComplete="off"
        />
        <span className="w-2 h-4 bg-accent animate-cursor-blink" />
      </div>
    </motion.div>
  )
}
