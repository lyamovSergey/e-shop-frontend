export const localesInfo = [
	{
		name: 'English',
		value: 'en'
	},
	{
		name: 'Соловїна',
		value: 'uk'
	}
]
export const locales = localesInfo.map(l => l.value)
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
export const localePrefix = 'always' as 'as-needed' | 'always'
