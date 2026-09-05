import { useQuery } from '@tanstack/react-query'

import { productService } from '@/services/product.service'

export function useGetProducts(storeId: string) {
	const {
		data: products,
		isLoading: isProductsLoading,
		isFetching: isProductsFetching
	} = useQuery({
		queryKey: ['get_products_for_store_dashboard', storeId],
		queryFn: () => productService.getByStoreId(storeId),
		staleTime: Infinity
	})

	return {
		products,
		isProductsLoading: isProductsLoading || isProductsFetching
	}
}
