import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'

import { categoryService } from '@/services/category.service'

import { ICategoryInput } from '@/shared/types/category.interface'

export function useUpdateCategory() {
	const params = useParams<{ categoryId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update_category'],
		mutationFn: (data: ICategoryInput) =>
			categoryService.update(params.categoryId, data),
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
	return { updateColor, isLoadingUpdate }
}
