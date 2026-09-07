import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'

import { IMonthlySales } from '@/shared/types/statistics.interface'

import styles from './MiddleStatistics.module.scss'

interface OverviewProps {
	data: IMonthlySales[]
}

const chartConfig = {
	value: {
		label: 'Прибыль',
		color: '#3B82F6'
	}
} satisfies ChartConfig
export function Overview({ data }: OverviewProps) {
	// const testData = Array.from({ length: 20 }, (_, index) => ({
	// 	date: `${20 - index}-Aug-2026`,
	// 	value: Math.floor(Math.random() * 50000) + 30000
	// }))

	// data = testData

	return (
		<Card>
			<CardHeader className={styles.header}>
				<CardTitle>Прибыль</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className='aspect-auto h-77.5 w-full'
				>
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{ left: 12, right: 12 }}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={true}
							axisLine={false}
							tickMargin={8}
							reversed={true}
							interval={data.length <= 4 ? 0 : 'preserveStartEnd'}
							padding={{ left: 30, right: 30 }}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									// formatter={(val, name) => (
									// 	<>
									// 		<div className=''>{name}</div>
									// 		<div className=''>{formatPrice(val as number)}</div>
									// 	</>
									// )}
									indicator='line'
								/>
							}
						/>
						<Area
							dataKey='value'
							type='natural'
							fill='var(--color-value)'
							stroke='var(--color-value)'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
