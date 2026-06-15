import type { Metadata } from 'next'
import { ExperiencePage } from '@/components/sections/ExperiencePage'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Operations Manager at E-Cell Alliance University — managing entrepreneurship events, coordinating teams, and working with industry professionals.',
}

export default function Experience() {
  return <ExperiencePage />
}
