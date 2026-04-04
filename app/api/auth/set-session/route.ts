import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const access_token = searchParams.get('access_token')
  const refresh_token = searchParams.get('refresh_token')
  const next = searchParams.get('next') || '/dashboard'

  if (!access_token || !refresh_token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.setSession({ access_token, refresh_token })

  if (error) {
    return NextResponse.redirect(new URL('/auth/login?error=session', request.url))
  }

  return NextResponse.redirect(new URL(next, request.url))
}