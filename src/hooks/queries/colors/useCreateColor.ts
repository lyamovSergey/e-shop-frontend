import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { colorService } from '@/services/color.service'

import { IColorInput } from '@/shared/types/color.interface'

export function useCreateColor() {
	const params = useParams<{ storeId: string }>()
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: createColor, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create_color'],
		mutationFn: (data: IColorInput) =>
			colorService.create(data, params.storeId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get_colors']
			})
			toast.success('Color was created!')
			router.push(STORE_URL.products(params.storeId))
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})

	return { createColor, isLoadingCreate }
}
