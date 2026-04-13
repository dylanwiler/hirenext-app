'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { ArrowLeft, Briefcase, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship']
const SALARY_TYPES = ['Hourly', 'Annual']

export default function NewJobPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    location: '',
    employment_type: 'Full-time',
    salary_min: '',
    salary_max: '',
    salary_type: 'Hourly',
    description: '',
    requirements: '',
  })

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.location || !form.description) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { toast.error('Not authenticated'); setLoading(false); return }

    const res = await fetch('/api/jobs/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, user_id: session.user.id })
    })

    const result = await res.json()

    if (!res.ok) {
      toast.error(result.error || 'Failed to create job')
      setLoading(false)
      return
    }

    toast.success('Job posted successfully!')
    router.push('/dashboard/jobs')
  }

  return (
    <div className="page-enter">
      <div className="flex items-center gap-4 px-7 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link href="/dashboard/jobs" className="p-1.5 rounded-lg transition-colors" style={{ color: '#4A4845' }}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-display font-extrabold text-xl" style={{ color: '#F0EFEA' }}>Post a Job</h1>
          <p className="text-sm mt-0.5" style={{ color: '#4A4845' }}>Fill in the details and we'll post it to ZipRecruiter</p>
        </div>
      </div>

      <div className="px-7 py-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="card p-5 space-y-4">
            <p className="text-xs font-semibold tracking-wider" style={{ color: '#4A4845' }}>ROLE DETAILS</p>
            
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Job Title <span style={{ color: '#1D9E75' }}>*</span></label>
              <input className="input" placeholder="e.g. Appointment Setter" value={form.title} onChange={e => set('title', e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Location <span style={{ color: '#1D9E75' }}>*</span></label>
                <input className="input" placeholder="e.g. Remote, Portland OR" value={form.location} onChange={e => set('location', e.target.value)} required />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Employment Type</label>
                <select className="input" value={form.employment_type} onChange={e => set('employment_type', e.target.value)}>
                  {EMPLOYMENT_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Salary Min</label>
                <input className="input" type="number" placeholder="20" value={form.salary_min} onChange={e => set('salary_min', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Salary Max</label>
                <input className="input" type="number" placeholder="35" value={form.salary_max} onChange={e => set('salary_max', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Type</label>
                <select className="input" value={form.salary_type} onChange={e => set('salary_type', e.target.value)}>
                  {SALARY_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="card p-5 space-y-4">
            <p className="text-xs font-semibold tracking-wider" style={{ color: '#4A4845' }}>JOB DESCRIPTION</p>
            
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Description <span style={{ color: '#1D9E75' }}>*</span></label>
              <textarea
                className="input min-h-32 resize-y"
                placeholder="Describe the role, responsibilities, and what success looks like in the first 90 days..."
                value={form.description}
                onChange={e => set('description', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Requirements</label>
              <textarea
                className="input min-h-24 resize-y"
                placeholder="List required skills, experience, or qualifications..."
                value={form.requirements}
                onChange={e => set('requirements', e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href="/dashboard/jobs" className="text-sm" style={{ color: '#4A4845' }}>Cancel</Link>
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-40">
              {loading ? <><Loader2 size={14} className="animate-spin" /> Posting...</> : <><Briefcase size={14} /> Post Job</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}