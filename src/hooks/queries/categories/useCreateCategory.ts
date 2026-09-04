import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { categoryService } from '@/services/category.service'

import { ICategoryInput } from '@/shared/types/category.interface'

export function useCreateCategory() {
	const params = useParams<{ storeId: string }>()
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create_category'],
		mutationFn: (data: ICategoryInput) =>
			categoryService.create(data, params.storeId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get_categories']
			})
			toast.success('Category was created!')
			router.push(STORE_URL.products(params.storeId))
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})

	return { createCategory, isLoadingCreate }
}
