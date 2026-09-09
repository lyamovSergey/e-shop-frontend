import { axiosWithAuth } from '@/api/api.client.interseptors'

import { API_URL } from '@/config/api.config'

import { IUser, userSchema } from '@/shared/schemas/api/user.schema'

class UserService {
	async getProfile() {
		const { data } = await axiosWithAuth<IUser>({
			url: API_URL.users('/me'),
			method: 'GET'
		})

		return userSchema.parse(data)
	}

	async toggleFavorites(productId: string) {
		return axiosWithAuth<IUser>({
			url: API_URL.users(`/favorites/${productId}`),
			method: 'PATCH'
		})
	}
}
export const userService = new UserService()
