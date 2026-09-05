import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { STALE_TIME_5_MIN } from '@/constants/api.constants'

import { statisticsService } from '@/services/statistics.service'

export function useGetStatistics() {
	const params = useParams<{ storeId: string }>()

	const {
		data: main,
		isLoading: mainIsLoading,
		isFetching: mainIsFetching
	} = useQuery({
		queryKey: ['get_main_statistics'],
		queryFn: () => statisticsService.getMain(params.storeId),
		staleTime: STALE_TIME_5_MIN
	})

	const {
		data: middle,
		isLoading: middleIsLoading,
		isFetching: middleIsFetching
	} = useQuery({
		queryKey: ['get_middle_statistics'],
		queryFn: () => statisticsService.getMiddle(params.storeId),
		staleTime: STALE_TIME_5_MIN
	})

	// return useMemo(
	// 	() => ({
	// 		main,
	// 		middle,
	// 		isLoading: mainIsLoading || middleIsLoading,
	// 		isFetching: mainIsFetching || middleIsFetching
	// 	}),
	// 	[main, middle, params.storeId]
	// )

	return {
		main,
		middle,
		isLoading: mainIsLoading || middleIsLoading,
		isFetching: mainIsFetching || middleIsFetching
	}
}
