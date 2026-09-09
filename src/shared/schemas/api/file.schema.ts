import z from 'zod'

export const fileSchema = z.object({
	url: z.string(),
	name: z.string()
})

export const filesSchema = z.array(fileSchema)
export type IFile = z.infer<typeof fileSchema>
