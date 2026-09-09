import styles from './Categories.module.scss'

import { Skeleton } from '@/components/ui/skeleton'

export function CategorySkeleton() {
	return (
		<div className={styles.categoryItem}>
			<Skeleton className='h-6 w-full' />
		</div>
	)
}
