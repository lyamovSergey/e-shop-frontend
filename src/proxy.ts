import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'

import { ADMIN_URL, PUBLIC_URL, SALER_URL } from '@/config/url.config'

import { EnumUserRole } from '@/shared/schemas/api/user.schema'

import { getTokenPayload } from '@/utils/parse-token'

import { routing } from './i18n/routing'
import { clearPath, redirectWithLocale } from './i18n/utils'
import { EnumTokens } from './services/auth/auth-token.service'

const intlMiddleware = createMiddleware(routing)

export default async function proxy(request: NextRequest) {
	const response = intlMiddleware(request)
	const { pathname } = request.nextUrl
	const pathWithoutLocale = clearPath(pathname)

	const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const isAuthPage = pathWithoutLocale.startsWith(PUBLIC_URL.auth())
	const isAdminPage = pathWithoutLocale.startsWith(ADMIN_URL.root())
	const isSalerPage = pathWithoutLocale.startsWith(SALER_URL.root())

	let userRole = EnumUserRole.USER
	let userStoreId
	if (accessToken) {
		const { role, storeId } = getTokenPayload(accessToken)
		userRole = role
		userStoreId = storeId
	}

	if (isAuthPage) {
		if (accessToken) {
			if (userRole === EnumUserRole.ADMIN)
				return redirectWithLocale(request, ADMIN_URL.home())
			if (userRole === EnumUserRole.SALER && userStoreId)
				return redirectWithLocale(request, SALER_URL.home(userStoreId))
			return redirectWithLocale(request, PUBLIC_URL.home())
		}
	}
	if (userRole !== EnumUserRole.ADMIN && isAdminPage) {
		return redirectWithLocale(request, PUBLIC_URL.auth())
	}
	if (
		userRole !== EnumUserRole.ADMIN &&
		userRole !== EnumUserRole.SALER &&
		isSalerPage
	) {
		return redirectWithLocale(request, PUBLIC_URL.auth())
	}

	return response
}

export const config = {
	// Match all pathnames except for
	// - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
	// - … the ones containing a dot (e.g. `favicon.ico`)
	matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}
