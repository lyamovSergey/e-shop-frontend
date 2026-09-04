'use client'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

interface IOption {
	label: string
	value: string
}

interface IFormSelectInputProps<T extends FieldValues> {
	form: UseFormReturn<T>
	formField: Path<T>
	selectOptions: IOption[]
	title?: string
	disabled?: boolean
	placeholer?: string
}
export function FormSelectInput<T extends FieldValues>({
	form,
	title,
	disabled,
	placeholer,
	formField,
	selectOptions
}: IFormSelectInputProps<T>) {
	return (
		<Controller
			name={formField}
			control={form.control}
			render={({ field, fieldState }) => (
				<Field className='relative'>
					{title && <FieldLabel htmlFor={formField}>{title}</FieldLabel>}
					<Select
						items={selectOptions}
						disabled={disabled}
						value={field.value}
						onValueChange={field.onChange}
					>
						<SelectTrigger aria-invalid={fieldState.invalid}>
							<SelectValue
								{...field}
								id={formField}
								placeholder={placeholer || 'Enter value'}
							/>
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							{selectOptions.map(item => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
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
