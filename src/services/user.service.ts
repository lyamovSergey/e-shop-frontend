import { axiosWithAuth } from '@/api/api.interseptors'

import { API_URL } from '@/config/api.config'

import { IUser } from '@/shared/types/user.interface'

class UserService {
	async getProfile() {
		const response = await axiosWithAuth<IUser>({
			url: API_URL.users('/me'),
			method: 'GET'
		})

		return response
	}

	async toggleFavorites(productId: string) {
		return axiosWithAuth<IUser>({
			url: API_URL.users(`/favorites/${productId}`),
			method: 'PATCH'
		})
	}
}
export const userService = new UserService()
