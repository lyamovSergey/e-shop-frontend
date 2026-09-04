import styles from '@/components/ui/image-upload/ImageUpload.module.scss'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductSkeleton() {
	return (
		<div className='space-y-4'>
			<div className={styles.image_container}>
				<Skeleton className={styles.image_wrapper} />
				<Skeleton className={styles.image_wrapper} />
				<Skeleton className={styles.image_wrapper} />
				<Skeleton className={styles.image_wrapper} />
			</div>
			<div className='flex gap-4'>
				<Skeleton className='w-1/3 h-10' />
				<Skeleton className='w-1/3 h-10' />
				<Skeleton className='w-1/3 h-10' />
			</div>
			<Skeleton className='w-full h-20' />
		</div>
	)
}
