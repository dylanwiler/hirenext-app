'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowRight, Eye, EyeOff, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase'

const PLANS = [
  { id: 'solo', name: 'Solo', price: '$199/mo', roles: '1 role · 10 interviews' },
  { id: 'growth', name: 'Growth', price: '$349/mo', roles: '3 roles · 30 interviews', popular: true },
  { id: 'scale', name: 'Scale', price: '$599/mo', roles: '8 roles · 60 interviews' },
]

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('growth')
  const [form, setForm] = useState({ email: '', password: '', companyName: '', firstName: '' })
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  async function handleSignup() {
    if (!form.email || !form.password || !form.companyName || !form.firstName) { toast.error('Please fill in all fields'); return }
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { first_name: form.firstName, company_name: form.companyName, plan: selectedPlan }, emailRedirectTo: `${window.location.origin}/auth/callback` } })
      if (error) throw error
      toast.success('Account created! Check your email.')
      router.push('/onboarding')
    } catch (err: any) { toast.error(err.message) } finally { setLoading(false) }
  }
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8"><h1 className="font-display font-extrabold text-3xl mb-2" style={{ color:'#F0EFEA' }}>Create your account</h1><p className="text-sm" style={{ color:'#8A8880' }}>Already have one? <Link href="/auth/login" style={{ color:'#1D9E75' }}>Log in</Link></p></div>
      <div className="card p-7 space-y-4">
        {step === 1 ? (<>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium mb-1.5" style={{ color:'#8A8880' }}>First name</label><input className="input" placeholder="Alex" value={form.firstName} onChange={e => update('firstName', e.target.value)} /></div>
            <div><label className="block text-xs font-medium mb-1.5" style={{ color:'#8A8880' }}>Company</label><input className="input" placeholder="Apex HVAC" value={form.companyName} onChange={e => update('companyName', e.target.value)} /></div>
          </div>
          <div><label className="block text-xs font-medium mb-1.5" style={{ color:'#8A8880' }}>Email</label><input className="input" type="email" placeholder="you@company.com" value={form.email} onChange={e => update('email', e.target.value)} /></div>
          <div><label className="block text-xs font-medium mb-1.5" style={{ color:'#8A8880' }}>Password</label><input className="input" type="password" placeholder="Min 8 chars" value={form.password} onChange={e => update('password', e.target.value)} /></div>
          <button onClick={() => setStep(2)} className="btn-primary w-full justify-center">Choose plan <ArrowRight size={15} /></button>
        </>) : (<>
          <div className="space-y-3">{PLANS.map(p => (
            <button key={p.id} onClick={() => setSelectedPlan(p.id)} className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all" style={{ background: selectedPlan===p.id?'rgba(29,158,117,0.1)':'rgba(255,255,255,0.03)', border: selectedPlan===p.id?'1.5px solid rgba(29,158,117,0.5)':'1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex-1"><div className="font-semibold text-sm" style={{ color:'#F0EFEA' }}>{p.name}</div><div className="text-xs" style={{ color:'#8A8880' }}>{p.roles}</div></div>
              <div className="font-semibold text-sm" style={{ color: selectedPlan===p.id?'#1D9E75':'#4A4845' }}>{p.price}</div>
            </button>
          ))}</div>
          <div className="flex gap-3"><button onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">Back</button><button onClick={handleSignup} disabled={loading} className="btn-primary flex-1 justify-center">{loading?'Creating...':'Create account'}</button></div>
        </>)}
      </div>
    </div>
  )
}
