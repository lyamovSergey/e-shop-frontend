'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IMenuItem } from '@/components/layouts/store-layout/sidebar/navigation/menu.interface'

import styles from './Navigation.module.scss'
import { cn } from '@/lib/utils'

interface MenuItemProps {
	item: IMenuItem
}
export function MenuItem({ item }: MenuItemProps) {
	const pathName = usePathname()
	return (
		<Link
			href={item.link}
			className={cn(styles.navLink, {
				[styles.active]: pathName === item.link
			})}
		>
			<item.icon />
			{item.value}
		</Link>
	)
}
