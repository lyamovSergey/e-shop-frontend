import type { Metadata } from 'next'

import { Create } from '@/app/[locale]/(create-store)/saler/create/Create'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'page-title',
	...NO_INDEX_PAGE
}
export default function CreateStorePage() {
	return <Create />
}
