'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import { IMenuItem } from '@/components/sidebar/navigation/menu.interface'

import { SALER_URL } from '@/config/url.config'

import styles from './Navigation.module.scss'
import { cn } from '@/lib/utils'

interface MenuItemProps {
	item: IMenuItem
}
export function MenuItem({ item }: MenuItemProps) {
	const pathName = usePathname()
	const params = useParams<{ storeId: string }>()
	return (
		<Link
			href={item.link}
			className={cn(styles.navLink, {
				[`${styles.active} neo-push`]:
					pathName === item.link ||
					(item.link !== SALER_URL.home(params.storeId) &&
						pathName.startsWith(`${item.link}/`))
			})}
		>
			<item.icon />
			{item.value}
		</Link>
	)
}
