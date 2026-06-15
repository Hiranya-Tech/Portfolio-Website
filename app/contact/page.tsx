import type { Metadata } from 'next'
import { ContactPageContent } from '@/components/sections/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for internships, research collaborations, or to discuss cybersecurity and AI.',
}

export default function Contact() {
  return <ContactPageContent />
}
