import { useQuery } from '@tanstack/react-query'

import { storeService } from '@/services/store.service'

export function useGetStores() {
	const { data: stores, isLoading } = useQuery({
		queryKey: ['get_stores_all'],
		queryFn: () => storeService.getAll(),
		staleTime: Infinity
	})

	return { stores, isLoading }
}
