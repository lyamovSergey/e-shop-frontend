// import {
// 	HydrationBoundary,
// 	QueryClient,
// 	dehydrate
// } from '@tanstack/react-query'
import type { Metadata } from 'next'

import { Products } from '@/app/store/[storeId]/products/Products'

// import { STALE_TIME_30_MIN } from '@/constants/api.constants'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

// import { productService } from '@/services/product.service'
// import { validatorService } from '@/services/validator.service'

export const metadata: Metadata = {
	title: 'Products page',
	...NO_INDEX_PAGE
}
interface IProductsPageProps {
	params: Promise<{
		storeId: string
	}>
}
export default async function productsPage({ params }: IProductsPageProps) {
	const { storeId } = await params
	// const queryClient = new QueryClient()
	// const { isValid } = await validatorService.validateToken()
	// if (isValid) {
	// 	await queryClient.prefetchQuery({
	// 		queryKey: ['get_products_for_store_dashboard', storeId],
	// 		queryFn: () => productService.getByStoreId(storeId),
	// 		staleTime: STALE_TIME_30_MIN
	// 	})
	// }
	return (
		// <HydrationBoundary state={dehydrate(queryClient)}>
		<Products storeId={storeId} />
		// </HydrationBoundary>
	)
}
