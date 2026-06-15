'use client'

import Link from 'next/link'
import { Shield, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/utils'

const FOOTER_LINKS = {
  Navigation: [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Skills', href: '/skills' },
    { label: 'Experience', href: '/experience' },
  ],
  Content: [
    { label: 'Blog', href: '/blog' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-24">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-accent-muted border border-accent/30 flex items-center justify-center">
                <Shield size={16} className="text-accent" />
              </div>
              <span className="font-display font-semibold text-sm">
                Hiranmai<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed max-w-xs">
              Cybersecurity engineer and AI security enthusiast. Building systems that make the internet safer.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass glass-hover text-foreground-muted hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass glass-hover text-foreground-muted hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="p-2 rounded-lg glass glass-hover text-foreground-muted hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-foreground-subtle uppercase tracking-widest mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted hover:text-foreground transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground-subtle">
            © {year} Hiranmai Choppavarapu. Built with Next.js & Supabase.
          </p>
          <p className="text-xs text-foreground-subtle">
            Bangalore, India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  )
}
