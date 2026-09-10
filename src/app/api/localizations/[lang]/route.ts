/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx'

let cache: any[] | null = null
const sheetId = process.env.LOCALIZATION_TABLE_ID
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ lang: string }> }
) {
	const { lang } = await params
	const { searchParams } = new URL(req.url)
	const LANG = lang.toLowerCase()

	const fetchLocalizationFile = async () => {
		try {
			const res = await fetch(url)
			const buffer = await res.arrayBuffer()
			const wb = XLSX.read(buffer, { type: 'buffer' })
			const ws = wb.Sheets[wb.SheetNames[0]]
			cache = XLSX.utils.sheet_to_json(ws, { defval: null })
			return cache
		} catch (error) {
			console.log('error::: ', error)
			if (cache) return cache
			return new Response(
				JSON.stringify({ message: 'Localization unavailable' }),
				{ status: 500 }
			)
		}
	}

	if (searchParams.has('refresh')) {
		cache = null
	}

	if (!cache) {
		await fetchLocalizationFile()
	}

	const result: Record<string, any> = {}

	for (const row of cache!) {
		const key = row['KEY']
		if (!key) continue

		let current = result
		const value = row[LANG]

		const keys = key.split('.')

		//Next-intil почему-то не умеет в "Auth.title": "Text", поэтому собирается в "Auth": {"title": "text"}...
		keys.forEach((key: string, index: number) => {
			if (index == keys.length - 1) {
				current[key] = value
			} else {
				if (!current[key]) {
					current[key] = {}
				}
				current = current[key]
			}
		})
	}

	return Response.json(result)
}
