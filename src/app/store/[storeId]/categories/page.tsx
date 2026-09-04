import type { Metadata } from 'next'

import { Categories } from '@/app/store/[storeId]/categories/Categories'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'page-categories-title',
	...NO_INDEX_PAGE
}
export default function CategoriesPage() {
	return <Categories />
}
