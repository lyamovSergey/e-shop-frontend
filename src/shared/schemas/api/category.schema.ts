import z from 'zod'

const categoryBaseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	parentId: z.string().nullish(),
	storeId: z.string().nullish()
})

type Category = z.infer<typeof categoryBaseSchema> & {
	children: Category[]
}

export const categorySchema: z.ZodType<Category> = categoryBaseSchema.extend({
	children: z.array(z.lazy(() => categorySchema)).default([])
})
export const categoriesSchema = z.array(categorySchema)
export const categoryInputSchema = categoryBaseSchema.pick({
	name: true,
	description: true,
	parentId: true
})

export type ICategory = z.infer<typeof categorySchema>
export type ICategoryInput = z.infer<typeof categoryInputSchema>
