import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'

import { categoryService } from '@/services/category.service'

import { ICategoryInput } from '@/shared/types/category.interface'

export function useCreateCategory() {
	const params = useParams<{ storeId?: string }>()
	const queryClient = useQueryClient()

	const { mutateAsync: createCategory, isPending: isLoadingCreate } =
		useMutation({
			mutationKey: ['create_category'],
			mutationFn: (data: ICategoryInput) => categoryService.create(data),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['categories']
				})

				toast.success('Category was created!')
			},
			onError() {
				toast.error('Something went wrong :(')
			}
		})

	return { createCategory, isLoadingCreate }
}
