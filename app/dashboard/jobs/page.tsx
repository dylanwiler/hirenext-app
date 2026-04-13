'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { Briefcase, Plus, Users, Mic, ChevronRight, Circle } from 'lucide-react'

interface Job {
  id: string
  title: string
  location: string
  employment_type: string
  status: string
  candidate_count: number
  interview_count: number
  created_at: string
  ziprecruiter_job_id: string | null
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.from('jobs').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setJobs(data); setLoading(false); })
  }, [])

  function statusColor(s: string) {
    if (s === 'active') return '#1D9E75'
    if (s === 'paused') return '#F59E0B'
    return '#4A4845'
  }

  if (loading) return (
    <div className="flex h-full items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: '#1D9E75', borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div>
          <h1 className="font-display font-extrabold text-xl" style={{ color: '#F0EFEA' }}>Jobs</h1>
          <p className="text-sm mt-0.5" style={{ color: '#4A4845' }}>{jobs.length} active role{jobs.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/dashboard/jobs/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={14} /> Post a Job
        </Link>
      </div>

      <div className="px-7 py-6">
        {jobs.length === 0 ? (
          <div className="card p-10 text-center" style={{ borderColor: 'rgba(29,158,117,0.15)', background: 'rgba(29,158,117,0.03)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(29,158,117,0.1)' }}>
              <Briefcase size={22} style={{ color: '#1D9E75' }} />
            </div>
            <h2 className="font-display font-bold text-lg mb-2" style={{ color: '#F0EFEA' }}>No jobs posted yet</h2>
            <p className="text-sm mb-6" style={{ color: '#4A4845' }}>Post your first role and let AI screen, score, and interview candidates automatically.</p>
            <Link href="/dashboard/jobs/new" className="btn-primary inline-flex items-center gap-2">
              <Plus size={14} /> Post a Job
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map(job => (
              <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
                <div className="card p-5 flex items-center justify-between hover:border-opacity-30 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(29,158,117,0.1)' }}>
                      <Briefcase size={18} style={{ color: '#1D9E75' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-0.5" style={{ color: '#F0EFEA' }}>{job.title}</h3>
                      <p className="text-xs" style={{ color: '#4A4845' }}>{job.location} · {job.employment_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="font-bold text-sm" style={{ color: '#F0EFEA' }}>{job.candidate_count || 0}</p>
                      <p className="text-xs" style={{ color: '#4A4845' }}>Applicants</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-sm" style={{ color: '#F0EFEA' }}>{job.interview_count || 0}</p>
                      <p className="text-xs" style={{ color: '#4A4845' }}>Interviewed</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Circle size={7} fill={statusColor(job.status)} style={{ color: statusColor(job.status) }} />
                      <span className="text-xs capitalize" style={{ color: statusColor(job.status) }}>{job.status}</span>
                    </div>
                    <ChevronRight size={14} style={{ color: '#4A4845' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}