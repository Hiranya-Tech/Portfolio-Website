import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/AboutHero'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Hiranmai Choppavarapu — cybersecurity student, AI security enthusiast, and Operations Manager at E-Cell Alliance University.',
}

export default function AboutPage() {
  return <AboutHero />
}
