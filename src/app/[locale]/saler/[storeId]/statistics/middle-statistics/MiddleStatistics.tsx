import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'

import { LastUsers } from './LastUsers'
import styles from './MiddleStatistics.module.scss'
import { MiddleStatisticsSkeleton } from './MiddleStatisticsSkeleton'
import { Overview } from './Overview'

export function MiddleStatistics() {
	const { middle, isLoading, isFetching } = useGetStatistics()
	return (
		<div className={styles.middle}>
			{isLoading || isFetching ? (
				<MiddleStatisticsSkeleton />
			) : middle?.monthlySales.length || middle?.lastUsers.length ? (
				<>
					<div className={styles.overview}>
						<Overview data={middle.monthlySales} />
					</div>
					<div className={styles.last_users}>
						<LastUsers data={middle.lastUsers} />
					</div>
				</>
			) : (
				<div>No statistics Data</div>
			)}
		</div>
	)
}
