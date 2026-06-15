import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // First increment download counter in analytics
    await supabase.from('analytics').insert([
      {
        event_type: 'resume_download',
        metadata: { timestamp: new Date().toISOString() }
      }
    ])

    // Try to get resume URL from storage
    // Assumes bucket name is 'resumes' and file is 'resume.pdf'
    // This is wrapped in a try/catch in the client anyway
    const { data } = await supabase
      .storage
      .from('resumes')
      .getPublicUrl('resume.pdf')

    if (!data.publicUrl) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    return NextResponse.json({ url: data.publicUrl })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
