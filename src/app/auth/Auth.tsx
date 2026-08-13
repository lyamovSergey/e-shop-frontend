'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Field,
	FieldDescription,
	FieldGroup
} from '@/components/ui/form-elements/field'

import styles from './Auth.module.scss'
import { AuthFields } from './AuthFields'
import Social from './Social'
import { useAuthForm } from './useAuthForm'
import { cn } from '@/lib/utils'

export function Auth() {
	const [isReg, setIsReg] = useState(false)
	const { onSubmit, form, isPending } = useAuthForm(isReg)
	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<Image
					src='/images/auth.svg'
					alt='e-shop auth'
					width={100}
					height={70}
					className='h-17.5'
					priority
				/>
			</div>
			<div className={styles.right}>
				<div className={cn('flex flex-col gap-6 min-w-95')}>
					<Card>
						<CardHeader>
							<CardTitle>
								{isReg ? 'Registration' : 'Login to your account'}
							</CardTitle>
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
										<Button type='submit'>
											{isReg ? 'Registration' : 'Login'}
										</Button>
										<Social isReg={isReg} />
										<FieldDescription className='text-center'>
											{isReg
												? 'Alredy have account? '
												: `Don't have an account? `}
											<button
												className=' hover:cursor-pointer underline'
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
		</div>
	)
}
