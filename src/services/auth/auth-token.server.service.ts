import { cookies } from 'next/headers'

import { EnumTokens } from '@/services/auth/auth-token.service'

export const getAccessTokenServer = async () => {
	const cookieStore = await cookies()

	return cookieStore.get(EnumTokens.ACCESS_TOKEN)?.value || null
}
