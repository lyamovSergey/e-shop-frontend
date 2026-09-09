import z from 'zod'

export const storeSchema = z.object({
	createdAt: z.string(),
	description: z.string().nullable(),
	id: z.string(),
	logo: z.string().nullable(),
	title: z.string(),
	user: z
		.object({
			name: z.string(),
			email: z.string()
		})
		.nullish()
})

export const storesSchema = z.array(storeSchema)
export const storeInputSchema = storeSchema.pick({
	title: true,
	description: true,
	logo: true
})

export type IStore = z.infer<typeof storeSchema>
export type IStoreInput = z.infer<typeof storeInputSchema>
