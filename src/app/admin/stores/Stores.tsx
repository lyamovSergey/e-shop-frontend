'use client'

import styles from '@/components/layouts/AdminLayout.module.scss'
import { PageAnimation } from '@/components/layouts/PageAnimation'
import { Heading } from '@/components/ui/Heading'

export function Stores() {
	return (
		<PageAnimation>
			<div className={styles.pageWrapper}>
				<div className={styles.pageHeader}>
					<Heading title={`Stores`} description='All stores' />
				</div>
			</div>
		</PageAnimation>
	)
}
