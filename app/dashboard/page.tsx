'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { Briefcase, Users, Mic, TrendingUp, ArrowRight, Plus } from 'lucide-react'

export default function DashboardPage() {
  const [userName, setUserName] = useState('')
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata
        setUserName(meta?.first_name || session.user.email?.split('@')[0] || 'there')
      }
    })
  }, [])

  const h = new Date().getHours()
  const greeting = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'

  const statCards = [
    { label: 'Active Jobs', value: 0, icon: Briefcase, color: '#1D9E75', href: '/dashboard/jobs' },
    { label: 'Total Candidates', value: 0, icon: Users, color: '#6366F1', href: '/dashboard/jobs' },
    { label: 'Interviews Done', value: 0, icon: Mic, color: '#F59E0B', href: '/dashboard/interviews' },
    { label: 'Shortlisted', value: 0, icon: TrendingUp, color: '#10B981', href: '/dashboard/jobs' },
  ]

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div>
          <h1 className="font-display font-extrabold text-xl" style={{ color: '#F0EFEA' }}>Good {greeting}, {userName} 👋</h1>
          <p className="text-sm mt-0.5" style={{ color: '#4A4845' }}>Here's your hiring pipeline at a glance</p>
        </div>
        <Link href="/dashboard/jobs/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={14} /> Post a Job
        </Link>
      </div>
      <div className="px-7 py-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Link key={card.label} href={card.href}>
              <div className="card p-5 cursor-pointer hover:border-green-900 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <card.icon size={18} style={{ color: card.color }} />
                  <ArrowRight size={12} style={{ color: '#4A4845' }} />
                </div>
                <div className="font-display font-bold text-3xl mb-1" style={{ color: '#F0EFEA' }}>{card.value}</div>
                <div className="text-xs" style={{ color: '#4A4845' }}>{card.label}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="card p-8 text-center" style={{ borderColor: 'rgba(29,158,117,0.2)', background: 'rgba(29,158,117,0.04)' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(29,158,117,0.12)' }}>
            <Briefcase size={22} style={{ color: '#1D9E75' }} />
          </div>
          <h2 className="font-display font-bold text-lg mb-2" style={{ color: '#F0EFEA' }}>Post your first job</h2>
          <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: '#4A4845' }}>
            Post a role and let AI screen, score, and interview candidates automatically.
          </p>
          <Link href="/dashboard/jobs/new" className="btn-primary inline-flex items-center gap-2">
            <Plus size={14} /> Post a Job
          </Link>
        </div>
      </div>
    </div>
  )
}