import type { Metadata } from 'next'

import { Stores } from '@/app/[locale]/admin/stores/Stores'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'adimn-page-title',
	...NO_INDEX_PAGE
}
export default function StoresPage() {
	return <Stores />
}
