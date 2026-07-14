import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { PUBLIC_URL } from '@/config/url.config'

import { authService } from '@/services/auth/auth.service'

import { IAuthForm } from '@/shared/types/auth.interface'

const loginSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email address'),
	password: z.string().min(6, 'Password must contain at least 6 characters')
})

const registerSchema = z.object({
	name: z.string().min(2, 'Name must contain at least 2 characters'),
	email: z.string().min(1, 'Email is required').email('Invalid email address'),
	password: z.string().min(6, 'Password must contain at least 6 characters')
})

export function useAuthForm(isReg: boolean) {
	const formSchema = isReg ? registerSchema : loginSchema
	const router = useRouter()
	const form = useForm<IAuthForm>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})
	const { mutate, isPending } = useMutation({
		mutationKey: ['auth-user'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isReg ? 'register' : 'login', data),
		onSuccess() {
			form.reset()
			toast.success('Auth Success!')
			router.replace(PUBLIC_URL.home())
		},
		onError(error) {
			if (error.message) {
				toast.error(error.message)
			} else {
				toast.error('Something went wrong:(')
			}
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}
	return { onSubmit, form, isPending }
}
