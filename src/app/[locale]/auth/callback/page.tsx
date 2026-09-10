import { Suspense } from 'react'

import OAuthCallback from '@/app/[locale]/auth/callback/OAuthCallback'

export default function CallbackPage() {
	return (
		<Suspense fallback={null}>
			<OAuthCallback />
		</Suspense>
	)
}
