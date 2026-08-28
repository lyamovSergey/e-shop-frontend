import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { storeService } from '@/services/store.service'

import { IStoreEdit } from '@/shared/types/store.interface'

export function useUpdateStore() {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()
	const { data: store } = useQuery({
		queryKey: ['store', params.storeId],
		queryFn: () => storeService.getById(params.storeId)
	})

	const { mutate: updateStore, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update_store'],
		mutationFn: (data: IStoreEdit) => storeService.update(params.storeId, data),
		onSuccess(updatedStore) {
			queryClient.setQueryData(['store', params.storeId], updatedStore)
			queryClient.invalidateQueries({
				queryKey: ['profile']
			})
			toast.success('Shop was updated!')
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})

	return useMemo(
		() => ({
			store,
			updateStore,
			isLoadingUpdate
		}),
		[store, updateStore, isLoadingUpdate]
	)
}
