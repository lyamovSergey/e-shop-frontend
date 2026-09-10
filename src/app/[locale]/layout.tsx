import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

import { SITE_DESCRIPTION, SITE_TITLE } from '@/constants/seo.constants'

import '../globals.css'

import { Providers } from './providers'
import { routing } from '@/i18n/routing'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: SITE_TITLE,
		template: `%s | ${SITE_TITLE}`
	},
	description: SITE_DESCRIPTION
}

export default async function RootLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}
	return (
		<html
			lang={locale}
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className='min-h-full flex flex-col'>
				<NextIntlClientProvider locale={locale}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
