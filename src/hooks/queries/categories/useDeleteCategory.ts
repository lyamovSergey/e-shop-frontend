import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { categoryService } from '@/services/category.service'

export function useDeleteCategory(categoryId?: string) {
	const queryClient = useQueryClient()

	const { mutateAsync: deleteCategory, isPending: isLoadingDelete } =
		useMutation({
			mutationKey: ['delete_category'],
			mutationFn: () => {
				if (!categoryId) {
					throw new Error('Category ID is required')
				}
				return categoryService.delete(categoryId)
			},
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['get_categories']
				})
				toast.success('Category was deleted!')
			},
			onError() {
				toast.error('Something went wrong :(')
			}
		})

	return { deleteCategory, isLoadingDelete }
}
