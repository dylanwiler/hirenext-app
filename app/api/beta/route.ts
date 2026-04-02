import { createAdminClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

const BETA_PASSWORD = 'HireNextBeta'
const BETA_EMAILS = ['hello@mindscript.app']

export async function POST(req: NextRequest) {
  try {
    const { password, email } = await req.json()
    if (password !== BETA_PASSWORD) return NextResponse.json({ error: 'Invalid beta password' }, { status: 401 })
    if (!BETA_EMAILS.includes(email?.toLowerCase())) return NextResponse.json({ error: 'Not eligible for beta' }, { status: 403 })
    const admin = createAdminClient()
    const { data: usersData, error } = await admin.auth.admin.listUsers()
    if (error) throw error
    const user = usersData.users.find((u: { email?: string }) => u.email === email)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    await admin.auth.admin.updateUserById(user.id, { user_metadata: { is_beta: true, plan: 'enterprise', plan_active: true } })
    return NextResponse.json({ success: true })
  } catch (e) { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}