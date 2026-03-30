'use client'
import { useState } from 'react'
import { Zip, Check, ArrowQpRight, Zap } from 'lucide-react'
import { toast } from 'sonner'
import BetaAccessCard from '@/components/BetaAccessCard'

const PLANS = [
  { id:'solo', name:'Solo', price:199, features:['1 active role','100 resumes/mo','10 AI interviews'], highlight:false },
  { id:'growth', name:'Growth', price:349, features:['3 active roles','300 resumes/mo','30 AI interviews'], highlight:true },
  { id:'scale', name:'Scale', price:599, features:['8 active roles','600 resumes/mo','60 AI interviews'], highlight:false },
]

export default function BillingPage() {
  const [loading, setLoading] = useState<string|null>(null)

  async function checkout(planId: string) {
    setLoading(planId)
    try {
      const res = await fetch('/api/stripe/checkout', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({planId}) })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else toast.error(data.error || 'Something went wrong')
    } catch (e) { toast.error('Failed to start checkout') }
    finally { setLoading(null) }
  }

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <div><h1 className="font-display font-extrabold text-xl" style={{ color:'#F0EFEA' }}>Billing &amp; Plans</h1><p className="text-sm mt-0.5" style={{ color:'#4A4845' }}>Choose a plan to unlock full access</p></div>
      </div>
      <div className="px-7 py-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          {PLANS.map(p => (
            <div key={p.id} className="rounded-2xl p-6 relative" style={{ background:p.highlight?'rgba(29,158,117,0.08)':'#111111', border:p.highlight?'2px solid rgba(29,158,117,0.4)':'1px solid rgba(255,255,255,0.07)' }}>
              {p.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full" style={{ background:'#1D9E75', color:'#fff' }}>Most popular</div>}
              <div className="text-sm font-medium mb-2" style={{ color:'#8A8880' }}>{p.name}</div>
              <div className="font-display font-extrabold text-4xl mb-6" style={{ color:'#F0EFEA' }}>${p.price}<span className="text-base font-normal" style={{ color:'#4A4845' }}>/mo</span></div>
              <ul className="space-y-2 mb-6">{p.features.map((f,i) => <li key={i} className="flex items-center gap-2 text-sm" style={{ color:'#8A8880' }}><Check size={14} style={{ color:'#1D9E75' }} /> {f}</li>)}</ul>
              <button onClick={() => checkout(p.id)} disabled={loading===p.id} className={p.highlight?'btn-primary w-full justify-center':'btn-secondary w-full justify-center'}>{loading===p.id?'Starting...':'Start free trial'}</button>
            </div>
          ))}
        </div>
        <BetaAccessCard />
      </div>
    </div>
  )
}
