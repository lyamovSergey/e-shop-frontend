'use client'
import Image from 'next/image'
import Link from 'next/link'

import { StoreSwitcher } from '@/components/header/StoreSwitcher'
import { MobileSidebar } from '@/components/sidebar/MobileSidebar'
import { Spinner } from '@/components/ui/spinner'

import { DASHBOARD_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import styles from './Header.module.scss'
import { cn } from '@/lib/utils'

export function Header() {
	const { user, isLoading } = useProfile()
	return (
		<div className={cn('neo-base', styles.header)}>
			<MobileSidebar />
			<div className={styles.header_menu}>
				{isLoading ? (
					<Spinner />
				) : (
					user && (
						<div className=' flex items-center gap-2'>
							{/* <StoreSwitcher items={user.stores} /> */}
							<span className=' text-slate-500'>{user.name}</span>
							<Link href={DASHBOARD_URL.home()}>
								<Image
									src={user.picture}
									alt={user.name}
									width={42}
									height={42}
									loading='eager'
								/>
							</Link>
						</div>
					)
				)}
			</div>
		</div>
	)
}
