import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'

import { productService } from '@/services/product.service'

import { IProductInput } from '@/shared/types/product.interface'

export function useUpdateProduct() {
	const params = useParams<{ productId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update_product'],
		mutationFn: (data: IProductInput) =>
			productService.update(data, params.productId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get_products_for_store_dashboard']
			})
			toast.success('Product was updated!')
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})
	return { updateProduct, isLoadingUpdate }
}
