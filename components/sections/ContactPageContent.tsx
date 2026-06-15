'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Github, Linkedin, Send, MapPin, MessageSquare } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/utils'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

export function ContactPageContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!res.ok) throw new Error('Failed to send message')
      
      toast.success('Message sent successfully! I will get back to you soon.')
      reset()
    } catch (error) {
      toast.error('Failed to send message. Please try emailing directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-28 pb-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">// contact</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Get in <span className="gradient-text-accent">Touch</span>
          </h1>
          <p className="text-foreground-muted max-w-xl text-base">
            Open to internships, research collaborations, and conversations about cybersecurity,
            AI security, or software engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                  <MessageSquare className="text-accent" />
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-4 p-4 glass glass-hover rounded-xl border border-border transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Email</p>
                      <p className="text-sm text-foreground-muted">{SITE_CONFIG.email}</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-4 p-4 glass rounded-xl border border-border">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Location</p>
                      <p className="text-sm text-foreground-muted">{SITE_CONFIG.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold mb-6">Social Profiles</h3>
                <div className="flex gap-4">
                  <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 glass glass-hover rounded-xl border border-border text-foreground-muted hover:text-foreground transition-all">
                    <Github size={20} />
                  </a>
                  <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 glass glass-hover rounded-xl border border-border text-foreground-muted hover:text-foreground transition-all">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl border border-border p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground-muted mb-2">Name</label>
                  <input
                    id="name"
                    {...register('name')}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground-muted mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground-muted mb-2">Subject</label>
                <input
                  id="subject"
                  {...register('subject')}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="Internship Opportunity / Research Collaboration"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground-muted mb-2">Message</label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-y"
                  placeholder="Hello Hiranmai, I'm reaching out about..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-glow-sm"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
