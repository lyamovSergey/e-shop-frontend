import type { Metadata } from 'next'

import { Home } from './Home'

export const metadata: Metadata = {
	title: 'Title from main page'
}
export default function HomePage() {
	return <Home />
}
