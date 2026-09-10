'use client'

import styles from './LangStyles.module.scss'

import { useLocaleToggler } from '@/components/ui/locale/useLocaleToggler'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { Flag_ua, Flag_usa } from '@/assets/svg'
import { cn } from '@/lib/utils'

interface ITogglerProps {
	className?: string
}

export function LangToggler({ className }: ITogglerProps) {
	const { onChange, locale, localesInfo } = useLocaleToggler()
	const flags = {
		uk: Flag_ua,
		en: Flag_usa
	}

	const Flag = flags[locale as keyof typeof flags]
	return (
		<ToggleGroup
			defaultValue={[locale]}
			onValueChange={value => onChange(value[0])}
			className={cn(styles.toggle_wrapper, className)}
		>
			{localesInfo.map((lang, i) => {
				const Flag = flags[lang.value as keyof typeof flags]
				return (
					<ToggleGroupItem
						key={i}
						value={lang.value}
						aria-label={`Toggle ${lang.name}`}
						className={cn(
							styles.toggle_item,
							i != localesInfo.length - 1 && styles.vs_spacer
						)}
					>
						<Flag className='min-w-6 max-h-4' />
					</ToggleGroupItem>
				)
			})}
		</ToggleGroup>
	)
}
