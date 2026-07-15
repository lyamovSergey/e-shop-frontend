import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Store } from './Store'

export const metadata: Metadata = {
	title: 'Title from store page',
	...NO_INDEX_PAGE
}
export default function StorePage() {
	return <Store />
}
