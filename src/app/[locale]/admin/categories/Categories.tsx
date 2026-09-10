'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import styles from './Categories.module.scss'
import layoutStyles from '@/components/layouts/AdminLayout.module.scss'

import { CategoryItem } from '@/app/[locale]/admin/categories/CategoryItem'
import { CategorySkeleton } from '@/app/[locale]/admin/categories/CategorySkeleton'

import { PageAnimation } from '@/components/layouts/PageAnimation'
import { Heading } from '@/components/ui/Heading'
import { ListEmpty } from '@/components/ui/ListEmpty'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { CreateCategoryModal } from '@/components/ui/modals/CreateCategoryModal'

import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'

import { ICategory, ICategoryInput } from '@/shared/schemas/api/category.schema'

export function Categories() {
	const [openConfirm, setIsOpenConfirm] = useState(false)
	const [openEdit, setIsOpenEdit] = useState(false)
	const [checkedCategory, setCheckedCategory] = useState<ICategory | undefined>(
		undefined
	)

	const { categories, isLoading } = useGetCategories()
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

	return (
		<PageAnimation>
			<div className={layoutStyles.pageWrapper}>
				<div className={layoutStyles.pageHeader}>
					<Heading title={`Categories`} description='All categories' />
					<div className={layoutStyles.buttons}>
						{!!categories?.length && (
							<Button variant='neoAction' onClick={() => setIsOpenEdit(true)}>
								<Plus />
								Create Category
							</Button>
						)}
					</div>
				</div>
				<div className={layoutStyles.pageContent}>
					<div className={styles.categoriesContainer}>
						{isLoading && !categories?.length ? (
							<>
								{Array.from({ length: 5 }).map((_, i) => (
									<CategorySkeleton key={i} />
								))}
							</>
						) : (
							categories?.map(item => (
								<CategoryItem
									key={item.id}
									category={item}
									onAction={categoryAction}
								/>
							))
						)}
					</div>
					{!isLoading && !categories?.length && (
						<ListEmpty
							text='Please add one or more categories'
							title='Category list is empty'
						>
							<Button variant='neoAction' onClick={() => setIsOpenEdit(true)}>
								<Plus />
								Create Category
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
