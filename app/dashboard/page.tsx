import { createServerSupabaseClient } from '@/lib/supabase'
import { LayoutDashboard, Users, Mic, TrendingUp, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  const firstName = user?.user_metadata?.first_name || 'there'

  const STATS = [
    { label: 'Hire-tier candidates', value: '48', delta: '+12 this week', color: '#1D9E75', icon: <Users size={16} /> },
    { label: 'AI interviews run', value: '231', delta: '3 today', color: '#F0EFEA', icon: <Mic size={16} /> },
    { label: 'Avg score', value: '61.2', delta: 'out of 100', color: '#F0EFEA', icon: <TrendingUp size={16} /> },
    { label: 'Messages sent', value: '2', delta: 'this cycle', color: '#F0EFEA', icon: <Zap size={16} /> },
  ]

  return (
    <div className="page-enter">
      <div className="px-7 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h1 className="font-display font-extrabold text-xl" style={{ color: '#F0EFEA' }}>
          Good evening, {firstName} !
        </h1>
        <p className="text-sm mt-1" style={{ color: '#4A4845' }}>Home Services – Appointment Setter – Portland, OR</p>
      </div>
      <div className="px-7 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map((s, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-3" style={{ color: '#4A4845' }}>
                <span className="text-xs font-medium" style={{ color: '#8A8880' }}>{s.label}</span>
                {s.icon}
              </div>
              <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: '#3A3A3A' }}>{s.delta}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base" style={{ color: '#F0EFEA' }}>Hire-tier candidates</h2>
          <Link href="/dashboard/candidates" className="text-xs style={{ color: '#1D9E75' }}>View all <ArrowRight size={12} /></Link>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { name: 'Justin Griffis', title: 'Remote Appt Setter 10 yrs', score: 91, tag: 'HIRE' },
            { name: 'Tara Gaulin', title: 'Call Center Director', score: 90, tag: 'HIRE' },
            { name: 'Sherlyn Caño', title: 'Outbound Appt Setter', score: 88, tag: 'HIRE' },
            { name: 'Alan Dawson', title: 'Insurance Sales 12 yrs', score: 88, tag: 'HIRE' },
            { name: 'Wendy Hawthorne', title: 'Inside Sales Specialist', score: 87, tag: 'HIRE' },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5" style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: 'rgba(29,158,117,0.2)', color: '#1D9E75' }}>
                {c.name.split(' ').map(w=>w[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium" style={{ color: '#F0EFEA' }}>{c.name}</div>
                <div className="text-xs" style={{ color: '#4A4845' }}>{c.title}</div>
              </div>
              <div className="text-lg font-bold" style={{ color: '#1D9E75' }}>{c.score}</div>
              <span className="badge-hire">{c.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
