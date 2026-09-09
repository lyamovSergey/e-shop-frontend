import { useQuery } from '@tanstack/react-query'

import { categoryService } from '@/services/category.service'

export function useGetCategories() {
	const {
		data: categories,
		isLoading,
		error
	} = useQuery({
		queryKey: ['categories', 'list'],
		queryFn: () => categoryService.getAll(),
		staleTime: Infinity
	})

	if (error) console.log('useGetCategories error::', error)
	return { categories, isLoading }
}
