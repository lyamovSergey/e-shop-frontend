import { Controller, UseFormReturn } from 'react-hook-form'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel
} from '@/components/ui/field'
import { FormTextInput } from '@/components/ui/form-fields/FormTextInput'
import { Input } from '@/components/ui/input'

import { IAuthForm } from '@/shared/types/auth.interface'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, IAuthForm>
	isPending: boolean
	isReg?: boolean
}

export function AuthFields({
	form,
	isPending,
	isReg = false
}: AuthFieldsProps) {
	return (
		<>
			<FieldGroup>
				{isReg && (
					<FormTextInput
						form={form}
						formField='name'
						placeholer='Enter your name'
						title='Name'
						disabled={isPending}
					/>
				)}
				<FormTextInput
					form={form}
					formField='email'
					placeholer='Enter your email'
					title='Email'
					type='email'
					disabled={isPending}
				/>
				<FormTextInput
					form={form}
					formField='password'
					placeholer='Enter your passwrod'
					title='Password'
					type='password'
					disabled={isPending}
				/>
			</FieldGroup>
		</>
	)
}
