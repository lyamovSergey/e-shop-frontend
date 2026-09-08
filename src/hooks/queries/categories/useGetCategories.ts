import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { categoryService } from '@/services/category.service'

export function useGetCategories() {
	const params = useParams<{ storeId: string }>()
	const { data: categories, isLoading } = useQuery({
		queryKey: ['categories', params.storeId, 'list'],
		queryFn: () => categoryService.getByStoreId(params.storeId),
		staleTime: Infinity
	})

	return { categories, isLoading }
}
