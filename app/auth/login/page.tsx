'use client'
export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

function LoginForm() {
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { toast.error(error.message); setLoading(false); return }
    window.location.href = searchParams.get('next') || '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#090909' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#1D9E75' }}>
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-display font-bold text-lg" style={{ color: '#F0EFEA' }}>Hire Next <span style={{ color: '#1D9E75' }}>AI</span></span>
          </div>
          <h1 className="font-display font-extrabold text-2xl mb-2" style={{ color: '#F0EFEA' }}>Welcome back</h1>
          <p className="text-sm" style={{ color: '#4A4845' }}>Sign in to your Hire Next AI account</p>
        </div>
        <div className="card p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Email</label>
              <input className="input" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8880' }}>Password</label>
              <div className="relative">
                <input className="input pr-10" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#4A4845' }}>
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-xs" style={{ color: '#4A4845' }}>Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center flex items-center gap-2 disabled:opacity-40">
              {loading ? 'Signing in...' : <><span>Sign in</span><ArrowRight size={14} /></>}
            </button>
          </form>
        </div>
        <p className="text-center mt-4 text-sm" style={{ color: '#4A4845' }}>
          No account? <Link href="/auth/signup" className="font-medium" style={{ color: '#1D9E75' }}>Sign up free</Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense fallback={null}><LoginForm /></Suspense>
}