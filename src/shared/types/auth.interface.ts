import { IUser } from '@/shared/schemas/api/user.schema'

export interface IAuthForm {
	name?: string
	email: string
	password: string
}
export interface IAuthResponse {
	user: IUser
	accessToken: string
}
