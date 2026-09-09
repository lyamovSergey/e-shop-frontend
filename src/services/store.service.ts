import { axiosClassic, axiosWithAuth } from '@/api/api.client.interseptors'

import { API_URL } from '@/config/api.config'

import {
	IStore,
	IStoreInput,
	storeSchema,
	storesSchema
} from '@/shared/schemas/api/store.schema'

class StoreService {
	async getAll() {
		const { data } = await axiosWithAuth<IStore[]>({
			url: API_URL.stores('/full-list'),
			method: 'GET'
		})
		return storesSchema.parse(data)
	}
	async getById(id: string) {
		const { data } = await axiosWithAuth<IStore>({
			url: API_URL.stores(`/get-by-id/${id}`),
			method: 'GET'
		})
		return storeSchema.parse(data)
	}
	async create(data: IStoreInput) {
		const { data: createdStore } = await axiosWithAuth<IStore>({
			url: API_URL.stores(),
			method: 'POST',
			data
		})
		return storeSchema.parse(createdStore)
	}
	async update(id: string, data: IStoreInput) {
		const { data: updatedStore } = await axiosWithAuth<IStore>({
			url: API_URL.stores(`/update/${id}`),
			method: 'PATCH',
			data
		})
		return storeSchema.parse(updatedStore)
	}
	async delete(id: string) {
		const { data: deletedStore } = await axiosWithAuth<IStore>({
			url: API_URL.stores(`/${id}`),
			method: 'DELETE'
		})
		return storeSchema.parse(deletedStore)
	}
}
export const storeService = new StoreService()
