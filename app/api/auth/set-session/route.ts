import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const access_token = searchParams.get('access_token')
  const refresh_token = searchParams.get('refresh_token')
  const next = searchParams.get('next') || '/dashboard'

  if (!access_token || !refresh_token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Create response first so we can set cookies on it
  const response = NextResponse.redirect(new URL(next, request.url))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options as Record<string, unknown>)
          })
        },
      },
    }
  )

  const { error } = await supabase.auth.setSession({ access_token, refresh_token })

  if (error) {
    return NextResponse.redirect(new URL('/auth/login?error=' + encodeURIComponent(error.message), request.url))
  }

  return response
}