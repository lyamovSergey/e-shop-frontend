import type { PropsWithChildren } from 'react'

import { Header } from '@/components/header/Header'
import styles from '@/components/layouts/AdminLayout.module.scss'
import { Sidebar } from '@/components/sidebar/Sidebar'
import Navigation from '@/components/sidebar/navigation/Navigation'

export function AdminLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.layout}>
				<div className={styles.sidebar}>
					<Sidebar>
						<Navigation type='admin' />
					</Sidebar>
				</div>
				<div className={styles.header}>{<Header />}</div>
				<main>{children}</main>
			</div>
		</div>
	)
}
