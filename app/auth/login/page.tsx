'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase'
export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  async function handleLogin() {
    if (!form.email || !form.password) { toast.error('Please enter your email and password'); return }
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
      if (error) throw error
      router.push(searchParams.get('redirect') || '/dashboard')
      router.refresh()
    } catch (err: any) { toast.error(err.message === 'Invalid login credentials' ? 'Incorrect email or password' : err.message) }
    finally { setLoading(false) }
  }
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="font-display font-extrabold text-3xl mb-2" style={{ color:'#F0EFEA' }}>Welcome back</h1>
        <p className="text-sm" style={{ color:'#8A8880' }}>No account? <Link href="/auth/signup" style={{ color:'#1D9E75' }} className="font-medium hover:underline">Sign up free</Link></p>
      </div>
      <div className="card p-7 space-y-4">
        <div><label className="block text-xs font-medium mb-1.5" style={{ color:'#8A8880' }}>Email</label><input className="input" type="email" placeholder="you@company.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} onKeyDown={e=>e.key==='Enter'&&handleLogin()} /></div>
        <div>
          <div className="flex items-center justify-between mb-1.5"><label className="text-xs font-medium" style={{ color:'#8A8880' }}>Password</label><Link href="/auth/forgot-password" className="text-xs hover:underline" style={{ color:'#4A4845' }}>Forgot?</Link></div>
          <div className="relative"><input className="input pr-10" type={showPass?'text':'password'} placeholder="â¢â¢â¢â¢â¢â¢â¢â¢" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==='Enter'&&handleLogin()} /><button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color:'#4A4845' }} onClick={()=>setShowPass(!showPass)}>{showPass?<EyeOff size={16}/>:<Eye size={16}/>}</button></div>
        </div>
        <button onClick={handleLogin} disabled={loading} className="btn-primary w-full justify-center mt-2">{loading?'Signing in...':'Sign in'}{!loading&&<ArrowRight size={15}/>}</button>
      </div>
    </div>
  )
}