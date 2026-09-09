import { IUser } from '@/shared/schemas/api/user.schema'

export interface IReview {
	id: string
	createdAt: string
	text: string
	rating: string
	user: IUser
}

export interface IReviewInput extends Pick<IReview, 'text' | 'rating'> {}
