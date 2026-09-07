import { EnumUserRole } from '@/shared/types/user.interface'

interface JwtPayload {
	id: string
	role: EnumUserRole
}
export function getTokenPayload(token: string): JwtPayload {
	return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}
