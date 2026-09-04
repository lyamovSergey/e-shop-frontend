'use client'

import { ProductForm } from '@/app/store/[storeId]/products/ProductForm'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'

export function CreateProduct() {
	const { categories } = useGetCategories()
	const { colors } = useGetColors()
	return <ProductForm categories={categories || []} colors={colors || []} />
}
