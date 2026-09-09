import z from 'zod'

export const monthlySalesSchema = z.object({
	date: z.string(),
	value: z.number()
})
export const lastUsersSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	picture: z.string(),
	total: z.number()
})
export const mainStatisticItemsSchema = z.object({
	id: z.number(),
	name: z.string(),
	value: z.number().nullable()
})
export const middleStatisticsSchema = z.object({
	monthlySales: z.array(monthlySalesSchema),
	lastUsers: z.array(lastUsersSchema)
})

export const mainStatisticSchema = z.array(mainStatisticItemsSchema)
export type IMainStatistics = z.infer<typeof mainStatisticItemsSchema>
export type IMonthlySales = z.infer<typeof monthlySalesSchema>
export type ILastUsers = z.infer<typeof lastUsersSchema>
export type IMiddleStatistics = z.infer<typeof middleStatisticsSchema>
