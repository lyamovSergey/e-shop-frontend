'use client'
import { Heading } from '@/components/ui/Heading'

import styles from './Store.module.scss'
import { MainStatistics } from './statistics/main-statistics/MainStatistics'

export function Store() {
	return (
		<div className={styles.wrapper}>
			<Heading title='Statistics' />
			<MainStatistics />
		</div>
	)
}
