import CountUp from 'react-countup'

import styles from './MainStatistics.module.scss'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { IMainStatistics } from '@/shared/schemas/api/statistics.schema'

import { formatPrice } from '@/utils/string/format-price'

import { getIcon } from './statistics.utils'

interface MainStatisticsItemProps {
	item: IMainStatistics
}
export function MainStatisticsItem({ item }: MainStatisticsItemProps) {
	const Icon = getIcon(item.id)
	return (
		<Card className={styles.item}>
			<CardHeader className={styles.header}>
				<CardTitle className={styles.title}>{item.name}</CardTitle>
				<Icon />
			</CardHeader>
			<CardContent className={styles.content}>
				<h2>
					{item.id !== 1 ? (
						<CountUp end={item.value} />
					) : (
						<CountUp end={item.value} formattingFn={formatPrice} />
					)}
				</h2>
			</CardContent>
		</Card>
	)
}
