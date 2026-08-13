'use client'
import { MainStatisticsSkeletonItem } from '@/app/store/[storeId]/statistics/main-statistics/MainStatisticsSkeletonItem'

import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'

import styles from './MainStatistics.module.scss'
import { MainStatisticsItem } from './MainStatisticsItem'

export function MainStatistics() {
	const { main, isLoading, isFetching } = useGetStatistics()
	return (
		<div className={styles.main}>
			{isLoading || isFetching ? (
				Array.from({ length: 4 }).map((_, i) => (
					<MainStatisticsSkeletonItem key={i} />
				))
			) : main?.length ? (
				main.map(item => <MainStatisticsItem key={item.id} item={item} />)
			) : (
				<div>No statistics Data</div>
			)}
		</div>
	)
}
