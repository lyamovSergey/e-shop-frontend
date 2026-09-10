import { API_URL } from '@/config/api.config'
import { axiosServerWithAuth } from '@/config/api.server.interseptors'

class ValidatorService {
	async validateToken() {
		try {
			await axiosServerWithAuth({
				url: API_URL.auth(`/validate-token`),
				method: 'GET'
			})
			return { isValid: true }
		} catch (error) {
			return { isValid: false }
		}
	}
}

export const validatorService = new ValidatorService()
