import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, location, employment_type, salary_min, salary_max, salary_type, description, requirements, user_id } = body

  if (!title || !location || !description || !user_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // 1. Save job to Supabase first
  const { data: job, error: dbError } = await supabase.from('jobs').insert({
    user_id,
    title,
    location,
    employment_type,
    salary_min: salary_min ? Number(salary_min) : null,
    salary_max: salary_max ? Number(salary_max) : null,
    salary_type,
    description,
    requirements,
    status: 'active',
    candidate_count: 0,
    interview_count: 0,
  }).select().single()

  if (dbError) {
    console.error('DB error:', dbError)
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  // 2. Post to ZipRecruiter
  const zipKey = process.env.ZIPRECRUITER_API_KEY
  if (zipKey) {
    try {
      const salaryText = salary_min && salary_max
        ? `${salary_type === 'Hourly' ? '$' + salary_min + '-$' + salary_max + '/hr' : '$' + salary_min + 'k-$' + salary_max + 'k/yr'}`
        : ''

      const zipPayload = {
        title,
        location,
        employment_type: employment_type.toLowerCase().replace('-', '_'),
        description: [description, requirements ? '\n\nRequirements:\n' + requirements : ''].join(''),
        ...(salary_min && { compensation: salary_min }),
        ...(salary_max && { compensation_max: salary_max }),
        ...(salary_type === 'Hourly' && { compensation_type: 'hourly' }),
      }

      const zipRes = await fetch('https://api.ziprecruiter.com/jobs/v1', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${zipKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(zipPayload)
      })

      if (zipRes.ok) {
        const zipData = await zipRes.json()
        // Update job with ZipRecruiter ID
        await supabase.from('jobs').update({ ziprecruiter_job_id: zipData.id }).eq('id', job.id)
        job.ziprecruiter_job_id = zipData.id
      } else {
        // Job saved locally even if ZipRecruiter fails
        console.error('ZipRecruiter error:', await zipRes.text())
      }
    } catch (e) {
      console.error('ZipRecruiter exception:', e)
    }
  }

  return NextResponse.json({ job })
}