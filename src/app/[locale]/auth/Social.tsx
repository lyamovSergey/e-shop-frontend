'use client'

import { Button } from '@/components/ui/button'

import { SERVER_URL } from '@/config/api.config'

import { useRouter } from '@/i18n/navigation'

export default function Social({
	isReg = false,
	disabled = false
}: {
	isReg?: boolean
	disabled?: boolean
}) {
	const router = useRouter()
	return (
		<Button
			onClick={() => router.push(`${SERVER_URL}/auth/google`)}
			variant='neoAction'
			type='button'
			disabled={disabled}
		>
			{isReg ? 'Registration' : 'Login'} with Google
		</Button>
	)
}
