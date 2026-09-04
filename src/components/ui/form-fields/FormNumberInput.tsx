'use client'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface IFormNumberInputProps<T extends FieldValues> {
	form: UseFormReturn<T>
	formField: Path<T>
	title?: string
	disabled?: boolean
	placeholer?: string
}
export function FormNumberInput<T extends FieldValues>({
	form,
	title,
	disabled,
	placeholer,
	formField
}: IFormNumberInputProps<T>) {
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
						type='number'
						placeholder={placeholer || 'Enter value'}
						autoComplete='off'
						disabled={disabled}
						aria-invalid={fieldState.invalid}
						onChange={e => {
							const value = e.target.value
							field.onChange(value === '' ? undefined : Number(value))
						}}
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
