'use client'

import styles from './Stores.module.scss'
import layoutStyles from '@/components/layouts/AdminLayout.module.scss'

import { StoreItem } from '@/app/admin/stores/StoreItem'

import { PageAnimation } from '@/components/layouts/PageAnimation'
import { Heading } from '@/components/ui/Heading'

import { useGetStores } from '@/hooks/queries/stores/useGetStores'

export function Stores() {
	const { stores } = useGetStores()
	return (
		<PageAnimation>
			<div className={layoutStyles.pageWrapper}>
				<div className={layoutStyles.pageHeader}>
					<Heading title={`Stores`} description='All stores' />
				</div>
				<div className={layoutStyles.pageContent}>
					<div className={styles.storesContainer}>
						{stores?.map(store => (
							<StoreItem store={store} key={store.id} />
						))}
					</div>
				</div>
			</div>
		</PageAnimation>
	)
}
