'use client'
import styles from './Header.module.scss'

import { LangToggler } from '@/components/ui/locale/LangToggler'

export function DefaultHeader() {
	return (
		<div className={styles.header_default}>
			<LangToggler className=' ml-auto' />
		</div>
	)
}
