import { NextRequest, NextResponse } from 'next/server'
import { userSession } from './lib/session'

const protectedRoutes = ['/']
// const publicRoutes = ['/auth']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  // const isPublicRoute = publicRoutes.includes(path)

  const session = await userSession()

  if (isProtectedRoute && !session.success) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}