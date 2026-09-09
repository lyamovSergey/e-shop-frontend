'use client'
import { StickyNoteOff } from 'lucide-react'
import type { PropsWithChildren } from 'react'

import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle
} from '@/components/ui/empty'

interface IListEmptyProps {
	title?: string
	text?: string
}
export function ListEmpty({
	children,
	title = 'List empty',
	text = 'Add elements'
}: PropsWithChildren<IListEmptyProps>) {
	return (
		<Empty className=' neo-base w-full h-full'>
			<EmptyHeader>
				<EmptyMedia variant='icon' className=' neo-base w-25 h-25'>
					<StickyNoteOff className='w-10! h-10! text-slate-500' />
				</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				<EmptyDescription className='max-w-xs text-pretty'>
					{text}
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>{children}</EmptyContent>
		</Empty>
	)
}
