import styles from './Categories.module.scss'

import { ICategory } from '@/shared/schemas/api/category.schema'

interface ICategoryItemProps {
	category: ICategory
}
export function CategoryItem({ category }: ICategoryItemProps) {
	return (
		<div className={styles.categoryItem}>
			<span className=''>{category.name}</span>
			<span className=''>{category.description}</span>
		</div>
	)
}
