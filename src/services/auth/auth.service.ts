import { axiosClassic } from '@/api/api.client.interseptors'

import { API_URL } from '@/config/api.config'

import { IAuthForm, IAuthResponse } from '@/shared/types/auth.interface'

import { removeTokenFromStorage, saveTokenStorage } from './auth-token.service'

class AuthService {
	async main(type: 'login' | 'register', authData: IAuthForm) {
		const { data } = await axiosClassic<IAuthResponse>({
			url: API_URL.auth(`/${type}`),
			method: 'POST',
			data: authData
		})

		if (data.accessToken) saveTokenStorage(data.accessToken)
		return data
	}

	async getNewTokens() {
		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth(`/login/update-tokens`),
			method: 'POST'
		})

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	}

	async logout() {
		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth(`/logout`),
			method: 'POST'
		})
		if (response.data) removeTokenFromStorage()
		return response
	}
}

export const authService = new AuthService()
