'use client'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

interface IFormTextAreaInputProps<T extends FieldValues> {
	form: UseFormReturn<T>
	formField: Path<T>
	title?: string
	disabled?: boolean
	placeholer?: string
}
export function FormTextAreaInput<T extends FieldValues>({
	form,
	title,
	disabled,
	placeholer,
	formField
}: IFormTextAreaInputProps<T>) {
	return (
		<Controller
			name={formField}
			control={form.control}
			render={({ field, fieldState }) => (
				<Field className='relative'>
					{title && <FieldLabel htmlFor={formField}>{title}</FieldLabel>}
					<Textarea
						{...field}
						id={formField}
						placeholder={placeholer || 'Enter value'}
						disabled={disabled}
						aria-invalid={fieldState.invalid}
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
