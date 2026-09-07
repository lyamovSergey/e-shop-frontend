import { type NextRequest, NextResponse } from 'next/server'

import { EnumUserRole } from '@/shared/types/user.interface'

import { getTokenPayload } from '@/utils/parse-token'

import { PUBLIC_URL } from './config/url.config'
import { EnumTokens } from './services/auth/auth-token.service'

export function proxy(request: NextRequest) {
	// const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	const isAuthPage = request.nextUrl.pathname.startsWith(PUBLIC_URL.auth())
	const redirectToAuth = NextResponse.redirect(
		new URL(PUBLIC_URL.auth(), request.url)
	)
	const adminUrls = request.nextUrl.pathname.startsWith('/admin')
	const salerUrls =
		request.nextUrl.pathname.startsWith('/dashboard') ||
		request.nextUrl.pathname.startsWith('/store')

	if (isAuthPage) {
		if (accessToken) {
			return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.url))
		}
		return NextResponse.next()
	}

	if (accessToken) {
		const { role } = getTokenPayload(accessToken)

		if (!role) return redirectToAuth

		if (adminUrls && role !== EnumUserRole.ADMIN) return redirectToAuth

		if (salerUrls && role !== EnumUserRole.ADMIN && role !== EnumUserRole.SALER)
			return redirectToAuth

		return NextResponse.next()
	}

	return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
}

export const config = {
	matcher: ['/dashboard/:path*', '/saler/:path*', '/auth', '/admin/:path*']
}
