import axios, { type CreateAxiosDefaults } from 'axios'

import { SERVER_URL } from '@/config/api.config'

import { getAccessTokenServer } from '@/services/auth/auth-token.server.service'

// import {
// 	getAccessToken,
// 	removeTokenFromStorage
// } from '@/services/auth/auth-token.service'
// import { authService } from '@/services/auth/auth.service'

import { errorCatch, getContentType } from './api.helpers'

const options: CreateAxiosDefaults = {
	baseURL: SERVER_URL,
	headers: getContentType(),
	withCredentials: true
}

const axiosServerWithAuth = axios.create(options)

axiosServerWithAuth.interceptors.request.use(async config => {
	const accessToken = await getAccessTokenServer()
	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`
	return config
})

// axiosServerWithAuth.interceptors.response.use(
// 	config => config,
// 	async error => {
// 		const originalRequest = error.config
// 		if (
// 			(error?.response?.status === 401 ||
// 				errorCatch(error) === 'jwt expired' ||
// 				errorCatch(error) === 'jwt must be provided') &&
// 			error.config &&
// 			!error.config._isRetry
// 		) {
// 			originalRequest._isRetry = true
// 			try {
// 				// вот тут надо как-то сообщить клиенту чтобы он обновил токены await authService.getNewTokens()
// 				return axiosServerWithAuth.request(originalRequest)
// 			} catch (error) {
// 				// if (errorCatch(error) === 'jwt expired') вот тут надо как-то сообщить клиенту чтобы он разлогинился removeTokenFromStorage()
// 			}
// 		}
// 		throw error
// 	}
// )

export { axiosServerWithAuth }
