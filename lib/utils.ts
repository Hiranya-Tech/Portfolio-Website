import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export const SITE_CONFIG = {
  name: 'Hiranmai Choppavarapu',
  title: 'Cybersecurity Engineer & AI Security Enthusiast',
  description:
    'Building secure systems, intelligent solutions, and the future of digital trust.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hiranmai.dev',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hiranmai@example.com',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://linkedin.com/in/hiranmai-choppavarapu',
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/hiranmai-choppavarapu',
  location: 'Bangalore, India',
  keywords: [
    'Cybersecurity Engineer',
    'Security Researcher',
    'SOC Analyst',
    'Threat Detection',
    'Python Developer',
    'AI Security',
    'Computer Vision',
    'Machine Learning',
    'Network Security',
    'Penetration Testing',
    'Digital Identity Protection',
    'Software Engineer',
    'Hiranmai Choppavarapu',
  ],
}
