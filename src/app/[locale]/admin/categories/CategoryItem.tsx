import {
	Edit2Icon,
	MoreVertical,
	SquareArrowOutUpRight,
	Trash2Icon
} from 'lucide-react'
import Link from 'next/link'

import styles from './Categories.module.scss'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { ADMIN_URL } from '@/config/url.config'

import { ICategory } from '@/shared/schemas/api/category.schema'

import { cn } from '@/lib/utils'

interface ICategoryItemProps {
	category: ICategory
	onAction: (type: 'edit' | 'delete', item: ICategory) => void
}
export function CategoryItem({ category, onAction }: ICategoryItemProps) {
	return (
		<div className={styles.categoryItem}>
			<span className={cn(styles.title, 'line-clamp-1')}>{category.name}</span>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={<Button variant='neo' className='h-8 w-8 p-0' />}
				>
					<MoreVertical className='h-4 w-4' />
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className=' w-45'>
					<DropdownMenuGroup className=' flex gap-1 items-center '>
						<DropdownMenuLabel>Action</DropdownMenuLabel>
						<Button
							variant='neo'
							className=' hover:bg-blue-500 hover:text-white'
							onClick={() => onAction('edit', category)}
						>
							<Edit2Icon />
						</Button>
						<Button
							variant='neo'
							className='hover:bg-destructive hover:text-white'
							onClick={() => onAction('delete', category)}
						>
							<Trash2Icon />
						</Button>
						<Link
							className=' neo-button flex items-center justify-center w-8 h-8 rounded-lg hover:bg-neu-lime-500 hover:text-white'
							href={ADMIN_URL.subCategories(category.id)}
						>
							<SquareArrowOutUpRight size={17} />
						</Link>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
