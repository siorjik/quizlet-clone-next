import { NextRequest, NextResponse } from 'next/server'

import getSession from './helpers/getSession'
import { createAccountAppPath, createPasswordAppPath, loginAppPath } from './utils/paths'


export const config = {
  matcher: ['/', '/library/:path*', '/profile', '/create-password', '/create-account', '/login']
}

export async function middleware(req: NextRequest) {
  const session = await getSession(req)
  const isUnauthorizedPath = req.nextUrl.pathname === loginAppPath ||
    req.nextUrl.pathname === createAccountAppPath || req.nextUrl.pathname === createPasswordAppPath

  if (session && isUnauthorizedPath) return NextResponse.redirect(req.nextUrl.origin)
  else if (!session && !isUnauthorizedPath && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL(loginAppPath, req.nextUrl.origin))
  }

  return NextResponse.next()
}
