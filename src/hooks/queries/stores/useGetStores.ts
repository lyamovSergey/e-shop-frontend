import { useQuery } from '@tanstack/react-query'

import { storeService } from '@/services/store.service'

export function useGetStores() {
	const {
		data: stores,
		isLoading,
		error
	} = useQuery({
		queryKey: ['store', 'list'],
		queryFn: () => storeService.getAll(),
		staleTime: Infinity
	})

	if (error) console.log('useGetStores error::: ', error)

	return { stores, isLoading }
}
