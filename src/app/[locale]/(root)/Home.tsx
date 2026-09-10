'use client'

import { LangSwitcher } from '@/components/ui/locale/LangSwitcher'
import { LangToggler } from '@/components/ui/locale/LangToggler'

export function Home() {
	return (
		<div className=' flex items-center justify-center gap-4 w-full grow'>
			<LangSwitcher />
			<LangToggler />
		</div>
	)
}
