import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MainStatisticsSkeletonItem() {
	return (
		<Card className='w-full max-w-xs flex flex-col justify-between'>
			<CardHeader className='flex'>
				<Skeleton className='h-6 w-4/5' />
				<Skeleton className='h-6 w-1/5' />
			</CardHeader>
			<CardContent>
				<Skeleton className='h-8 w-full' />
			</CardContent>
		</Card>
	)
}
