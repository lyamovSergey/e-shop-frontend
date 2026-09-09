import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'

import { storeService } from '@/services/store.service'

import { IStoreInput } from '@/shared/schemas/api/store.schema'

export function useUpdateStore() {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()
	const { data: store, error } = useQuery({
		queryKey: ['store', 'by-id', params.storeId],
		queryFn: () => storeService.getById(params.storeId)
	})

	if (error) console.log('useUpdateStore error::: ', error)

	const { mutate: updateStore, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['store', 'update'],
		mutationFn: (data: IStoreInput) =>
			storeService.update(params.storeId, data),
		onSuccess(updatedStore) {
			queryClient.setQueryData(['store', 'by-id', params.storeId], updatedStore)
			queryClient.invalidateQueries({
				queryKey: ['profile']
			})
			toast.success('Shop was updated!')
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})

	return {
		store,
		updateStore,
		isLoadingUpdate
	}
}
