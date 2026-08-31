export interface ICategory {
	id: string
	createdAt: string
	name: string
	description: string
	storeId: string
}

export interface ICategoryInput extends Pick<
	ICategory,
	'name' | 'description'
> {}
