import type { PropsWithChildren } from 'react'

import styles from './StoreLayout.module.scss'

export function StoreLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.layout}>
				<div className={styles.sidebar}></div>
				<div className={styles.header}></div>
				<main>{children}</main>
			</div>
		</div>
	)
}
