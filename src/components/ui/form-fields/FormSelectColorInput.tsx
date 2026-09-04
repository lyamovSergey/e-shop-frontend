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
	hex: string
}

interface IFormSelectInputProps<T extends FieldValues> {
	form: UseFormReturn<T>
	formField: Path<T>
	selectOptions: IOption[]
	title?: string
	disabled?: boolean
	placeholer?: string
}
export function FormSelectColorInput<T extends FieldValues>({
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
			render={({ field, fieldState }) => {
				const selectedColor = selectOptions.find(
					item => item.value === field.value
				)
				return (
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
								>
									{selectedColor?.label ? (
										<div className='flex items-center gap-2'>
											<div
												className='rounded-full w-4 h-4'
												style={{
													backgroundColor: selectedColor?.hex,
													border: `1px solid ${selectedColor?.hex}`
												}}
											/>

											{selectedColor?.label}
										</div>
									) : (
										placeholer || 'Select color'
									)}
								</SelectValue>
							</SelectTrigger>
							<SelectContent alignItemWithTrigger={false}>
								{selectOptions.map(item => (
									<SelectItem key={item.value} value={item.value}>
										<div className='flex items-center gap-2'>
											<div
												className=' rounded-full w-4 h-4'
												style={{
													backgroundColor: item.hex,
													border: `1px solid ${item.hex}`
												}}
											></div>
											{item.label}
										</div>
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
				)
			}}
		/>
	)
}
