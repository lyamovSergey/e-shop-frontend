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
					<Controller
						name='name'
						control={form.control}
						defaultValue=''
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor='email'>Name</FieldLabel>
								<Input
									{...field}
									id='name'
									type='text'
									placeholder='Name'
									autoComplete='off'
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				)}
				<Controller
					name='email'
					control={form.control}
					defaultValue=''
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel htmlFor='email'>Email</FieldLabel>
							<Input
								{...field}
								id='email'
								type='email'
								placeholder='m@example.com'
								autoComplete='off'
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name='password'
					control={form.control}
					defaultValue=''
					render={({ field, fieldState }) => (
						<Field>
							<div className='flex items-center'>
								<FieldLabel htmlFor='password'>Password</FieldLabel>
								{/* <a
									href='#'
									className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
								>
									Forgot your password?
								</a> */}
							</div>
							<Input
								id='password'
								{...field}
								type='password'
								placeholder='*******'
								autoComplete='off'
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
		</>
	)
}
