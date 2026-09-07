'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { PUBLIC_URL } from '@/config/url.config'

import { authService } from '@/services/auth/auth.service'

export function LogoutButton() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const logout = async () => {
		await authService.logout()
		queryClient.removeQueries({
			queryKey: ['profile']
		})
		router.push(PUBLIC_URL.home())
	}
	return (
		<Button variant='neoAction' onClick={logout} className='mb-2'>
			Logout
		</Button>
	)
}
