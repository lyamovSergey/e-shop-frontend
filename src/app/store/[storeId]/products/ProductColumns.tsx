'use client'
import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { type DataTableFeatures } from '@/components/ui/data/data-table-features'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export interface IProductColumn {
	id: string
	title: string
	price: string
	category: string
	color: string
	storeId: string
}
const columnHelper = createColumnHelper<DataTableFeatures, IProductColumn>()

export const ProductColumns = columnHelper.columns([
	columnHelper.accessor('title', {
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='text-slate-500'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Title
					<ArrowUpDown />
				</Button>
			)
		}
	}),
	columnHelper.accessor('price', {
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='text-slate-500'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Price
					<ArrowUpDown />
				</Button>
			)
		}
	}),
	columnHelper.accessor('category', {
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='text-slate-500'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Category
					<ArrowUpDown />
				</Button>
			)
		}
	}),
	columnHelper.accessor('color', {
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='text-slate-500'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Color
					<ArrowUpDown />
				</Button>
			)
		},
		cell: ({ row }) => {
			return (
				<div className='flex items-center gap-x-3'>
					{row.original.color}
					<div
						className='size-4 rounded-full border'
						style={{ backgroundColor: row.original.color }}
					></div>
				</div>
			)
		}
	}),
	columnHelper.display({
		id: 'actions',
		header: () => <span className=' text-slate-500'>Actions</span>,
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={<Button variant='ghost' className='h-8 w-8 p-0' />}
					>
						<MoreHorizontal className='h-4 w-4' />
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuGroup>
							<DropdownMenuLabel>Action</DropdownMenuLabel>
							<DropdownMenuItem>Action 1</DropdownMenuItem>
							<DropdownMenuItem>Action 2</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	})
])
