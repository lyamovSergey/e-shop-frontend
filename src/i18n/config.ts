export type Locale = 'en' | 'uk'
export interface ILocaleInfo {
	name: string
	value: Locale
}

export const localesInfo: ILocaleInfo[] = [
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
export const defaultLocale: Locale = 'en'
export const localePrefix = 'as-needed' as 'as-needed' | 'always'

// export const localesInfo = [
// 	{
// 		name: 'English',
// 		value: 'en'
// 	},
// 	{
// 		name: 'Соловїна',
// 		value: 'uk'
// 	}
// ] as const
// export const locales = localesInfo.map(l => l.value)
// export type Locale = (typeof locales)[number]
