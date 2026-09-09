import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useProfile() {
	const {
		data: user,
		isLoading,
		error
	} = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		staleTime: Infinity
	})

	if (error) console.log('useProfile error::: ', error)

	return { user, isLoading }
}
