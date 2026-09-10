import { useTranslations } from 'next-intl'
import { UseFormReturn } from 'react-hook-form'

import { FieldGroup } from '@/components/ui/field'
import { FormTextInput } from '@/components/ui/form-fields/FormTextInput'

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
	const $t = useTranslations('Auth')
	return (
		<>
			<FieldGroup>
				{isReg && (
					<FormTextInput
						form={form}
						formField='name'
						placeholer={$t('name_placeholder')}
						title={$t('name')}
						disabled={isPending}
					/>
				)}
				<FormTextInput
					form={form}
					formField='email'
					placeholer={$t('email_placeholder')}
					title={$t('email')}
					type='text'
					disabled={isPending}
				/>
				<FormTextInput
					form={form}
					formField='password'
					placeholer={$t('password_placeholder')}
					title={$t('password')}
					type='password'
					disabled={isPending}
				/>
			</FieldGroup>
		</>
	)
}
