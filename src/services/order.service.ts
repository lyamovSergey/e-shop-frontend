import { axiosWithAuth } from '@/api/api.client.interseptors'

import { API_URL } from '@/config/api.config'

import {
	EnumOrderStatus,
	IPaymentResponse
} from '@/shared/types/order.interface'

//TODO: Переделать для Страйпа

type TypeData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: string
		storeId: string
	}[]
}

class OrderService {
	async place(data: TypeData) {
		return axiosWithAuth<IPaymentResponse>({
			url: API_URL.orders('/checkout'),
			method: 'POST',
			data
		})
	}
}

export const orderService = new OrderService()
