import { EnumUserRole } from '@/shared/schemas/api/user.schema'

interface JwtPayload {
	id: string
	role: EnumUserRole
}
export function getTokenPayload(token: string): JwtPayload {
	return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}
