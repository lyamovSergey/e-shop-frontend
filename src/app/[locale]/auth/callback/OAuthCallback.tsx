'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { saveTokenStorage } from '@/services/auth/auth-token.service'

export default function OAuthCallback() {
	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')
		if (!accessToken) {
			router.replace('/auth')
			return
		}
		saveTokenStorage(accessToken)
		router.replace('/dashboard')
	}, [searchParams])
	return null
}
