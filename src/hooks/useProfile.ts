import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useProfile() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		staleTime: Infinity
	})

	return { user, isLoading }
}
