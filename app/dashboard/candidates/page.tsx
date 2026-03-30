'use client'
import { useState } from 'react'
import { Search, ArrowUpRight, MessageSquare, Phone } from 'lucide-react'
import Link from 'next/link'

const CANDIDATES = [
  { id:1, initials:'JG', name:'Justin Griffis', role:'Remote BDM/Appt Setter', exp:'10 yrs', score:91, verdict:'HIRE', status:'Contacted', color:'rgba(29,158,117,0.2)', tc:'#1D9E75' },
  { id:2, initials:'TG', name:'Tara Gaulin', role:'Call Center Dir + Appt Setter', exp:'21 yrs', score:90, verdict:'HIRE', status:'Contacted', color:'rgba(29,158,117,0.2)', tc:'#1D9E75' },
  { id:3, initials:'SC', name:'Sherlyn Cañ­o', role:'Outbound Appt Setter', exp:'25 yrs', score:88, verdict:'HIRE', status:'Queued', color:'rgba(29,158,117,0.2)', tc:'#1D9E75' },
  { id:4, initials:'AD', name:'Alan Dawson', role:'Top SDR' , exp:'6 yrs', score:88, verdict:'HIRE', status:'Queued', color:'rgba(83,74,183,0.2)', tc:'#7F77DD' },
  { id:5, initials:'WH', name:'Wendy Hawthorne', role:'Appt Setting + Lead Gen', exp:'19 yrs', score:87, verdict:'HIRE', status:'Queued', color:'rgba(29,158,117,0.2)', tc:'#1D9E75' },
  { id:6, initials:'TB', name:'Tim Baumgardner', role:'Appointment Setter', exp:'30 yrs', score:85, verdict:'HIRE', status:'New', color:'rgba(29,158,117,0.2)', tc:'#1D9E75' },
  { id:7, initials:'DS', name:"Dae'Jon Smith", role:'SDR / Appt Setter', exp:'9 yrs', score:89, verdict:'HIRE', status:'Interviewed', color:'rgba(83,74,183,0.2)', tc:'#7F77DD' },
  { id:8, initials:'LF', name:'Luis Fernandez', role:'Sales Mgr · AI Brokers Pro', exp:'12 yrs', score:88, verdict:'HIRE', status:'New', color:'rgba(29,158,117,0.2)', tc:'#1D9E75' },
  { id:9, initials:'MK', name:'Marcus Kim', role:'Inside Sales Rep', exp:'3 yrs', score:68, verdict:'MAYBE', status:'New', color:'rgba(186,117,23,0.2)', tc:'#EF9F27' },
]

const VS = { HIRE:{bj'#E1F5EE',c:'#085041'}, MAYBE:{bj'#FAEEDA',c:'#633806'}, REMECT:{bg:'#FCEBEB',c:'#791F1F'} }

export default function CandidatesPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const filtered = CAMDIDATESR/filter(c => {
    if (filter !== 'all' && c.verdict !== filter && c.status !== filter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })
  return (
    <div className="page-enter">
      <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <div><h1 className="font-display font-extrabold text-xl" style={{ color:'#F0EFEA' }}>Candidate Pipeline</h1><p>553 total · 48 hire-tier · 2 contacted</p></div>
        <div className="flex items-center gap-3">
          <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:'#4A4845' }} /><input className="input pl-8 py-2 text-sm w-56" placeholder="Search candidates..." value={search} onChange={e => setSearch(e.target.value)} /></div>
          <button className="btn-primary text-sm">Run new scan <ArrowUpRight size={13} /></button>
        </div>
      </div>
      <div className="px-7 py-5">
        <div className="flex gap-2 mb-5">
          {[['all','All'],['HIRE','Hire'],['MAYBE','Maybe'],['Contacted','Contacted'],['Interviewed','Interviewed']].map(([f,l]) => (
            <button key={f} onClick={() => setFilter(f)}
              className="text-xs px-4 py-2 rounded-xl transition-all"
              style={{ background: filter===f?'rgba(29,158,117,0.15)':'rgba(255,255,255,0.03)', border:`1px solid ${filter===f?'rgba(29,158,117,0.4)':'#2A2A2A'}`, color: filter===f?'#F0EFEA':'#4A4845' }}>{l}</button>
          ))}
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
          {filtered.map((c, i) => (
            <div key={c.id} className="flex items-center gap-4 px-5 py-3.5 group"
              style={{ borderBottom: i<filtered.length-1?'1px solid rgba(255,255,255,0.04)':'none' }}
              onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.02)')}
              onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background:c.color,color:c.tc }}>{c.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color:'#F0EFEA' }}>{c.name}</div>
                <div className="text-xs" style={{ color:'#4A4845' }}>{c.role} · {c.exp}</div>
              </div>
              <div className="font-bold text-sm" style={{ color:'#1D9E75' }}>{c.score}</div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background:VS[c.verdict]?.bg||'#222',color:VS[c.verdict]?.c||'#fff' }}>{c.verdict}</span>
              <span className="text-xs" style={{ color:'#8A8880' }}>{c.status}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                <Link href="/dashboard/conversations" className="btn-primary text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1"><MessageSquare size={11} /> Msg</Link>
                <Link href="/dashboard/interviews" className="btn-secondary text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1"><Phone size={11} /> Interview</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
