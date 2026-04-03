'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { Check, ArrowUpRight, Zap, CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import BetaAccessCard from '@/components/BetaAccessCard'

const PLANS = [
  { id: 'solo', name: 'Solo', price: '$199', period: '/mo', limits: '1 role Â· 100 resumes Â· 10 interviews', priceId: 'price_1TGVkH1lvYSC7itfl4Wl7lHT' },
  { id: 'growth', name: 'Growth', price: '$349', period: '/mo', limits: '3 roles Â· 300 resumes Â· 30 interviews', popular: true, priceId: 'price_1TGVjn1lvYSC7itfXmmXnORK' },
  { id: 'scale', name: 'Scale', price: '$599', period: '/mo', limits: 'Unlimited roles Â· resumes Â· interviews', priceId: 'price_1TGVjF1lvYSC7itfJcKBjlg4' },
]

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  async function checkout(planId: string) {
    setLoading(planId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      })
      const { url, error } = await res.json()
      if (error) { toast.error(error); return }
      if (url) window.location.href = url
    } finally { setLoading(null) }
  }

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div>
          <h1 className="font-display font-extrabold text-xl" style={{ color: '#F0EFEA' }}>Billing & Plans</h1>
          <p className="text-sm mt-0.5" style={{ color: '#4A4845' }}>Manage your subscription</p>
        </div>
      </div>
      <div className="px-7 py-6 space-y-6">
        <BetaAccessCard />
        <div className="grid grid-cols-3 gap-4">
          {PLANS.map(plan => (
            <div key={plan.id} className="rounded-2xl p-6" style={{ background: plan.popular ? 'rgba(29,158,117,0.06)' : '#111111', border: `1px solid ${plan.popular ? 'rgba(29,158,117,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
              {plan.popular && <div className="text-xs font-semibold mb-3 px-2 py-0.5 rounded-full inline-block" style={{ background: 'rgba(29,158,117,0.15)', color: '#1D9E75' }}>Most popular</div>}
              <h3 className="font-display font-bold text-lg mb-1" style={{ color: '#F0EFEA' }}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2"><span className="text-3xl font-bold" style={{ color: '#F0EFEA' }}>{plan.price}</span><span className="text-sm" style={{ color: '#4A4845' }}>{plan.period}</span></div>
              <p className="text-xs mb-5" style={{ color: '#4A4845' }}>{plan.limits}</p>
              <button onClick={() => checkout(plan.id)} disabled={!!loading} className="btn-primary w-full justify-center text-sm flex items-center gap-2">
                {loading === plan.id ? 'Redirecting...' : <><CreditCard size={13} /> Subscribe <ArrowUpRight size={13} /></>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}