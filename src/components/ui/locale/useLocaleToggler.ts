import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'

import { Locale } from '@/i18n/config'
import { localesInfo } from '@/i18n/config'
import { usePathname, useRouter } from '@/i18n/navigation'

export function useLocaleToggler() {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const params = useParams()
	const onChange = (nextLocale: string | null) => {
		router.replace(
			// @ts-expect-error -- TypeScript will validate that only known `params`
			// are used in combination with a given `pathname`. Since the two will
			// always match for the current route, we can skip runtime checks.
			{ pathname, params },
			{ locale: nextLocale as Locale }
		)
	}
	return {
		onChange,
		locale,
		localesInfo
	}
}
