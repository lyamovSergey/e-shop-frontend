'use client'

import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { ImageUpload } from '@/components/ui/image-upload/ImageUpload'

interface IFormUploadInputProps<T extends FieldValues> {
	form: UseFormReturn<T>
	formField: Path<T>
	title?: string
	disabled?: boolean
	placeholer?: string
}

export function FormUploadInput<T extends FieldValues>({
	form,
	title,
	disabled,
	formField
}: IFormUploadInputProps<T>) {
	return (
		<Controller
			name={formField}
			control={form.control}
			render={({ field, fieldState }) => (
				<Field className='relative'>
					{title && <FieldLabel htmlFor={formField}>{title}</FieldLabel>}
					<ImageUpload
						isDisabled={disabled || false}
						onChange={field.onChange}
						value={field.value}
					/>
					{fieldState.invalid && (
						<FieldError
							className=' absolute -bottom-4 text-xs'
							errors={[fieldState.error]}
						/>
					)}
				</Field>
			)}
		/>
	)
}
