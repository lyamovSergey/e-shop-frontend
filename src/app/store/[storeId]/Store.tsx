'use client'
import { PageAnimation } from '@/components/layouts/PageAnimation'
import { Heading } from '@/components/ui/Heading'

import styles from './Store.module.scss'
import { MainStatistics } from './statistics/main-statistics/MainStatistics'
import { MiddleStatistics } from './statistics/middle-statistics/MiddleStatistics'

export function Store() {
	return (
		<PageAnimation>
			<div className={styles.wrapper}>
				<Heading title='Statistics' />
				<MainStatistics />
				<MiddleStatistics />
			</div>
		</PageAnimation>
	)
}
