'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

import styles from './Auth.module.scss'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'

import { AuthFields } from './AuthFields'
import Social from './Social'
import { useAuthForm } from './useAuthForm'
import { cn } from '@/lib/utils'

export function Auth() {
	const [isReg, setIsReg] = useState(false)
	const { onSubmit, form, isPending } = useAuthForm(isReg)
	const $t = useTranslations('Auth')
	return (
		<div className={styles.wrapper}>
			<div className={cn('flex flex-col gap-6 min-w-85')}>
				{/* <div className='neo-base'></div> */}

				<Card>
					<CardHeader>
						<CardTitle>{isReg ? 'Registration' : $t('title')}</CardTitle>
						<CardDescription>
							{isReg
								? 'Enter your info to create account'
								: 'Enter your email below to login to your account'}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							className='flex flex-col gap-6'
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<AuthFields form={form} isPending={isPending} isReg={isReg} />
							<FieldGroup>
								<Field>
									<Button
										type='submit'
										variant='neoAction'
										disabled={isPending}
									>
										{isReg ? 'Registration' : 'Login'}
									</Button>
									<Social isReg={isReg} disabled={isPending} />
									<FieldDescription className='text-center'>
										{isReg
											? 'Alredy have account? '
											: `Don't have an account? `}
										<button
											className={cn('hover:cursor-pointer underline', {
												'opacity-50 cursor-auto! pointer-events-none': isPending
											})}
											type='button'

											onClick={() => setIsReg(!isReg)}
										>
											{isReg ? 'Sign in' : 'Sign up'}
										</button>
									</FieldDescription>
								</Field>
							</FieldGroup>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
