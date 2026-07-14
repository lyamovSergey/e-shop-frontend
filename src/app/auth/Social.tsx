'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { SERVER_URL } from '@/config/api.config'

export default function Social({ isReg = false }: { isReg?: boolean }) {
	const router = useRouter()
	return (
		<Button
			onClick={() => router.push(`${SERVER_URL}/auth/google`)}
			variant='outline'
			type='button'
		>
			{isReg ? 'Registration' : 'Login'} with Google
		</Button>
	)
}
