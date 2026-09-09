'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import z from 'zod'

import styles from './Stores.module.scss'

import { SALER_URL } from '@/config/url.config'

import { getStoreSchema } from '@/shared/schemas/api/store.schema'

import { formatDate } from '@/utils/string/format-date'

// interface IStoreItemProps {
// 	store: IStore & {
// 		createdAt: string
// 		user: {
// 			name: string
// 			email: string
// 		}
// 	}
// }
interface IStoreItemProps {
	store: z.infer<typeof getStoreSchema>
}
export function StoreItem({ store }: IStoreItemProps) {
	return (
		<div className={styles.storeItem}>
			<div className={styles.storeItem_row}>
				<div className={styles.storeItem_logo}>
					<Image
						src={store.logo}
						alt={store.title}
						width={90}
						height={90}
						loading='eager'
					/>
				</div>
				<div className={styles.storeItem_main}>
					<span className='absolute top-0 right-10 text-xs text-slate-500'>
						{formatDate(store.createdAt)}
					</span>
					<Link
						href={SALER_URL.home(store.id)}
						target='_blank'
						rel='noopener noreferrer'
						className='absolute -top-1 -right-1 neo-base p-1 rounded-sm'
					>
						<SquareArrowOutUpRight className='text-blue-500' size={18} />
					</Link>

					<span className=' font-bold text-xl text-slate-500'>
						{store.title}
					</span>
					<span className='text-xs text-slate-500'>
						Owner: {store.user.name}
					</span>
					<span className='text-xs text-slate-500 -mt-1'>
						({store.user.email})
					</span>
				</div>
			</div>
			<div className={styles.storeItem_row}>
				<span className='text-sm text-slate-500'>{store.description}</span>
			</div>
		</div>
	)
}
