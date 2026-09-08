import z from 'zod'

export const getStoreSchema = z.object({
	createdAt: z.string(),
	description: z.string().optional(),
	id: z.string(),
	logo: z.string(),
	title: z.string(),
	updatedAt: z.string(),
	user: z.object({
		name: z.string(),
		email: z.string()
	})
})

export const getStoresSchema = z.array(getStoreSchema)
