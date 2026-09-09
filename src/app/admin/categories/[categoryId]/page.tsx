import type { Metadata } from 'next'

import { SubCategory } from '@/app/admin/categories/[categoryId]/SubCategory'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'page-title',
	...NO_INDEX_PAGE
}
export default function SubCategoryPage() {
	return <SubCategory />
}
