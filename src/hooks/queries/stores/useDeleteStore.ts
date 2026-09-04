import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { PUBLIC_URL } from '@/config/url.config'

import { storeService } from '@/services/store.service'

export function useDeleteStore() {
	const router = useRouter()
	const params = useParams<{ storeId: string }>()
	const { mutate: deleteStore, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete_store'],
		mutationFn: () => storeService.delete(params.storeId),
		onSuccess() {
			toast.success('Shop was deleted!')
			router.push(PUBLIC_URL.home())
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})
	return { deleteStore, isLoadingDelete }
}
