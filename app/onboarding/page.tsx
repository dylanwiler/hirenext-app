'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Zap, Chrome, Settings, ArrowRight, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

const STEPS = [
  { id: 1, title: 'Install Chrome extension', icon: Chrome },
  { id: 2, title: 'Connect ZipRecruiter', icon: Zap },
  { id: 3, title: 'Set up your first role', icon: Settings },
  { id: 4, title: 'Run your first scan', icon: Zap },
]

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState(1)
  const [completed, setCompleted] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ role: '', location: '' })

  async function completeStep(current: number) {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setCompleted(prev => [...prev, current])
    setLoading(false)
    if (step < STEPS.length) { setStep(s => s + 1) }
    else { toast.success('Setup complete! Welcome to Hire Next AI'); setTimeout(() => router.push('/dashboard'), 1500) }
  }

  const currentStep = STEPS[step - 1]
  const Icon = currentStep.icon

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#090909' }}>
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-12">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all" style={{
                background: completed.includes(s.id) ? '#1D9E75' : step === s.id ? 'rgba(29,158,117,0.2)' : 'rgba(255,255,255,0.05)',
                color: completed.includes(s.id) ? '#fff' : step === s.id ? '#1D9E75' : '#4A4845',
                border: step === s.id ? '1px solid rgba(29,158,117,0.5)' : '1px solid rgba(255,255,255,0.06)'
              }}>
                {completed.includes(s.id) ? <Check size={14} /> : s.id}
              </div>
              <span className="text-xs font-medium hidden sm:block" style={{ color: step === s.id ? '#F0EFEA' : '#3A3A3A' }}>{s.title}</span>
              {i < STEPS.length - 1 && <div className="h-px w-12 ml-2" style={{ background: 'rgba(255,255,255,0.06)' }} />}
            </div>
          ))}
        </div>
        <div className="card p-8">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(29,158,117,0.12)', color: '#1D9E75' }}>
              <Icon size={28} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold mb-2" style={{ color: '#1D9E75' }}>STEP {step} OF 4</div>
              <h2 className="font-display font-extrabold text-2xl mb-4" style={{ color: '#F0EFEA' }}>{currentStep.title}</h2>
              {step === 3 && (
                <div className="space-y-3 mb-6">
                  <div><label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Role title *</label><input className="input" placeholder="e.g. Appointment Setter" value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))} /></div>
                  <div><label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Location</label><input className="input" placeholder="e.g. Portland, OR or Remote" value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} /></div>
                </div>
              )}
              <div className="flex items-center gap-3">
                {step > 1 && <button onClick={() => setStep(s => s - 1)} className="btn-secondary flex items-center gap-2"><ArrowLeft size={14} /> Back</button>}
                <button onClick={() => completeStep(step)} disabled={loading} className="btn-primary flex items-center gap-2">
                  {loading ? 'Saving...' : step === STEPS.length ? 'Launch dashboard' : 'Continue'}
                  {!loading && <ArrowRight size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-6 text-xs" style={{ color: '#3A3A3A' }}>
          <button onClick={() => router.push('/dashboard')} className="hover:underline">Skip setup</button>
        </p>
      </div>
    </div>
  )
}