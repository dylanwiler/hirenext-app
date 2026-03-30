import { createAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
const BETA_PASSWORD = 'HireNextBeta'
const BETA_EMAIL = 'hello@mindscript.app'
export async function POST(req: NextRequest) {
  try {
    const { password, email } = await req.json()
    if (password !== BETA_PASSWORD) return NextResponse.json({ valid: false, reason: 'invalid_password' }, { status: 401 })
    if (email.toLowerCase() !== BETA_EMAIL.toLowerCase()) return NextResponse.json({ valid: false, reason: 'beta_restricted', message: 'Beta access is reserved for the Hire Next AI team. Please sign up for a paid plan.' }, { status: 403 })
    const supabase = createAdminClient()
    const { data: { users } } = await supabase.auth.admin.listUsers()
    const user = users.find(u => u.email?.toLowerCase() === BETA_EMAIL.toLowerCase())
    if (user) {
      await supabase.auth.admin.updateUserById(user.id, { user_metadata: { ...user.user_metadata, is_beta: true, plan: 'enterprise', plan_active: true } })
    }
    return NextResponse.json({ valid: true, plan: 'enterprise', message: 'Beta access granted. Enterprise unlocked.' })
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }) }
}