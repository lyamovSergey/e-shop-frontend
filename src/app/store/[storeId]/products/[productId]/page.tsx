import type { Metadata } from 'next'

import { ProductEdit } from '@/app/store/[storeId]/products/[productId]/ProductEdit'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Product Edit title',
	...NO_INDEX_PAGE
}
export default function productEditPage() {
	return <ProductEdit />
}
