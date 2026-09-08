'use client'
import layoutStyles from '@/components/layouts/AdminLayout.module.scss'
import { PageAnimation } from '@/components/layouts/PageAnimation'
import { Heading } from '@/components/ui/Heading'

import { MainStatistics } from './statistics/main-statistics/MainStatistics'
import { MiddleStatistics } from './statistics/middle-statistics/MiddleStatistics'

export function Store() {
	return (
		<PageAnimation>
			<div className={layoutStyles.pageWrapper}>
				<Heading title='Statistics' />
				<MainStatistics />
				<MiddleStatistics />
			</div>
		</PageAnimation>
	)
}
