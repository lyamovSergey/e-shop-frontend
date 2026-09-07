import { IOrder } from './order.interface'
import { IProduct } from './product.interface'
import { IStore } from './store.interface'

export interface IUser {
	id: string
	name: string
	email: string
	picture: string
	favorites: IProduct[]
	orders: IOrder[]
	store?: IStore
	role: EnumUserRole
}

export enum EnumUserRole {
	ADMIN = 'ADMIN',
	SALER = 'SALER',
	USER = 'USER'
}
