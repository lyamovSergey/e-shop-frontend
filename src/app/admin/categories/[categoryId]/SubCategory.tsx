'use client'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import styles from '../Categories.module.scss'
import layoutStyles from '@/components/layouts/AdminLayout.module.scss'

import { CategoryItem } from '@/app/admin/categories/CategoryItem'
import { CategorySkeleton } from '@/app/admin/categories/CategorySkeleton'

import { PageAnimation } from '@/components/layouts/PageAnimation'
import { Heading } from '@/components/ui/Heading'
import { ListEmpty } from '@/components/ui/ListEmpty'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { CreateCategoryModal } from '@/components/ui/modals/CreateCategoryModal'

import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useGetCategory } from '@/hooks/queries/categories/useGetCategory'

import { ICategory } from '@/shared/schemas/api/category.schema'

export function SubCategory() {
	const [openConfirm, setIsOpenConfirm] = useState(false)
	const [openEdit, setIsOpenEdit] = useState(false)
	const [checkedCategory, setCheckedCategory] = useState<ICategory | undefined>(
		undefined
	)

	const { category, isLoading } = useGetCategory()
	const { deleteCategory, isLoadingDelete } = useDeleteCategory()

	const delCategory = async () => {
		if (checkedCategory) await deleteCategory(checkedCategory.id)
		setIsOpenConfirm(false)
	}

	const categoryAction = (type: 'edit' | 'delete', item: ICategory) => {
		setCheckedCategory(item)
		if (type === 'delete') setIsOpenConfirm(true)
		if (type === 'edit') setIsOpenEdit(true)
	}

	const create = () => {
		setCheckedCategory({
			id: '',
			name: '',
			description: '',
			parentId: category?.id,
			children: []
		})
		setIsOpenEdit(true)
	}

	return (
		<PageAnimation>
			<div className={layoutStyles.pageWrapper}>
				<div className={layoutStyles.pageHeader}>
					<Heading
						title={`Sub Categories`}
						description={`Subcategories for ${category?.name}`}
						hasBack
					/>
					<div className={layoutStyles.buttons}>
						{!!category?.children.length && (
							<Button variant='neoAction' onClick={create}>
								<Plus />
								Create Sub Category
							</Button>
						)}
					</div>
				</div>
				<div className={layoutStyles.pageContent}>
					<div className={styles.categoriesContainer}>
						{isLoading && !category?.children.length ? (
							<>
								{Array.from({ length: 5 }).map((_, i) => (
									<CategorySkeleton key={i} />
								))}
							</>
						) : (
							category?.children?.map(item => (
								<CategoryItem
									key={item.id}
									category={item}
									onAction={categoryAction}
								/>
							))
						)}
					</div>

					{!isLoading && !category?.children.length && (
						<ListEmpty
							text='Please add one or more subcategories'
							title='Subcategory list is empty'
						>
							<Button variant='neoAction' onClick={create}>
								<Plus />
								Create Sub Category
							</Button>
						</ListEmpty>
					)}
				</div>
				<CreateCategoryModal
					open={openEdit}
					setIsOpen={setIsOpenEdit}
					category={checkedCategory}
					onClose={() => setCheckedCategory(undefined)}
				/>
				<ConfirmModal
					handleClick={delCategory}
					open={openConfirm}
					onOpenChange={setIsOpenConfirm}
					onClose={() => setCheckedCategory(undefined)}
					disabled={isLoadingDelete}
				/>
			</div>
		</PageAnimation>
	)
}
