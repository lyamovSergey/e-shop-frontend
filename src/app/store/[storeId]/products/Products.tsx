'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { ViewTransition } from 'react'

import {
	IProductColumn,
	ProductColumns
} from '@/app/store/[storeId]/products/ProductColumns'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { DataTableLoading } from '@/components/ui/data/DataLoading'
import { DataTable } from '@/components/ui/data/DataTable'

import { STORE_URL } from '@/config/url.config'

import { useGetProducts } from '@/hooks/queries/products/useGetProducts'

import { formatPrice } from '@/utils/string/format-price'

import styles from '../Store.module.scss'

interface IProductsProps {
	storeId: string
}
export function Products({ storeId }: IProductsProps) {
	const { products, isProductsLoading } = useGetProducts(storeId)

	const formattedProducts: IProductColumn[] = products
		? products.map(product => ({
				id: product.id,
				title: product.title,
				price: formatPrice(product.price),
				category: product.category.name,
				color: product.color.value,
				storeId: product.storeId
			}))
		: []

	return (
		<ViewTransition enter='page-enter' exit='page-exit'>
			<div className={styles.wrapper}>
				{isProductsLoading ? (
					<DataTableLoading />
				) : (
					<>
						<div className={styles.header}>
							<Heading
								title={`Products (${products?.length || 0})`}
								description='All products in your store'
							/>
							<div className={styles.buttons}>
								<Link href={STORE_URL.productCreate(storeId)}>
									<Button variant='primary'>
										<Plus />
										Create
									</Button>
								</Link>
							</div>
						</div>
						<div className={styles.table}>
							<DataTable
								columns={ProductColumns}
								data={formattedProducts}
								filterKey='title'
							/>
						</div>
					</>
				)}
			</div>
		</ViewTransition>
	)
}
