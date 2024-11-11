// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
   const url = request.nextUrl.pathname

   // List paths you want to ignore
   const ignoredPaths = ['/payment-success', '/payment-failed']

   if (ignoredPaths.includes(url)) {
      // For example, redirect to homepage if path is ignored
      return NextResponse.redirect(new URL('/', request.url))
   }

   return NextResponse.next()
}
