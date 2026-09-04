import z from 'zod'

export const productSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string('Field must be a string').min(1, 'Field is required'),
	price: z
		.number({
			error: 'Price is required'
		})
		.min(0, 'Price must be greater than or equal to 0'),
	images: z.array(z.string()).min(1, 'At least one image is required'),
	categoryId: z.string().min(1, 'Category is required'),
	colorId: z.string().min(1, 'Color is required')
})
