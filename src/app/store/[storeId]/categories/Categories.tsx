'use client'

import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ViewTransition, useState } from 'react'

import {
	CategoryColumns,
	type ICategoryColumn
} from '@/app/store/[storeId]/categories/CategoryColumns'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { DataTableLoading } from '@/components/ui/data/DataLoading'
import { DataTable } from '@/components/ui/data/DataTable'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { CreateCategoryModal } from '@/components/ui/modals/CreateCategoryModal'

import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'

import styles from '../Store.module.scss'

import './table.scss'

export function Categories() {
	const { categories, isLoading } = useGetCategories()
	const [openConfirm, setIsOpenConfirm] = useState(false)
	const [openEdit, setIsOpenEdit] = useState(false)
	const [checkedCategory, setCheckedCategory] = useState<
		ICategoryColumn | undefined
	>(undefined)
	const { deleteCategory, isLoadingDelete } = useDeleteCategory(
		checkedCategory?.id
	)
	const formattedCategories: ICategoryColumn[] = categories
		? categories.map(category => ({
				id: category.id,
				name: category.name,
				description: category.description
			}))
		: []

	const delCategory = async () => {
		await deleteCategory()
		setIsOpenConfirm(false)
	}
	const tableAction = (type: 'edit' | 'delete', item: ICategoryColumn) => {
		setCheckedCategory(item)
		if (type === 'delete') setIsOpenConfirm(true)

		if (type === 'edit') setIsOpenEdit(true)
	}
	return (
		<ViewTransition enter='page-enter' exit='page-exit'>
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
							<div className={styles.buttons}>
								<Button variant='primary' onClick={() => setIsOpenEdit(true)}>
									<Plus />
									Create Category
								</Button>
							</div>
						</div>
						<div className={styles.table}>
							<DataTable
								columns={CategoryColumns(tableAction)}
								data={formattedCategories}
								filterKey='name'
								tableName='categories'
							/>
						</div>
						<ConfirmModal
							handleClick={delCategory}
							open={openConfirm}
							onOpenChange={setIsOpenConfirm}
							onClose={() => setCheckedCategory(undefined)}
							disabled={isLoadingDelete}
						/>
						<CreateCategoryModal
							open={openEdit}
							setIsOpen={setIsOpenEdit}
							category={checkedCategory}
							onClose={() => setCheckedCategory(undefined)}
						/>
					</>
				)}
			</div>
		</ViewTransition>
	)
}
