import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { productService } from '@/services/product.service'

export function useGetProducts() {
	const params = useParams<{ storeId: string; productId: string }>()

	const {
		data: products,
		isLoading: isProductsLoading,
		isFetching: isProductsFetching
	} = useQuery({
		queryKey: ['get_products_for_store_dashboard'],
		queryFn: () => productService.getByStoreId(params.storeId)
	})

	const {
		data: product,
		isLoading: isProductLoading,
		isFetching: isProductFetching
	} = useQuery({
		queryKey: ['get_product_by_id'],
		queryFn: () => productService.getById(params.productId)
	})

	return {
		products,
		isProductsLoading: isProductsLoading || isProductsFetching,
		product,
		isProductLoading: isProductLoading || isProductFetching
	}
}
