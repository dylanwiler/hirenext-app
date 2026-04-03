import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Let all requests through — auth is enforced in layout.tsx
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}