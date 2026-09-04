import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { categoryService } from '@/services/category.service'

export function useDeleteCategory() {
	const params = useParams<{ categoryId: string; storeId: string }>()
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: deleteCategory, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete_category'],
		mutationFn: () => categoryService.delete(params.categoryId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get_categories']
			})
			toast.success('Category was deleted!')
			router.push(STORE_URL.products(params.storeId))
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})

	return { deleteCategory, isLoadingDelete }
}
