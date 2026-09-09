import { axiosClassic, axiosWithAuth } from '@/api/api.client.interseptors'

import { API_URL } from '@/config/api.config'

import {
	ICategory,
	ICategoryInput,
	categoriesSchema,
	categorySchema
} from '@/shared/schemas/api/category.schema'

class CategoryService {
	async getAll() {
		const { data } = await axiosClassic<ICategory[]>({
			url: API_URL.categories('/list'),
			method: 'GET'
		})
		return categoriesSchema.parse(data)
	}

	async getById(id: string) {
		const { data } = await axiosWithAuth<ICategory>({
			url: API_URL.categories(`/by-id/${id}`),
			method: 'GET'
		})
		return categorySchema.parse(data)
	}

	async create(data: ICategoryInput) {
		const { data: createdCategory } = await axiosWithAuth<ICategory>({
			url: API_URL.categories(`/create`),
			method: 'POST',
			data
		})
		return categorySchema.parse(createdCategory)
	}

	async update(id: string, data: ICategoryInput) {
		const { data: updatedCategory } = await axiosWithAuth<ICategory>({
			url: API_URL.categories(`/${id}`),
			method: 'PATCH',
			data
		})
		return categorySchema.parse(updatedCategory)
	}

	async delete(id: string) {
		const { data: deletedCategory } = await axiosWithAuth<ICategory>({
			url: API_URL.categories(`/${id}`),
			method: 'DELETE'
		})
		return categorySchema.parse(deletedCategory)
	}

	// async getByStoreId(id: string) {
	// 	const { data } = await axiosWithAuth<ICategory[]>({
	// 		url: API_URL.categories(`/by-storeId/${id}`),
	// 		method: 'GET'
	// 	})
	// 	return data
	// }
}

export const categoryService = new CategoryService()
