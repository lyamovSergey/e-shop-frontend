import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'

import { colorService } from '@/services/color.service'

import { IColorInput } from '@/shared/types/color.interface'

export function useUpdateColor() {
	const params = useParams<{ colorId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update_colors'],
		mutationFn: (data: IColorInput) =>
			colorService.update(params.colorId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get_colors']
			})
			toast.success('Color was updated!')
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})
	return { updateColor, isLoadingUpdate }
}
