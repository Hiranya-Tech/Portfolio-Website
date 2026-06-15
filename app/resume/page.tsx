import type { Metadata } from 'next'
import { ResumePage } from '@/components/sections/ResumePage'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'View and download Hiranmai Choppavarapu\'s ATS-optimized resume — cybersecurity engineer and AI security enthusiast.',
}

export default function Resume() {
  return <ResumePage />
}
