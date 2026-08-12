'use client'
import Image from 'next/image'
import Link from 'next/link'

import { StoreSwitcher } from '@/components/layouts/store-layout/header/StoreSwitcher'
import { MobileSidebar } from '@/components/layouts/store-layout/sidebar/MobileSidebar'
import { Spinner } from '@/components/ui/spinner'

import { DASHBOARD_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import styles from './Header.module.scss'

export function Header() {
	const { user, isLoading } = useProfile()
	return (
		<div className={styles.header}>
			<MobileSidebar />
			<div className={styles.header_menu}>
				{isLoading ? (
					<Spinner />
				) : (
					user && (
						<>
							<StoreSwitcher items={user.stores} />
							<Link href={DASHBOARD_URL.home()}>
								<Image
									src={user.picture}
									alt={user.name}
									width={42}
									height={42}
									loading='eager'
								/>
							</Link>
						</>
					)
				)}
			</div>
		</div>
	)
}
