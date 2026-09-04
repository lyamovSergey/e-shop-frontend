'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ICategoryColumn } from '@/app/store/[storeId]/categories/CategoryColumns'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { FormTextAreaInput } from '@/components/ui/form-fields/FormTextAreaInput'
import { FormTextInput } from '@/components/ui/form-fields/FormTextInput'

import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'

import { createCategorySchema } from '@/shared/schemas/createCategory.schema'
import { ICategoryInput } from '@/shared/types/category.interface'

interface IEditCategoryProps {
	open: boolean
	setIsOpen: (open: boolean) => void
	category?: ICategoryColumn
	onClose?: () => void
}

export function CreateCategoryModal({
	open,
	setIsOpen,
	category,
	onClose
}: IEditCategoryProps) {
	const { createCategory, isLoadingCreate } = useCreateCategory()
	const { updateCategory, isLoadingUpdate } = useUpdateCategory(category?.id)
	const Action = category ? 'Update' : 'Create'
	const Title = category ? 'Update Category' : 'Create Category'
	const Disabled = isLoadingCreate || isLoadingUpdate
	const form = useForm<ICategoryInput>({
		resolver: zodResolver(createCategorySchema),
		mode: 'onChange',
		values: {
			name: category?.name || '',
			description: category?.description || ''
		}
	})

	const onSubmit: SubmitHandler<ICategoryInput> = async data => {
		const action = category ? updateCategory : createCategory
		await action(data)
		form.reset()
		setIsOpen(false)
	}
	return (
		<Dialog
			open={open}
			onOpenChange={val => {
				form.reset()
				if (!val) onClose?.()
				setIsOpen(val)
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{Title}</DialogTitle>
				</DialogHeader>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormTextInput
						form={form}
						formField='name'
						title='Category name'
						placeholer='Enter category name'
						disabled={Disabled}
					/>
					<FormTextAreaInput
						form={form}
						formField='description'
						title='Category description'
						placeholer='Enter category description'
						disabled={Disabled}
					/>
					<div className='flex justify-end'>
						<Button type='submit' variant='primary' disabled={Disabled}>
							{Action}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
