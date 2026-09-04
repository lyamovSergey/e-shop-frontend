import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { categoryService } from '@/services/category.service'

import { ICategoryInput } from '@/shared/types/category.interface'

export function useUpdateCategory(categoryId?: string) {
	const queryClient = useQueryClient()

	const { mutateAsync: updateCategory, isPending: isLoadingUpdate } =
		useMutation({
			mutationKey: ['update_category'],
			mutationFn: (data: ICategoryInput) => {
				if (!categoryId) {
					throw new Error('Category ID is required')
				}
				return categoryService.update(categoryId, data)
			},
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['get_categories']
				})
				toast.success('Category was updated!')
			},
			onError() {
				toast.error('Something went wrong :(')
			}
		})
	return { updateCategory, isLoadingUpdate }
}
