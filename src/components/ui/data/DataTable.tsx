'use client'

import {
	type ColumnDef,
	type ColumnFiltersState,
	type RowData,
	type SortingState,
	useTable
} from '@tanstack/react-table'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import styles from './DataTable.module.scss'
import { type DataTableFeatures, features } from './data-table-features'

interface DataTableProps<TData extends RowData> {
	columns: ColumnDef<DataTableFeatures, TData>[]
	data: TData[]
	filterKey?: string
	tableName?: string
}

export function DataTable<TData extends RowData>({
	columns,
	data,
	filterKey,
	tableName = 'default'
}: DataTableProps<TData>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const table = useTable({
		features,
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting,
			columnFilters
		}
	})

	return (
		<div className=''>
			{filterKey && (
				<div className={styles.search}>
					<Input
						placeholder='Search...'
						value={
							(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''
						}
						onChange={event =>
							table.getColumn(filterKey)?.setFilterValue(event.target.value)
						}
						className='max-w-sm'
					/>
				</div>
			)}
			<div className={styles.table}>
				<Table className={`table-${tableName}`}>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header, index) => {
									return (
										<TableHead
											key={header.id}
											className={`table-header-${tableName}-${index}`}
										>
											{header.isPlaceholder ? null : (
												<table.FlexRender header={header} />
											)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											<table.FlexRender cell={cell} />
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
