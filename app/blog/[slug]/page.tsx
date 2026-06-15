import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostPage } from '@/components/sections/BlogPostPage'

import { BLOG_POSTS } from '@/lib/data'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }
  return { title: post.title, description: post.excerpt }
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()
  return <BlogPostPage post={post} />
}
