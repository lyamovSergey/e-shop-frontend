import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2Icon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ProductSkeleton } from '@/app/store/[storeId]/products/[productId]/ProductSkeleton'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { FormNumberInput } from '@/components/ui/form-fields/FormNumberInput'
import { FormSelectColorInput } from '@/components/ui/form-fields/FormSelectColorInput'
import { FormSelectInput } from '@/components/ui/form-fields/FormSelectInput'
import { FormTextAreaInput } from '@/components/ui/form-fields/FormTextAreaInput'
import { FormTextInput } from '@/components/ui/form-fields/FormTextInput'
import { FormUploadInput } from '@/components/ui/form-fields/FormUploadInput'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'

import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct'
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct'
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct'

import { productSchema } from '@/shared/schemas/product.schema'
import { ICategory } from '@/shared/types/category.interface'
import { IColor } from '@/shared/types/color.interface'
import { IProduct, IProductInput } from '@/shared/types/product.interface'

import styles from '../Store.module.scss'

interface ProductFormProps {
	product?: IProduct
	categories: ICategory[]
	colors: IColor[]
	isLoading?: boolean
}

export function ProductForm({
	product,
	categories,
	colors,
	isLoading = false
}: ProductFormProps) {
	const categoriesOptions = categories.map(category => ({
		label: category.name,
		value: category.id
	}))
	const colorsOptions = colors.map(color => ({
		label: color.name,
		value: color.id,
		hex: color.value
	}))

	const { createProduct, isLoadingCreate } = useCreateProduct()
	const { updateProduct, isLoadingUpdate } = useUpdateProduct()
	const { deleteProduct, isLoadingDelete } = useDeleteProduct()

	const Disabled = isLoadingCreate || isLoadingUpdate || isLoadingDelete
	const Title = product ? 'Edit product' : 'Create Product'
	const Description = product ? 'Update current product' : 'Create new product'
	const Action = product ? 'Update' : 'Create'

	const form = useForm<IProductInput>({
		resolver: zodResolver(productSchema),
		mode: 'onChange',
		values: {
			title: product?.title || '',
			description: product?.description || '',
			price: product?.price || 0,
			images: product?.images || [],
			categoryId: product?.category.id || '',
			colorId: product?.color.id || ''
		}
	})

	const onSubmit: SubmitHandler<IProductInput> = data => {
		data.price = Number(data.price)
		if (!product) createProduct(data)
		else updateProduct(data)
	}
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={Title} description={Description} />
				{product && (
					<ConfirmModal
						handleClick={deleteProduct}
						title='Del title'
						text='Del text'
						confirmButton='Delete'
					>
						<Button
							variant='destructive'
							title='Delete Store'
							disabled={Disabled}
						>
							<Trash2Icon />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<div className={styles.content}>
				{isLoading ? (
					<ProductSkeleton />
				) : (
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormUploadInput
							form={form}
							formField='images'
							title='Product images'
							disabled={Disabled}
						/>
						<div className='flex gap-4'>
							<FormTextInput
								form={form}
								formField='title'
								title='Product name'
								disabled={Disabled}
								placeholer='Product name'
							/>
							<FormNumberInput
								form={form}
								formField='price'
								title='Price'
								disabled={Disabled}
								placeholer='Product price'
							/>
							<FormSelectInput
								form={form}
								formField='categoryId'
								title='Category'
								disabled={Disabled}
								placeholer='Select category'
								selectOptions={categoriesOptions}
							/>
							<FormSelectColorInput
								form={form}
								formField='colorId'
								title='Color'
								disabled={Disabled}
								placeholer='Select color'
								selectOptions={colorsOptions}
							/>
						</div>
						<FormTextAreaInput
							form={form}
							formField='description'
							title='Description'
							disabled={Disabled}
							placeholer='Enter product description'
						/>
						<Button type='submit' variant='primary'>
							{Action}
						</Button>
					</form>
				)}
			</div>
		</div>
	)
}
