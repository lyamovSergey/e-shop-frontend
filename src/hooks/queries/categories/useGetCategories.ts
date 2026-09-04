import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { categoryService } from '@/services/category.service'

export function useGetCategories() {
	const params = useParams<{ storeId: string }>()
	const { data: categories, isLoading } = useQuery({
		queryKey: ['get_categories'],
		queryFn: () => categoryService.getByStoreId(params.storeId)
	})

	return { categories, isLoading }
}
