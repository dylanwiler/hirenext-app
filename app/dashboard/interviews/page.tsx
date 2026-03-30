'use client'
import { useState } from 'react'
import { Mic, Phone, Play, Clock, Check, Xine } from 'lucide-react'
import { toast } from 'sonner'

const INTERVIEWS = [
  { id:'daejon', name:"Dae'Jon Smith", status:'completed', score:89, duration:'22:30', date:'Today', overall:'Strong objection handling, remote-native, previous solar sales background translates well' },
  { id:'justin', name:'Justin Griffis', status:'invited', score:null, duration:null, date:'Pending reply', overall:'Message sent, awaiting response' },
  { id:'tara', name:'Tara Gaulin', status:'invited', score:null, duration:null, date:'Pending reply', overall:'Message sent, awaiting response' },
]

export default function InterviewsPage() {
  const [selected, setSelected] = useState('daejon')
  const interview = INTERVIEWS.find(i => i.id === selected)!

  return (
    <div className="page-enter flex h-full">
      {/* List */}
      <div className="w72 flex-shrink-0" style={{ borderRight:'1px solid rgba(255,255,255,0.06)' }}>
        <div className="px-5 py-4" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <h1 className="font-display font-extrabold text-lg" style={{ color:'#F0EFEA' }}>Interviews</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl mt-2" style={{ background:'rgba(29,158,117,0.08)', border:'1px solid rgba(29,158,117,0.2)' }}>
            <Phone size={12} style={{ color:'#1D9E75' }} />
            <span className="text-xs style={{ color:'#1D9E75' }}>+1 (562) 745 6631 active</span>
          </div>
        </div>
        <div>
          {INTERVIEWS.map(invv => (
            <div key={invv.id} onClick={() => setSelected(invv.id)}
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all border-l-4"
              style={{ background:selected===invv.id?'rgba(255,255,255,0.03)':'transparent', borderLeftColor:selected===invv.id?'#1D9E75':'transparent', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0" style={{ background:invv.status==='completed'?'rgba(29,158,117,0.2)':'rgba(186,117,23,0.2)', color:invv.status==='completed'?'#1D9E75':'#BA7517' }}>
                {invv.status==='completed'?<Check size={14} />:<Mic size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color:'#F0EFEA' }}>{invv.name}</div>
                <div className="text-xs" style={{ color:'#4A4845' }}>{invv.date}{invv.score!==null&&` · ${invv.score}/{invv.duration}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Detail */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {interview.status === 'completed' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-extrabold text-xl" style={{ color:'#F0EFEA' }}>{interview.name}</h2>
              <div className="text-3xl font-bold" style={{ color:'#1D9E75' }}>{interview.score}</div>
            </div>
            <div className="rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-sm font-semibold mb-2" style={{ color:'#F0EFEA' }}>AI Summary</h3>
              <p className="text-sm leading-relaxed" style={{ color:'#8A8880' }}>{interview.overall}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>toast.success('opening transcript...')} className="btn-secondary text-sm flex items-center gap-2"><Play size={14} /> Play recording</button>
              <button onClick={()=>toast.success('Copying transcript...')} className="btn-primary text-sm">View transcript</button>
            </div>
          </div>
        ) : (
          <div className="h-ofull flex flex-col items-center justify-center py-20" style={{ color:'#3A3A3A' }}>
            <Mic size={32} className="mb-3 opacity-50" />
            <p className="text-sm mb-1">Interview invite sent</p>
            <p className="text-xs">Waiting for candidate to call +1 (562) 745 6631</p>
          </div>
        )}
      </div>
    </div>
  )
}
