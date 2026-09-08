'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2Icon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './Settings.module.scss'
import layoutStyles from '@/components/layouts/AdminLayout.module.scss'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { FormLogoUpload } from '@/components/ui/form-fields/FormLogoUpload'
import { FormTextAreaInput } from '@/components/ui/form-fields/FormTextAreaInput'
import { FormTextInput } from '@/components/ui/form-fields/FormTextInput'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'

import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'
import { useProfile } from '@/hooks/useProfile'

import { storeSettingSchema } from '@/shared/schemas/form-validators/storeSettings.schema'
import { IStoreEdit } from '@/shared/types/store.interface'
import { EnumUserRole } from '@/shared/types/user.interface'

import { cn } from '@/lib/utils'

export function Settings() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore()
	const { user } = useProfile()

	const { deleteStore, isLoadingDelete } = useDeleteStore()

	const Disabled = isLoadingUpdate || isLoadingDelete

	const form = useForm<IStoreEdit>({
		resolver: zodResolver(storeSettingSchema),
		values: {
			title: store?.title || '',
			description: store?.description || '',
			logo: store?.logo || ''
		},
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IStoreEdit> = async data => {
		updateStore(data)
	}

	return (
		<div className={layoutStyles.pageWrapper}>
			<div className={layoutStyles.pageHeader}>
				<Heading title='Settings' description='Manage store settings' />
				{user?.role === EnumUserRole.ADMIN && (
					<ConfirmModal
						handleClick={deleteStore}
						title='Del title'
						text='Del text'
						confirmButton='Delete'
					>
						<Button
							variant='neoDanger'
							title='Delete Store'
							disabled={Disabled}
						>
							<Trash2Icon />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<div className={cn(layoutStyles.pageContent, styles.settings_wrapper)}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn(styles.settingsForm, 'neo-base')}
				>
					<span className={styles.settingsForm_title}>Main store settings</span>
					<FormLogoUpload form={form} formField='logo' disabled={Disabled} />
					<FormTextInput
						form={form}
						formField='title'
						title='Store title'
						placeholer='Enter store title'
						disabled={Disabled}
					/>

					<FormTextAreaInput
						form={form}
						formField='description'
						title='Store description'
						placeholer='Enter store description'
						disabled={Disabled}
					/>
					<div className='flex justify-end'>
						<Button type='submit' variant='neoAction' disabled={Disabled}>
							Update
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
