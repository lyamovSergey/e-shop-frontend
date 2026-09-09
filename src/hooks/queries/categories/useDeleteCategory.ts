import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { categoryService } from '@/services/category.service'

export function useDeleteCategory() {
	const queryClient = useQueryClient()

	const { mutateAsync: deleteCategory, isPending: isLoadingDelete } =
		useMutation({
			mutationKey: ['category', 'delete'],
			mutationFn: (categoryId: string) => {
				if (!categoryId) {
					throw new Error('Category ID is required')
				}
				return categoryService.delete(categoryId)
			},
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['category']
				})
				toast.success('Category was deleted!')
			},
			onError() {
				toast.error('Something went wrong :(')
			}
		})

	return { deleteCategory, isLoadingDelete }
}
