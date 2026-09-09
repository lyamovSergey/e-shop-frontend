import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { STALE_TIME_5_MIN } from '@/constants/api.constants'

import { statisticsService } from '@/services/statistics.service'

export function useGetStatistics() {
	const params = useParams<{ storeId: string }>()

	const {
		data: main,
		isLoading: mainIsLoading,
		isFetching: mainIsFetching,
		error: mainError
	} = useQuery({
		queryKey: ['statistics', 'main', params.storeId],
		queryFn: () => statisticsService.getMain(params.storeId),
		staleTime: STALE_TIME_5_MIN
	})

	if (mainError) console.log('useGetStatistics error::: ', mainError)

	const {
		data: middle,
		isLoading: middleIsLoading,
		isFetching: middleIsFetching,
		error: middleError
	} = useQuery({
		queryKey: ['statistics', 'middle', params.storeId],
		queryFn: () => statisticsService.getMiddle(params.storeId),
		staleTime: STALE_TIME_5_MIN
	})

	if (middleError) console.log('useGetStatistics error::: ', middleError)

	return {
		main,
		middle,
		isLoading: mainIsLoading || middleIsLoading,
		isFetching: mainIsFetching || middleIsFetching
	}
}
