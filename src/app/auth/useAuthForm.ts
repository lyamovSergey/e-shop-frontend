import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
	ADMIN_URL,
	DASHBOARD_URL,
	PUBLIC_URL,
	SALER_URL
} from '@/config/url.config'

import { authService } from '@/services/auth/auth.service'

import { loginSchema, registerSchema } from '@/shared/schemas/auth.schema'
import { IAuthForm } from '@/shared/types/auth.interface'
import { EnumUserRole } from '@/shared/types/user.interface'

export function useAuthForm(isReg: boolean) {
	const queryClient = useQueryClient()
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

			queryClient.setQueryData(['profile'], data.user)

			if (data.user.role === EnumUserRole.ADMIN) router.push(ADMIN_URL.home())
			if (data.user.role === EnumUserRole.SALER) {
				if (data.user.store) router.push(SALER_URL.home(data.user.store.id))
				router.push(SALER_URL.createStore())
			}
			if (data.user.role == EnumUserRole.USER) router.push(PUBLIC_URL.home())
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
