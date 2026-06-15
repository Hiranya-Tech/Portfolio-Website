import type { Metadata } from 'next'
import { ProjectsPage } from '@/components/sections/ProjectsPage'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Engineering case studies: FaceShield AI, AI Resume Analyzer, and Phishing Website Detection — AI security and ML projects by Hiranmai Choppavarapu.',
}

export default function Projects() {
  return <ProjectsPage />
}
