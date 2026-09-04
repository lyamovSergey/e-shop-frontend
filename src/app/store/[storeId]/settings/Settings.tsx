'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2Icon } from 'lucide-react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { FormTextAreaInput } from '@/components/ui/form-fields/FormTextAreaInput'
import { FormTextInput } from '@/components/ui/form-fields/FormTextInput'
import { Input } from '@/components/ui/input'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Textarea } from '@/components/ui/textarea'

import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'

import { storeSettingSchema } from '@/shared/schemas/storeSettings.schema'
import { IStoreEdit } from '@/shared/types/store.interface'

import styles from '../Store.module.scss'

export function Settings() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore()
	const { deleteStore, isLoadingDelete } = useDeleteStore()

	const Disabled = isLoadingUpdate || isLoadingDelete

	const form = useForm<IStoreEdit>({
		resolver: zodResolver(storeSettingSchema),
		values: {
			title: store?.title || '',
			description: store?.description || ''
		},
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IStoreEdit> = data => {
		updateStore(data)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title='Settings' description='Manage store settings' />
				<ConfirmModal
					handleClick={deleteStore}
					title='Del title'
					text='Del text'
					confirmButton='Delete'
				>
					<Button
						variant='destructive'
						title='Delete Store'
						disabled={Disabled}
					>
						<Trash2Icon />
					</Button>
				</ConfirmModal>
			</div>
			<div className={styles.content}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
						<Button type='submit' variant='primary' disabled={Disabled}>
							Update
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
