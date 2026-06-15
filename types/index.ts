// ============================================================
// TYPE DEFINITIONS — Hiranmai Choppavarapu Portfolio
// ============================================================

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  long_description?: string
  challenge?: string
  solution?: string
  architecture?: string
  lessons_learned?: string
  future_improvements?: string
  features: ProjectFeature[]
  tech_stack: string[]
  category: 'cybersecurity' | 'ai-security' | 'ml' | 'tools'
  status: 'completed' | 'in-progress' | 'planned'
  github_url?: string
  demo_url?: string
  cover_image?: string
  screenshots: string[]
  view_count: number
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProjectFeature {
  label: string
  description: string
}

export interface Skill {
  id: string
  name: string
  category: 'cybersecurity' | 'programming' | 'ai-ml' | 'tools' | 'soft-skills'
  proficiency: number
  icon?: string
  description?: string
  used_in: string[]
  sort_order: number
  is_visible: boolean
  created_at: string
}

export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image?: string
  category: string
  tags: string[]
  reading_time: number
  is_published: boolean
  view_count: number
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  replied_at?: string
  created_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  description?: string
  updated_at: string
}

export interface Analytics {
  id: string
  event_type: 'page_view' | 'resume_download' | 'project_view' | 'blog_view' | 'contact_submit'
  resource_id?: string
  resource_slug?: string
  metadata: Record<string, unknown>
  created_at: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface NavItem {
  label: string
  href: string
  description?: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
  type: 'education' | 'work' | 'project' | 'achievement' | 'future'
}

export interface TerminalCommand {
  command: string
  output: string | string[]
}
