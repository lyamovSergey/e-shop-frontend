import { useQuery } from '@tanstack/react-query'

import { STALE_TIME_30_MIN } from '@/constants/api.constants'

import { productService } from '@/services/product.service'

export function useGetProducts(storeId: string) {
	const {
		data: products,
		isLoading: isProductsLoading,
		isFetching: isProductsFetching
	} = useQuery({
		queryKey: ['get_products_for_store_dashboard', storeId],
		queryFn: () => productService.getByStoreId(storeId),
		staleTime: STALE_TIME_30_MIN
	})

	return {
		products,
		isProductsLoading: isProductsLoading || isProductsFetching
	}
}
