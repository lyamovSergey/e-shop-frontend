import type { PropsWithChildren } from 'react'

import styles from '../MainLayout.module.scss'

export function MainLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.layout}>
				<main>{children}</main>
			</div>
		</div>
	)
}
