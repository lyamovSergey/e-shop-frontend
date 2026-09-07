import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import styles from './MiddleStatistics.module.scss'
import { cn } from '@/lib/utils'

export function MiddleStatisticsSkeleton() {
	return (
		<Card className={cn(styles.overview, 'h-77.5 w-full')}>
			<CardHeader className='flex'>
				<Skeleton className='h-14 w-full' />
			</CardHeader>
			<CardContent className='flex grow'>
				<Skeleton className='flex grow w-full' />
			</CardContent>
		</Card>
	)
}
