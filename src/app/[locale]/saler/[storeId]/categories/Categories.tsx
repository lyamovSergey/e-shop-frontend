'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import styles from '../Store.module.scss'
import './table.scss'

import {
	CategoryColumns,
	type ICategoryColumn
} from '@/app/[locale]/saler/[storeId]/categories/CategoryColumns'

import { PageAnimation } from '@/components/layouts/PageAnimation'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { DataTableLoading } from '@/components/ui/data/DataLoading'
import { DataTable } from '@/components/ui/data/DataTable'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { CreateCategoryModal } from '@/components/ui/modals/CreateCategoryModal'

import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'

export function Categories() {
	const { categories, isLoading } = useGetCategories()
	const [openConfirm, setIsOpenConfirm] = useState(false)
	const [openEdit, setIsOpenEdit] = useState(false)
	const [checkedCategory, setCheckedCategory] = useState<
		ICategoryColumn | undefined
	>(undefined)

	const formattedCategories: ICategoryColumn[] = categories
		? categories.map(category => ({
				id: category.id,
				name: category.name,
				description: category.description
			}))
		: []

	const tableAction = (type: 'edit' | 'delete', item: ICategoryColumn) => {
		setCheckedCategory(item)
		if (type === 'delete') setIsOpenConfirm(true)

		if (type === 'edit') setIsOpenEdit(true)
	}
	return (
		<PageAnimation>
			<div className={styles.wrapper}>
				{isLoading ? (
					<DataTableLoading />
				) : (
					<>
						<div className={styles.header}>
							<Heading
								title={`Categories (${categories?.length || 0})`}
								description='All categories in your store'
							/>
						</div>
						<div className={styles.table}>
							<DataTable
								columns={CategoryColumns(tableAction)}
								data={formattedCategories}
								filterKey='name'
								tableName='categories'
							/>
						</div>
					</>
				)}
			</div>
		</PageAnimation>
	)
}
