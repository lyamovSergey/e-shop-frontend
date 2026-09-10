import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ADMIN_URL, PUBLIC_URL, SALER_URL } from '@/config/url.config'

import { authService } from '@/services/auth/auth.service'

import { EnumUserRole } from '@/shared/schemas/api/user.schema'
import {
	loginSchema,
	registerSchema
} from '@/shared/schemas/form-validators/auth.schema'
import { IAuthForm } from '@/shared/types/auth.interface'

import { useRouter } from '@/i18n/navigation'

export function useAuthForm(isReg: boolean) {
	const queryClient = useQueryClient()
	const formSchema = isReg ? registerSchema : loginSchema
	const router = useRouter()
	const form = useForm<IAuthForm>({
		resolver: zodResolver(formSchema),
		mode: 'onSubmit',
		defaultValues: {
			name: '',
			email: 'admin@mail.com',
			password: '123456'
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

			if (data.user.role === EnumUserRole.ADMIN) {
				router.push(ADMIN_URL.home())
			}
			if (data.user.role === EnumUserRole.SALER) {
				if (data.user.store?.id) {
					router.push(SALER_URL.home(data.user.store.id))
				}
				router.push(SALER_URL.createStore())
			}
			if (data.user.role == EnumUserRole.USER) {
				router.push(PUBLIC_URL.home())
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
