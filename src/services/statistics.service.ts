import { axiosWithAuth } from '@/api/api.client.interseptors'

import { API_URL } from '@/config/api.config'

import {
	IMainStatistics,
	IMiddleStatistics,
	mainStatisticSchema,
	middleStatisticsSchema
} from '@/shared/schemas/api/statistics.schema'

class StatisticsService {
	async getMain(storeId: string) {
		const { data } = await axiosWithAuth<IMainStatistics[]>({
			url: API_URL.statistics(`/main/${storeId}`),
			method: 'GET'
		})

		return mainStatisticSchema.parse(data)
	}

	async getMiddle(storeId: string) {
		const { data } = await axiosWithAuth<IMiddleStatistics>({
			url: API_URL.statistics(`/middle/${storeId}`),
			method: 'GET'
		})

		return middleStatisticsSchema.parse(data)
	}
}
export const statisticsService = new StatisticsService()
