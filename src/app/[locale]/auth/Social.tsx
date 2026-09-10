'use client'

import { useTranslations } from 'next-intl'

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
	const $t = useTranslations('Auth')
	return (
		<Button
			onClick={() => router.push(`${SERVER_URL}/auth/google`)}
			variant='neoAction'
			type='button'
			disabled={disabled}
		>
			{isReg ? $t('sign_up_link') : $t('sign_in_link')}{' '}
			{$t('sign_up_vs_google')}
		</Button>
	)
}
