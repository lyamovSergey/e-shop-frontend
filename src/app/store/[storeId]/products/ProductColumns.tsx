'use client'
import { createColumnHelper } from '@tanstack/react-table'
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'

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

import { PUBLIC_URL, STORE_URL } from '@/config/url.config'

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
			const ProductItem = row.original
			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={<Button variant='ghost' className='h-8 w-8 p-0' />}
					>
						<MoreHorizontal className='h-4 w-4' />
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className=' w-45'>
						<DropdownMenuGroup>
							<DropdownMenuLabel>Action</DropdownMenuLabel>
							<Link href={PUBLIC_URL.product(ProductItem.id)} target='_blank'>
								<DropdownMenuItem>
									<ExternalLink className=' size-4 mr-2' />
									Product detail
								</DropdownMenuItem>
							</Link>

							<Link
								href={STORE_URL.productEdit(
									ProductItem.storeId,
									ProductItem.id
								)}
							>
								<DropdownMenuItem>
									<Pencil className=' size-4 mr-2' />
									Product Edit
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	})
])
