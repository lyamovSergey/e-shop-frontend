'use client'

import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface IFormTextInputProps<T extends FieldValues> {
	form: UseFormReturn<T>
	formField: Path<T>
	title?: string
	disabled?: boolean
	placeholer?: string
	type?: 'text' | 'email' | 'password'
}

export function FormTextInput<T extends FieldValues>({
	form,
	title,
	disabled,
	placeholer,
	formField,
	type = 'text'
}: IFormTextInputProps<T>) {
	return (
		<Controller
			name={formField}
			control={form.control}
			render={({ field, fieldState }) => (
				<Field className='relative'>
					{title && <FieldLabel htmlFor={formField}>{title}</FieldLabel>}
					<Input
						{...field}
						id={formField}
						type={type}
						placeholder={placeholer || 'Enter value'}
						autoComplete='off'
						aria-invalid={fieldState.invalid}
						disabled={disabled}
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
