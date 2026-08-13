import Image from 'next/image'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { ILastUsers } from '@/shared/types/statistics.interface'

import { formatPrice } from '@/utils/string/format-price'

import styles from './MiddleStatistics.module.scss'

interface LastUsersProps {
	data: ILastUsers[]
}
export function LastUsers({ data }: LastUsersProps) {
	return (
		<Card>
			<CardHeader className={styles.header}>
				<CardTitle>Last users</CardTitle>
			</CardHeader>
			<CardContent>
				{data.length ? (
					data.map(user => (
						<div className={styles.user} key={user.id}>
							<Image
								src={user.picture}
								alt={user.name}
								width={48}
								height={48}
							/>
							<div className={styles.info}>
								<p className={styles.name}>{user.name}</p>
								<p>{user.email}</p>
							</div>
							<div className={styles.total}>+{formatPrice(user.total)}</div>
						</div>
					))
				) : (
					<div className=''>No users</div>
				)}
			</CardContent>
		</Card>
	)
}
