import { useQuery } from '@tanstack/react-query'

import { categoryService } from '@/services/category.service'

export function useGetCategoriesAll() {
	const { data: categories, isLoading } = useQuery({
		queryKey: ['categories', 'all'],
		queryFn: () => categoryService.getAll(),
		staleTime: Infinity
	})

	return { categories, isLoading }
}
