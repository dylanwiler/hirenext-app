import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return request.cookies.getAll() }, setAll(cookiesToSet) { cookiesToSet.forEach(({name,value}) => request.cookies.set(name,value)); supabaseResponse = NextResponse.next({request}); cookiesToSet.forEach(({name,value,options}) => supabaseResponse.cookies.set(name,value,options)) } } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  const isProtected = ['/dashboard','/onboarding'].some(p => path.startsWith(p))
  const isAuthPage = path.startsWith('/auth/login') || path.startsWith('/auth/signup')
  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirect', path)
    return NextResponse.redirect(url)
  }
  if (user && isAuthPage) return NextResponse.redirect(new URL('/dashboard', request.url))
  if (user && isProtected && !path.startsWith('/dashboard/settings')) {
    const isBetaEmail = user.email?.toLowerCase() === 'hello@mindscript.app'
    const planActive = user.user_metadata?.plan_active === true
    const isBeta = user.user_metadata?.is_beta === true
    if (!isBetaEmail && !planActive && !isBeta) return NextResponse.redirect(new URL('/dashboard/settings/billing?required=true', request.url))
  }
  return supabaseResponse
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'] }