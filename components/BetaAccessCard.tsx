'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { Lock, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase'
export default function BetaAccessCard() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  async function activate() {
    if (!password.trim()) return
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const res = await fetch('/api/beta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, email: user?.email }) })
      const data = await res.json()
      if (data.valid) { setUnlocked(true); toast.success('Beta access activated!'); setTimeout(() => window.location.reload(), 1500) }
      else toast.error(data.message || 'Invalid access code')
    } catch { toast.error('Something went wrong') }
    finally { setLoading(false) }
  }
  if (unlocked) return (<div className="rounded-2xl p-5" style={{ background:'rgba(29,158,117,0.08)',border:'1px solid rgba(29,158,117,0.3)' }}><div className="flex items-center gap-3"><Zap size={18} style={{ color:'#1D9E75' }} /><div><div className="font-semibold text-sm" style={{ color:'#1D9E75' }}>Enterprise access activated</div><div className="text-xs" style={{ color:'#4A4845' }}>Unlimited roles, resumes, and interviews</div></div></div></div>)
  return (
    <div className="rounded-2xl p-5" style={{ background:'#111111',border:'1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-4"><Lock size={14} style={{ color:'#8A8880' }} /><span className="text-sm font-semibold" style={{ color:'#F0EFEA' }}>Have a beta access code?</span></div>
      <div className="flex gap-3"><input className="input flex-1 text-sm" type="password" placeholder="Enter access code..." value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&activate()} /><button onClick={activate} disabled={loading||!password} className="btn-primary text-sm disabled:opacity-40">{loading?'Checking...':'Activate'}</button></div>
      <p className="text-xs mt-2" style={{ color:'#3A3A3A' }}>Beta codes give free access to team members during development</p>
    </div>
  )
}