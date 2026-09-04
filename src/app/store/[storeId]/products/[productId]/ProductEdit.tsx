'use client'

import { ProductForm } from '@/app/store/[storeId]/products/ProductForm'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'
import { useGetProducts } from '@/hooks/queries/products/useGetProducts'

export function ProductEdit() {
	const { categories } = useGetCategories()
	const { colors } = useGetColors()
	const { product, isProductLoading } = useGetProducts()

	return (
		<ProductForm
			categories={categories || []}
			colors={colors || []}
			product={product}
			isLoading={isProductLoading}
		/>
	)
}
