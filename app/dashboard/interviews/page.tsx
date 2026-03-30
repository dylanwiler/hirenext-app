'use client'
import { useState } from 'react'
import { Mic, Phone, Play, Check, Clock } from 'lucide-react'
import { toast } from 'sonner'

const INTERVIEWS = [
  { id:'daejohn', name:"Dae'Jon Smith", status:'completed', score:89, duration:'22:30', date:'Today', overall:'Strong objection handling, remote-native, previous solar sales background translates well to home service appointment setting.' },
  { id:'justin', name:'Justin Griffis', status:'invited', score:null, duration:null, date:'Pending reply', overall:'Message sent via ZipRecruiter, awaiting response.' },
  { id:'tara', name:'Tara Gaulin', status:'invited', score:null, duration:null, date:'Pending reply', overall:'Message sent via ZipRecruiter, awaiting response.' },
]

export default function InterviewsPage() {
  const [selected, setSelected] = useState('daejohn')
  const interview = INTERVIEWS.find(i => i.id === selected)!

  return (
    <div className="page-enter flex h-full">
      <div className="w-72 flex-shrink-0" style={{ borderRight:'1px solid rgba(255,255,255,0.06)' }}>
        <div className="px-5 py-4" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <h1 className="font-display font-extrabold text-lg" style={{ color:'#F0EFEA' }}>Interviews</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl mt-2" style={{ background:'rgba(29,158,117,0.08)', border:'1px solid rgba(29,158,117,0.2)' }}>
            <Phone size={12} style={{ color:'#1D9E75' }} />
            <span className="text-xs" style={{ color:'#1D9E75' }}>+1 (562) 745 6631 active</span>
          </div>
        </div>
        <div>
          {INTERVIEWS.map(inv => (
            <div key={inv.id} onClick={() => setSelected(inv.id)}
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-l-4"
              style={{ background:selected===inv.id?'rgba(255,255,255,0.03)':'transparent', borderLeftColor:selected===inv.id?'#1D9E75':'transparent', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0" style={{ background:inv.status==='completed'?'rgba(29,158,117,0.2)':'rgba(186,117,23,0.2)', color:inv.status==='completed'?'#1D9E75':'#BA7517' }}>
                {inv.status==='completed'?<Check size={14} />:<Mic size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color:'#F0EFEA' }}>{inv.name}</div>
                <div className="text-xs" style={{ color:'#4A4845' }}>{inv.date}{inv.score!==null?` · ${inv.score}/100`:''}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {interview.status === 'completed' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-extrabold text-xl" style={{ color:'#F0EFEA' }}>{interview.name}</h2>
              <div className="text-3xl font-bold" style={{ color:'#1D9E75' }}>{interview.score}</div>
            </div>
            <div className="flex items-center gap-4 text-sm" style={{ color:'#4A4845' }}>
              <span className="flex items-center gap-1"><Clock size={13} /> {interview.duration}</span>
              <span>{interview.date}</span>
            </div>
            <div className="rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-sm font-semibold mb-2" style={{ color:'#F0EFEA' }}>AI Summary</h3>
              <p className="text-sm leading-relaxed" style={{ color:'#8A8880' }}>{interview.overall}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>toast.success('Opening transcript...')} className="btn-secondary text-sm flex items-center gap-2"><Play size={14} /> Play recording</button>
              <button onClick={()=>toast.success('Transcript copied')} className="btn-primary text-sm">View transcript</button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-20" style={{ color:'#3A3A3A' }}>
            <Mic size={32} className="mb-3 opacity-50" />
            <p className="text-sm mb-1">Interview invite sent</p>
            <p className="text-xs">Waiting for candidate to call +1 (562) 745 6631</p>
          </div>
        )}
      </div>
    </div>
  )
}
