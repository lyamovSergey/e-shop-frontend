'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import styles from './Categories.module.scss'
import layoutStyles from '@/components/layouts/AdminLayout.module.scss'

import { CategoryItem } from '@/app/admin/categories/CategoryItem'

import { PageAnimation } from '@/components/layouts/PageAnimation'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { CreateCategoryModal } from '@/components/ui/modals/CreateCategoryModal'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'

import { ICategoryInput } from '@/shared/schemas/api/category.schema'

export function Categories() {
	const { categories, isLoading } = useGetCategories()
	console.log('categories::: ', categories)

	const [openConfirm, setIsOpenConfirm] = useState(false)
	const [openEdit, setIsOpenEdit] = useState(false)
	const [checkedCategory, setCheckedCategory] = useState<
		ICategoryInput | undefined
	>(undefined)

	return (
		<PageAnimation>
			<div className={layoutStyles.pageWrapper}>
				<div className={layoutStyles.pageHeader}>
					<Heading title={`Categories`} description='All categories' />
					<div className={layoutStyles.buttons}>
						<Button variant='neoAction' onClick={() => setIsOpenEdit(true)}>
							<Plus />
							Create Category
						</Button>
					</div>
				</div>
				<div className={layoutStyles.pageContent}>
					<div className={styles.categoriesContainer}>
						{categories?.length ? (
							categories.map(item => (
								<CategoryItem key={item.id} category={item} />
							))
						) : (
							<></>
						)}
					</div>
				</div>
				<CreateCategoryModal
					open={openEdit}
					setIsOpen={setIsOpenEdit}
					category={checkedCategory}
					onClose={() => setCheckedCategory(undefined)}
				/>
			</div>
		</PageAnimation>
	)
}
