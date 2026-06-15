import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { SkillsSnapshot } from '@/components/sections/SkillsSnapshot'
import { JourneyTimeline } from '@/components/sections/JourneyTimeline'
import { HomeTerminal } from '@/components/sections/HomeTerminal'
import { ContactCTA } from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Hiranmai Choppavarapu — Cybersecurity Engineer & AI Security Enthusiast',
  description:
    'Cybersecurity engineer and AI security enthusiast building intelligent security systems. Explore projects in AI identity protection, phishing detection, and NLP-powered tools.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <SkillsSnapshot />
      <HomeTerminal />
      <JourneyTimeline />
      <ContactCTA />
    </>
  )
}
