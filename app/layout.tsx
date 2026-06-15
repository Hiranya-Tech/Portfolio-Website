import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Syne } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { CommandPalette } from '@/components/features/CommandPalette'
import { Toaster } from 'sonner'
import { SITE_CONFIG } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Hiranmai Choppavarapu — Cybersecurity Engineer & AI Security Enthusiast',
    template: '%s | Hiranmai Choppavarapu',
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: 'Hiranmai Choppavarapu', url: SITE_CONFIG.url }],
  creator: 'Hiranmai Choppavarapu',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'Hiranmai Choppavarapu — Cybersecurity Engineer & AI Security Enthusiast',
    description: SITE_CONFIG.description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hiranmai Choppavarapu' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hiranmai Choppavarapu — Cybersecurity Engineer',
    description: SITE_CONFIG.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: '',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hiranmai Choppavarapu',
  url: SITE_CONFIG.url,
  jobTitle: 'Cybersecurity Engineer & AI Security Enthusiast',
  description: SITE_CONFIG.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
  sameAs: [SITE_CONFIG.linkedin, SITE_CONFIG.github],
  knowsAbout: [
    'Cybersecurity',
    'Network Security',
    'Machine Learning',
    'Computer Vision',
    'Python',
    'AI Security',
    'Penetration Testing',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={SITE_CONFIG.url} />
      </head>
      <body className="bg-background text-foreground antialiased font-sans selection:bg-accent/30 selection:text-accent">
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CommandPalette />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111827',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#F8FAFC',
            },
          }}
        />
      </body>
    </html>
  )
}
