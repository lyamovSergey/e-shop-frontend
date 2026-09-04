'use client'

import { createColumnHelper } from '@tanstack/react-table'
import {
	ArrowUpDown,
	Edit2Icon,
	ExternalLink,
	MoreHorizontal,
	Trash2Icon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTableFeatures } from '@/components/ui/data/data-table-features'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { ICategory } from '@/shared/types/category.interface'

export interface ICategoryColumn extends Pick<
	ICategory,
	'id' | 'name' | 'description'
> {}

const columnHelper = createColumnHelper<DataTableFeatures, ICategoryColumn>()
export const CategoryColumns = (
	onAction: (type: 'edit' | 'delete', item: ICategoryColumn) => void
) =>
	columnHelper.columns([
		columnHelper.accessor('name', {
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						className='text-slate-500'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Category name
						<ArrowUpDown />
					</Button>
				)
			}
		}),
		columnHelper.accessor('description', {
			header: () => {
				return <span className='text-slate-500'>Category description</span>
			}
		}),
		columnHelper.display({
			id: 'actions',
			header: () => <span className=' text-slate-500'>Actions</span>,
			cell: ({ row }) => {
				const ProductItem = row.original
				return (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={<Button variant='ghost' className='h-8 w-8 p-0' />}
						>
							<MoreHorizontal className='h-4 w-4' />
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className=' w-45'>
							<DropdownMenuGroup className=' flex gap-1 flex-col'>
								<DropdownMenuLabel>Action</DropdownMenuLabel>
								<Button
									variant='primary'
									className='w-full flex gap-2 justify-center'
									onClick={() => onAction('edit', ProductItem)}
								>
									<Edit2Icon />
									Edit
								</Button>
								<Button
									variant='destructive'
									className='w-full flex gap-2 justify-center'
									onClick={() => onAction('delete', ProductItem)}
								>
									<Trash2Icon />
									Delete
								</Button>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			}
		})
	])
