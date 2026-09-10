import type { PropsWithChildren } from 'react'

import styles from '../MainLayout.module.scss'

import { DefaultHeader } from '@/components/header/DefaultHeader'

export function MainLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.layout}>
				<DefaultHeader />
				<main>{children}</main>
			</div>
		</div>
	)
}
