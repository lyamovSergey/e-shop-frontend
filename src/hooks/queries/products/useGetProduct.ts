import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { productService } from '@/services/product.service'

export function useGetProduct() {
	const params = useParams<{ productId: string }>()
	const {
		data: product,
		isLoading: isProductLoading,
		isFetching: isProductFetching
	} = useQuery({
		queryKey: ['get_product_by_id'],
		queryFn: () => productService.getById(params.productId)
	})
	return {
		product,
		isProductLoading: isProductLoading || isProductFetching
	}
}
