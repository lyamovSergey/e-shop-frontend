import { defineRouting } from 'next-intl/routing'

import { defaultLocale, localePrefix, locales } from './config'

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: locales,

	// Used when no locale matches
	defaultLocale: defaultLocale,
	localePrefix: localePrefix,
	localeDetection: true
})
