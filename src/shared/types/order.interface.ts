// TODO: Переделать под страйп типы
import { IUser } from '@/shared/schemas/api/user.schema'

import { ICartItem } from './cart.interface'

interface IAmount {
	value: string
	currency: string
}

interface IRecipient {
	account_id: string
	gateway_id: string
}

interface IPaymentMethod {
	type: string
	id: string
	saved: boolean
}

interface IConfirmation {
	type: string
	return_url: string
	confirmation_url: string
}

export interface IPaymentResponse {
	id: string
	status: string
	amount: IAmount
	recipient: IRecipient
	payment_method: IPaymentMethod
	created_at: Date
	confirmation: IConfirmation
}

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED'
}

export interface IOrder {
	id: string
	createdAt: string
	items: ICartItem[]
	status: EnumOrderStatus
	user: IUser
	total: number
}
