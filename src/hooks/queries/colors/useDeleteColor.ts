import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { colorService } from '@/services/color.service'

export function useDeleteColor() {
	const params = useParams<{ colorId: string; storeId: string }>()
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: deleteColor, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete_color'],
		mutationFn: () => colorService.delete(params.colorId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get_colors']
			})
			toast.success('Color was deleted!')
			router.push(STORE_URL.products(params.storeId))
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})

	return { deleteColor, isLoadingDelete }
}
