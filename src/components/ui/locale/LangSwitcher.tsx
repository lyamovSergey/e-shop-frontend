'use client'

import { useLocaleToggler } from '@/components/ui/locale/useLocaleToggler'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

export function LangSwitcher() {
	const { onChange, locale, localesInfo } = useLocaleToggler()

	return (
		<Select defaultValue={locale} value={locale} onValueChange={onChange}>
			<SelectTrigger className='w-full max-w-48'>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{localesInfo.map((locale, index) => (
						<SelectItem value={locale.value} key={index}>
							{locale.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
