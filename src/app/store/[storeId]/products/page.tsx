import type { Metadata } from 'next'

import { Products } from '@/app/store/[storeId]/products/Products'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Products page',
	...NO_INDEX_PAGE
}
export default function productsPage() {
	return <Products />
}
