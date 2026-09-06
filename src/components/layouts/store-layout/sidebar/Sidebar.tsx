import { Logo } from '@/components/layouts/main-layout/header/logo/Logo'
import Navigation from '@/components/layouts/store-layout/sidebar/navigation/Navigation'

import styles from './Sidebar.module.scss'
import { cn } from '@/lib/utils'

export function Sidebar() {
	return (
		<div className={cn('neo-base', styles.sidebar)}>
			<Logo />
			<Navigation />
		</div>
	)
}
