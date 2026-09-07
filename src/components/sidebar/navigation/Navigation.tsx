'use client'

import {
	Album,
	BarChart,
	FolderKanban,
	PaintBucket,
	Settings,
	Star
} from 'lucide-react'
import { useParams } from 'next/navigation'

import { MenuItem } from '@/components/sidebar/navigation/MenuItem'
import { type IMenuItem } from '@/components/sidebar/navigation/menu.interface'

import { ADMIN_URL, SALER_URL } from '@/config/url.config'

import styles from './Navigation.module.scss'

interface INavigationProps {
	type: 'admin' | 'saler' | 'user'
}
export default function Navigation({ type = 'user' }: INavigationProps) {
	const params = useParams<{ storeId: string }>()
	const adminRoutes: IMenuItem[] = [
		{
			icon: FolderKanban,
			link: ADMIN_URL.home(),
			value: 'Stores'
		},
		{
			icon: Album,
			link: ADMIN_URL.categories(),
			value: 'Categories'
		}
	]
	const salerRoutes: IMenuItem[] = [
		{
			icon: BarChart,
			link: SALER_URL.home(params.storeId),
			value: 'Statistics'
		},
		{
			icon: FolderKanban,
			link: SALER_URL.products(params.storeId),
			value: 'Products'
		},
		{
			icon: Album,
			link: SALER_URL.categories(params.storeId),
			value: 'Categories'
		},
		// {
		// 	icon: PaintBucket,
		// 	link: SALER_URL.colors(params.storeId),
		// 	value: 'Colors'
		// },
		{
			icon: Star,
			link: SALER_URL.reviews(params.storeId),
			value: 'Reviews'
		},
		{
			icon: Settings,
			link: SALER_URL.settings(params.storeId),
			value: 'Settings'
		}
	]
	const routes = {
		admin: adminRoutes,
		saler: salerRoutes,
		user: []
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.navigation}>
				{routes[type].map(navItem => (
					<MenuItem key={navItem.value} item={navItem} />
				))}
			</div>
		</div>
	)
}
