import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { DASHBOARD_URL, STORE_URL } from '@/config/url.config'

import { authService } from '@/services/auth/auth.service'

import { loginSchema, registerSchema } from '@/shared/schemas/auth.schema'
import { IAuthForm } from '@/shared/types/auth.interface'

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
		onSuccess(data) {
			form.reset()
			toast.success('Auth Success!')
			if (data.user.stores.length != 0) {
				router.push(STORE_URL.home(data.user.stores[0].id))
			} else {
				// router.replace(DASHBOARD_URL.home())
				router.push(DASHBOARD_URL.home())
			}
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
