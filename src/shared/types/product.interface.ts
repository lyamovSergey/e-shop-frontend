import { ICategory } from '@/shared/schemas/api/category.schema'

import { IReview } from './review.interface'

export interface IProduct {
	id: string
	title: string
	description: string
	price: number
	images: string[]
	category: ICategory
	reviews: IReview[]
	storeId: string
}

export interface IProductInput extends Omit<
	IProduct,
	'id' | 'reviews' | 'store' | 'category' | 'storeId'
> {
	categoryId: string
}
