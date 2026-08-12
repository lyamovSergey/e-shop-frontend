'use client'
import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'

import styles from './MainStatistics.module.scss'
import { MainStatisticsItem } from './MainStatisticsItem'

export function MainStatistics() {
	const { main } = useGetStatistics()
	console.log('main::: ', main)
	return (
		<div className={styles.main}>
			{main?.length ? (
				main.map(item => <MainStatisticsItem key={item.id} item={item} />)
			) : (
				<div>No statistics Data</div>
			)}
		</div>
	)
}
