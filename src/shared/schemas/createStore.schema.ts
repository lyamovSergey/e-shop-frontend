import * as z from 'zod'

export const createStoreSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().optional(),
	logo: z.string().optional()
})
