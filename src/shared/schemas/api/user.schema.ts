import z from 'zod'

import { storeSchema } from '@/shared/schemas/api/store.schema'

export enum EnumUserRole {
	ADMIN = 'ADMIN',
	SALER = 'SALER',
	USER = 'USER'
}

export const userSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	picture: z.string().nullable(),
	store: storeSchema.nullable(),
	role: z.enum(EnumUserRole)
	// favorites: IProduct[]
	// 	orders: IOrder[]
})

export type IUser = z.infer<typeof userSchema>
