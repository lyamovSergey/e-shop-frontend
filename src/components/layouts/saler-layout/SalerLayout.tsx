import type { PropsWithChildren } from 'react'

import { Header } from '@/components/header/Header'
import { Sidebar } from '@/components/sidebar/Sidebar'
import Navigation from '@/components/sidebar/navigation/Navigation'

import styles from '../AdminLayout.module.scss'

export function SalerLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.layout}>
				<div className={styles.sidebar}>
					<Sidebar>
						<Navigation type='saler' />
					</Sidebar>
				</div>
				<div className={styles.header}>
					<Header />
				</div>
				<main>{children}</main>
			</div>
		</div>
	)
}
