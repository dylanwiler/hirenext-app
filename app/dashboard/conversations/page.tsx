'use client'
import { useState } from 'react'
import { MessageSquare, Send, Zap } from 'lucide-react'
import { toast } from 'sonner'

const CONVS = [
  { id:'justin', av:'JG', color:'rgba(29,158,117,0.2)', tc:'#1D9E75', name:'Justin Griffis', preview:'Message sent · Awaiting reply', time:'12:01 AM', score:91,
    msgs:[{ dir:'out', text:'Hi Justin, your 10-year background as a remote Appointment Setter stood out immediately. We are building the appointment setting team at Mindscript AI — are you open to a 20-minute AI interview this week? You scored in the top 1% of our 553 applicants.', time:'Today 12:01 AM', status:'Delivered' }] },
  { id:'tara', av:'TG', color:'rgba(29,158,117,0.2)', tc:'#1D9E75', name:'Tara Gaulin', preview:'Message sent · Awaiting reply', time:'12:02 AM', score:90,
    msgs:[{ dir:'out', text:'Hi Tara, your background as a Call Center Director and Appt Setter is exactly what we need. You scored #2 out of 553 applicants. Are you open to a 20-minute AI voice interview this week?', time:'Today 12:02 AM', status:'Delivered' }] },
  { id:'wendy', av:'WH', color:'rgba(29,158,117,0.2)', tc:'#1D9E75', name:'Wendy Hawthorne', preview:'Outreach queued', time:'Queued', score:87, msgs:[] },
]

const DRAFTS: Record<string,string> = {
  justin: 'Hi Justin, just following up on my previous message. Your 10-year remote appointment setting career is exactly what we need. Would you be open to a 20-minute AI interview this week?',
  tara: 'Hi Tara, following up — your call center director background is a direct match. Would you be open to a 20-minute AI voice interview this week?',
  default: 'Hi {name}, reaching out about the Appointment Setter role at Mindscript AI — your profile scored in the top tier of our 553 applicants. Are you open to a 20-minute AI interview?',
}

export default function ConversationsPage() {
  const [active, setActive] = useState('justin')
  const [convs, setConvs] = useState(CONVS)
  const [msg, setMsg] = useState('')
  const [sending, setSending] = useState(false)
  const conv = convs.find(c => c.id === active)!
  function aiDraft() { setMsg(DRAFTS[active] || DRAFTS.default.replace('{name}', conv.name.split(' ')[0])) }
  async function sendMsg() {
    if (!msg.trim()) return
    setSending(true)
    await new Promise(r => setTimeout(r, 800))
    setConvs(cs => cs.map(c => c.id === active ? { ...c, msgs:[...c.msgs,{dir:'out',text:msg,time:'Just now',status:'Sending...'}], preview:msg.substring(0,50) } : c))
    setMsg('')
    setSending(false)
    toast.success('Message sent to ' + conv.name)
  }
  return (
    <div className="flex h-full">
      <div className="w-72 flex flex-col flex-shrink-0" style={{ borderRight:'1px solid rgba(255,255,255,0.06)' }}>
        <div className="px-5 py-4" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <h1 className="font-display font-extrabold text-lg mb-3" style={{ color:'#F0EFEA' }}>Conversations</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {convs.map(c => (
            <div key={c.id} onClick={() => setActive(c.id)} className="flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-all" style={{ background:active===c.id?'rgba(255,255,255,0.03)':'transparent', borderBottom:'1px solid rgba(255,255,255,0.04)', borderLeft:`4px solid ${active===c.id?'#1D9E75':'transparent'}` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background:c.color, color:c.tc }}>{c.av}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5"><span className="text-sm font-medium" style={{ color:'#F0EFEA' }}>{c.name}</span><span className="text-xs" style={{ color:'#3A3A3A' }}>{c.time}</span></div>
                <div className="text-xs truncate" style={{ color:'#4A4845' }}>{c.preview}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background:conv.color, color:conv.tc }}>{conv.av}</div>
          <div className="flex-1"><div className="font-semibold text-sm" style={{ color:'#F0EFEA' }}>{conv.name}</div><div className="text-xs" style={{ color:'#4A4845' }}>{conv.score}/100</div></div>
          <button onClick={aiDraft} className="btn-ghost border rounded-xl text-xs px-3 py-1.5 flex items-center gap-1.5" style={{ borderColor:'rgba(255,255,255,0.1)' }}><Zap size={12} style={{ color:'#1D9E75' }} /> AI Draft</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {conv.msgs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center" style={{ color:'#3A3A3A' }}>
              <MessageSquare size={32} className="mb-3 opacity-50" />
              <p className="text-sm mb-4">No messages yet — click AI Draft to generate</p>
              <button onClick={aiDraft} className="btn-primary text-sm flex items-center gap-2"><Zap size={14} /> Generate outreach</button>
            </div>
          ) : conv.msgs.map((m, i) => (
            <div key={i} className="flex justify-end">
              <div className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed" style={{ background:'rgba(29,158,117,0.12)', border:'1px solid rgba(29,158,117,0.25)', color:'#F0EFEA' }}>
                {m.text}
                <div className="text-xs mt-1" style={{ color:'#3A3A3A' }}>{m.time} → {m.status}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4" style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex gap-3">
            <textarea className="input flex-1 resize-none text-sm" style={{ height:'76px', lineHeight:'1.6' }} placeholder="Type a message or click AI Draft..." value={msg} onChange={e => setMsg(e.target.value)} />
            <div className="flex flex-col gap-2">
              <button onClick={aiDraft} className="btn-ghost border rounded-xl text-xs px-3 py-2 flex items-center gap-1" style={{ borderColor:'rgba(255,255,255,0.1)' }}><Zap size={12} style={{ color:'#1D9E75' }} /> AI</button>
              <button onClick={sendMsg} disabled={!msg.trim()||sending} className="btn-primary text-xs px-3 py-2 flex items-center gap-1 disabled:opacity-40"><Send size={12} /> {sending?'...':'Send'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
