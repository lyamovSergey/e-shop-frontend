import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { productService } from '@/services/product.service'

export function useDeleteProduct() {
	const params = useParams<{ storeId: string; productId: string }>()
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete_product'],
		mutationFn: () => productService.delete(params.productId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get_products_for_store_dashboard']
			})
			toast.success('Product was deleted!')
			router.push(STORE_URL.products(params.storeId))
		},
		onError() {
			toast.error('Something went wrong :(')
		}
	})

	return { deleteProduct, isLoadingDelete }
}
