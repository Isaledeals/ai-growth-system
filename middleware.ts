import { NextRequest, NextResponse } from 'next/server'

const locales = ['de', 'en']
const defaultLocale = 'de'

const excludedPaths = [
  '/branche',
  '/dashboard',
  '/api',
  '/impressum',
  '/datenschutz',
  '/agb',
  '/buchen',
  '/checkout',
  '/_next',
  '/favicon',
  '/icon',
  '/apple-icon',
  '/opengraph-image',
  '/twitter-image',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip excluded paths
  if (excludedPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Skip if already has locale
  if (locales.some((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)) {
    return NextResponse.next()
  }

  // Detect locale from Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? ''
  const preferredLocale = acceptLang.includes('de')
    ? 'de'
    : acceptLang.includes('en')
      ? 'en'
      : defaultLocale

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|.*\\..*).*)',],
}
