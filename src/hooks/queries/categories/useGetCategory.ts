import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { categoryService } from '@/services/category.service'

export function useGetCategory() {
	const params = useParams<{ categoryId: string }>()
	const {
		data: category,
		isLoading,
		error
	} = useQuery({
		queryKey: ['category', 'by-id', params.categoryId],
		queryFn: () => categoryService.getById(params.categoryId),
		staleTime: Infinity
	})

	if (error) console.log('useGetCategory error::', error)
	return { category, isLoading }
}
