import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { SALER_URL } from '@/config/url.config'

import { storeService } from '@/services/store.service'

import { IStoreInput } from '@/shared/schemas/api/store.schema'

import { useRouter } from '@/i18n/navigation'

export function useCreateStore() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { mutate: createStore, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['ctore', 'create'],
		mutationFn: (data: IStoreInput) => storeService.create(data),
		onSuccess(store) {
			queryClient.invalidateQueries({
				queryKey: ['profile']
			})
			toast.success('Shop was created!')
			router.push(SALER_URL.home(store.id))
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})
	return { createStore, isLoadingCreate }
}
