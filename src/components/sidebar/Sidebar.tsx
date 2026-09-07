import type { PropsWithChildren } from 'react'

import { Logo } from '@/components/layouts/main-layout/header/logo/Logo'
import { LogoutButton } from '@/components/ui/LogoutButton'

import styles from './Sidebar.module.scss'
import { cn } from '@/lib/utils'

export function Sidebar({ children }: PropsWithChildren<unknown>) {
	return (
		<div className={cn('neo-base', styles.sidebar)}>
			<Logo />
			{children}
			<LogoutButton />
		</div>
	)
}
