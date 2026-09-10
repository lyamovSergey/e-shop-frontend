import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as XLSX from 'xlsx'

import { locales, localesInfo } from '@/i18n/config'

type Row = Record<string, string | null>

const sheetId = process.env.LOCALIZATION_TABLE_ID

if (!sheetId) {
	throw new Error('LOCALIZATION_TABLE_ID is not defined')
}

const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`

const localesList = locales

async function updateLocales() {
	console.log('Downloading file...')
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error(`Failed to download localization file: ${res.status}`)
	}
	const buffer = await res.arrayBuffer()

	const wb = XLSX.read(buffer, { type: 'buffer' })
	const ws = wb.Sheets[wb.SheetNames[0]]

	const rows = XLSX.utils.sheet_to_json<Row>(ws, {
		defval: null
	})

	const outputDir = path.join(process.cwd(), 'src/messages')

	await fs.mkdir(outputDir, { recursive: true })

	for (const locale of localesList) {
		const result: Record<string, unknown> = {}

		for (const row of rows) {
			const key = row.KEY

			if (!key) continue

			const value = row[locale]

			const keys = key.split('.')

			let current = result

			keys.forEach((key, index) => {
				if (index === keys.length - 1) {
					current[key] = value
				} else {
					if (!current[key]) {
						current[key] = {}
					}

					current = current[key] as Record<string, unknown>
				}
			})
		}

		const filePath = path.join(outputDir, `${locale}.json`)

		await fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf-8')

		console.log(`✓ ${locale}.json`)
	}

	console.log('Localization files updated')
}

updateLocales().catch(error => {
	console.error(error)
	process.exit(1)
})
