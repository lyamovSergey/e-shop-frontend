import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { STALE_TIME_30_MIN } from '@/constants/api.constants'

import { categoryService } from '@/services/category.service'

export function useGetCategories() {
	const params = useParams<{ storeId: string }>()
	const { data: categories, isLoading } = useQuery({
		queryKey: ['get_categories', params.storeId],
		queryFn: () => categoryService.getByStoreId(params.storeId),
		staleTime: Infinity
	})

	return { categories, isLoading }
}
