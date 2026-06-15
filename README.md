# Hiranmai Choppavarapu — Cybersecurity Portfolio

Production-ready Next.js 15 portfolio tailored for a cybersecurity engineer and AI security enthusiast. Built with Next.js App Router, Tailwind CSS, Framer Motion, and Supabase.

## Features

- **Cybersecurity Aesthetic**: Dark luxury theme, glassmorphism, subtle glowing effects
- **Interactive Terminal**: Hidden terminal interface (try typing \`help\`)
- **Command Palette**: Press \`Ctrl+K\` or \`Cmd+K\` for quick navigation
- **Engineering Case Studies**: Projects are presented as comprehensive case studies
- **ATS-Optimized Resume**: Inline PDF viewer with tracked downloads
- **Supabase Backend**: Fully functional contact form, admin dashboard, and view analytics
- **SEO Optimized**: Complete metadata, JSON-LD schema, and semantic HTML

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Database / Auth**: Supabase
- **Deployment**: Vercel

## Local Development

1. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure Environment Variables**
   Rename \`.env.example\` to \`.env.local\` and fill in the required values:
   - Create a project on [Supabase](https://supabase.com)
   - Get your URL and Anon Key from Project Settings -> API
   - Set your admin email address

3. **Set up Supabase Database**
   - Go to your Supabase project dashboard -> SQL Editor
   - Paste the contents of \`supabase/migrations/001_initial_schema.sql\` and run it
   - This will create all tables, RLS policies, and seed data

4. **Upload Resume**
   - Go to Supabase -> Storage
   - Ensure a bucket named \`resumes\` exists and is public
   - Upload your ATS-optimized PDF as \`resume.pdf\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Visit \`http://localhost:3000\`

## Admin Dashboard

Access the secure admin dashboard at \`/admin/login\`. You must authenticate using the email address defined in \`NEXT_PUBLIC_ADMIN_EMAIL\` and a password you set up in Supabase Authentication.

## Deployment

This project is optimized for deployment on Vercel. Connect your GitHub repository to Vercel and ensure all environment variables are added to the Vercel project settings.
