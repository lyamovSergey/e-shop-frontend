import * as z from 'zod'

export const getRegisterSchema = (
	$t: (key: string, values?: Record<string, number>) => string
) =>
	z.object({
		name: z.string().min(2, $t('min_length', { num: 2 })),
		email: z.string().min(1, $t('required')).email($t('email')),
		password: z.string().min(6, $t('min_length', { num: 6 }))
	})
export const getLoginSchema = (
	$t: (key: string, values?: Record<string, number>) => string
) =>
	z.object({
		email: z.string().min(1, $t('required')).email($t('email')),
		password: z.string().min(6, $t('min_length', { num: 6 }))
	})
