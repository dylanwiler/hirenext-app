'use client'
import { useState } from 'react'
import { Brain, AlertTriangle, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

const MEMORY = [
  { id:1, type:'rule', cat:'scoring', key:'Direct title match', value:'Appointment Setter, SDR, BDR → +15pts', confidence:95, uses:250 },
  { id:2, type:'rule', cat:'scoring', key:'Home service exp', value:'HVAC, Solar, Roofing, Plumbing → +10pts', confidence:90, uses:250 },
  { id:3, type:'rule', cat:'red_flag', key:'Flippant cover letter', value:'"piece of cake", "sounds fun" → -10pts', confidence:88, uses:12 },
  { id:4, type:'signal', cat:'learned', key:"Dae'Jon Smith hired", value:'SDR 10yrs, solar+home svc, 89/100 interview score', confidence:88, uses:1 },
  { id:5, type:'rule', cat:'scoring', key:'Years experience', value:'1-3yr=+2, 4-9yr=+5, 10+yr=+8', confidence:92, uses:250 },
]

export default function MemoryPage() {
  const [filter, setFilter] = useState('all')
  const [memories, setMemories] = useState(MEMORY)
  const filtered = filter === 'all' ? memories : memories.filter(m => m.cat === filter || m.type === filter)
  return (
    <div className="page-enter">
      <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <div>
          <div className="flex items-center gap-2 mb-0.5"><Brain size={18} style={{ color:'#1D9E75' }} /><h1 className="font-display font-extrabold text-xl" style={{ color:'#F0EFEA' }}>Agent Memory</h1></div>
          <p className="text-sm" style={{ color:'#4A4845' }}>{MEMORY.length} active rules · Learns from every candidate and hire decision</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs" style={{ background:'rgba(29,158,117,0.1)', color:'#1D9E75', border:'1px solid rgba(29,158,117,0.2)' }}><span className="dot-live inline-block w-1.5 h-1.5" /> Learning active</div>
      </div>
      <div className="px-7 py-5">
        <div className="flex gap-2 mb-5">
          {[['all','All'],['rule','Rules'],['signal','Signals'],['scoring','Scoring'],['red_flag','Red flags']].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} className="text-xs px-3 py-1.5 rounded-xl transition-all" style={{ background:filter===v?'rgba(29,158,117,0.12)':'rgba(255,255,255,0.03)', border:`1px solid ${filter===v?'rgba(29,158,117,0.35)':'rgba(255,255,255,0.06)'}`, color:filter===v?'#1D9E75':'#4A4845' }}>{l}</button>
          ))}
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
          {filtered.map((m,i) => (
            <div key={m.id} className="px-5 py-3.5 grid items-center gap-3 group transition-all"
              style={{ gridTemplateColumns:'120px 5fr 8rem 4rem 3rem', borderBottom:i<filtered.length-1?'1px solid rgba(255,255,255,0.04)':'none' }}
              onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.02)')}
              onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background:m.type==='rule'?'rgba(29,158,117,0.1)':'rgba(83,74,183,0.1)', color:m.type==='rule'?'#1D9E75':'#7F77DD' }}>{m.type==='rule'?'Rule':'Signal'}</span>
              <div>
                <div className="text-sm font-medium mb-0.5 flex items-center gap-2" style={{ color:'#F0EFEA' }}>
                  {m.cat === 'red_flag' && <AlertTriangle size={11} style={{ color:'#E24B4A', flexShrink:0 }} />}
                  {m.key}
                </div>
                <div className="text-xs" style={{ color:'#4A4845' }}>{m.value}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}><div style={{ width:`${m.confidence}%`, height:'100%', background:m.confidence>=80?'#1D9E75':'#BA7517' }} /></div>
                <span className="text-xs font-semibold" style={{ color:'#8A8880' }}>{m.confidence}%</span>
              </div>
              <div className="text-xs" style={{ color:'#4A4845' }}>{m.uses}x</div>
              <button onClick={() => { setMemories(ms => ms.filter(x => x.id !== m.id)); toast('Rule removed') }} className="opacity-0 group-hover:opacity-100 p-1 rounded-lg" style={{ color:'#3A3A3A' }}><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl text-xs" style={{ background:'rgba(29,158,117,0.05)', border:'1px solid rgba(29,158,117,0.15)', color:'#5DCAA5', lineHeight:'1.8' }}>
          <strong style={{ color:'#1D9E75' }}>How memory works:</strong> Every hire, reject, and interview outcome trains the scoring engine. Over time, the system learns exactly what a great hire looks like for your business.
        </div>
      </div>
    </div>
  )
}
