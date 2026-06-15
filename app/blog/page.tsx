import type { Metadata } from 'next'
import { BlogListPage } from '@/components/sections/BlogListPage'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on cybersecurity, AI security, phishing detection, OWASP, and building secure systems by Hiranmai Choppavarapu.',
}

export default function Blog() {
  return <BlogListPage />
}
