import type { Metadata } from 'next'
import { SkillsPage } from '@/components/sections/SkillsPage'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technical skills across cybersecurity, AI/ML, programming, and tools — including Python, Network Security, Computer Vision, and NLP.',
}

export default function Skills() {
  return <SkillsPage />
}
