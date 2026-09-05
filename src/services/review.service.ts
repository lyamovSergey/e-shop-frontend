import { axiosWithAuth } from '@/api/api.client.interseptors'

import { API_URL } from '@/config/api.config'

import { IReview, IReviewInput } from '@/shared/types/review.interface'

class ReviewService {
	async getByStoreId(id: string) {
		const { data } = await axiosWithAuth<IReview[]>({
			url: API_URL.reviews(`/by-storeId/${id}`),
			method: 'GET'
		})
		return data
	}

	async create(data: IReviewInput, storeId: string, productId: string) {
		const { data: createdReview } = await axiosWithAuth<IReview>({
			url: API_URL.reviews(`/add`),
			method: 'POST',
			data,
			params: {
				productId,
				storeId
			}
		})
		return createdReview
	}

	async delete(id: string) {
		const { data: deletedReview } = await axiosWithAuth<IReview>({
			url: API_URL.reviews(`/${id}`),
			method: 'DELETE'
		})
		return deletedReview
	}
}

export const reviewService = new ReviewService()
