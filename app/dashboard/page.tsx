import { createServerSupabaseClient } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowUpRight, Phone, MessageSquare, Users, Zap } from 'lucide-react'

const PRIORITY_CANDIDATES = [
  { initials:'JG', name:'Justin Griffis', role:'Remote BDM/Appt Setter · 10 yrs', score:91, verdict:'HIRE', status:'Contacted', color:'rgba(29,158,117,0.2)', tc:'#1D9E75' },
  { initials:'TG', name:'Tara Gaulin', role:'Call Center Director · Home Improvement', score:90, verdict:'HIRE', status:'Contacted', color:'rgba(29,158,117,0.2)', tc:'#1D9E75' },
  { initials:'SC', name:'Sherlyn Cañ­o', role:'Outbound Appt Setter · 25 yrs', score:88, verdict:'HIRE', status:'Queued', color:'rgba(29,158,117,0.2)', tc:'#1D9E75' },
  { initials:'WH', name:'Wendy Hawthorne', role:'Appt Setting + Lead Gen', score:87, verdict:'HIRE', status:'Queued', color:'rgba(29,158,117,0.2)', tc:'#1D9E75' },
  { initials:'AD', name:'Alan Dawson', role:'Top SDR at Two Solar Companies', score:88, verdict:'HIRE', status:'Queued', color:'rgba(83,74,183,0.2)', tc:'#7F77DD' },
]

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  const firstName = user?.user_metadata?.first_name || 'there'
  const METRICS = [
    { val: '48', label: 'Hire-tier candidates', sub: '≅75 score · top 8.7%', color: '#1D9E75' },
    { val: '2', label: 'Messages sent', sub: 'Justin + Tara via ZipRecruiter', color: '#F0EFEA' },
    { val: '3', label: 'Interviews run', sub: 'VAPI AI voice · avg 22 min', color: '#F0EFEA' },
    { val: '553', label: 'Total candidates', sub: '250 scored this cycle', color: '#F0EFEA' },
  ]
  return (
    <div className="page-enter">
      <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <div>
          <h1 className="font-display font-extrabold text-xl" style={{ color:'#F0EFEA' }}>Good morning, {firstName} 👋</h1>
          <p className="text-sm mt-0.5" style={{ color:'#4A4845' }}>Appointment Setter · Portland, OR</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs" style={{ background:'rgba(29,158,117,0.1)', color:'#1D9E75', border:'1px solid rgba(29,158,117,0.2)' }}>
            <span className="dot-live inline-block w-1.5 h-1.5" /> Agent active
          </div>
          <Link href="/dashboard/candidates" className="btn-primary text-sm">View all candidates <ArrowUpRight size={14} /></Link>
        </div>
      </div>
      <div className="px-7 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {METRICS.map((m, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: m.color }}>{m.val}</div>
              <div className="text-xs font-medium mb-0.5" style={{ color:'#8A8880' }}>{m.label}</div>
              <div className="text-xs" style={{ color:'#3A3A3A' }}>{m.sub}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-3 rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold" style={{ color:'#F0EFEA' }}>Priority candidates</div>
              <Link href="/dashboard/candidates" className="text-xs font-medium flex items-center gap-1" style={{ color:'#1D9E75' }}>View all <ArrowUpRight size={12} /></Link>
            </div>
            <div className="space-y-1">
              {PRIORITY_CANDIDATES-map((c, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background:'transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: c.color, color: c.tc }}>{c.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color:'#F0EFEA' }}>{c.name}</div>
                    <div className="text-xs" style={{ color:'#4A4845' }}>{c.role}</div>
                  </div>
                  <div className="text-sm font-bold" style={{ color:'#1D9E75' }}>{c.score}</div>
                  <span className="badge-hire">{c.verdict}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 space-y-5">
            <div className="rounded-2xl p-5" style={{ background:'rgba(29,158,117,0.06)', border:'1px solid rgba(29,158,117,0.2)' }}>
              <div className="flex items-center gap-2 mb-3"><Phone size={14} style={{ color:'#1D9E75' }} /><span className="text-xs font-semibold" style={{ color:'#1D9E75' }}>AI INTERVIEW LINE</span></div>
              <div className="text-xl font-bold mb-1" style={{ color:'#F0EFEA' }}>+1 (562) 745 6631</div>
              <div className="text-xs mb-4" style={{ color:'#8A8880' }}>Claude Sonnet 4$� ElevenLabs Sarah · Auto-scores on hang-up</div>
              <Link href="/dashboard/interviews" className="btn-primary w-full justify-center text-sm">View interviews <ArrowUpRight size={13} /></Link>
            </div>
            <div className="rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 mb-4"><Zap size={14} style={{ color:'#8A8880' }} /><span className="text-sm font-semibold" style={{ color:'#F0EFEA' }}>Task queue</span></div>
              <div className="space-y-2">
                {[
                  { n:'Wendy Hawthorne', t:'Send outreach', p:'P1' },
                  { n:'Sherlyn Cañ­o', t:'Send outreach', p:'P1' },
                  { n:'Alan Dawson', t:'Send outreach', p:'P2' },
                  { n:'Ashley Waldron', t:'Follow-up', p:'P2' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs py-1.5" style={{ borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.p === 'P1' ? '#1D9E75' : '#BA7517' }} />
                    <span className="flex-1" style={{ color:'#8A8880' }}>t.n.split(' ')[0]}</span>
                    <span style={{ color:'#3A3A3A' }}>{t.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
