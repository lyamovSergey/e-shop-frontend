'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2Icon } from 'lucide-react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Textarea } from '@/components/ui/textarea'

import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'

import { IStoreEdit } from '@/shared/types/store.interface'

import styles from '../Store.module.scss'

const storeSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string()
})
export function Settings() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore()
	const { deleteStore, isLoadingDelete } = useDeleteStore()

	const form = useForm<IStoreEdit>({
		resolver: zodResolver(storeSchema),
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
				<div className=' flex justify-between'>
					<Heading title='Settings' description='Manage store settings' />
					<ConfirmModal
						handleClick={deleteStore}
						title='Del title'
						text='Del text'
						confirmButton='Delete'
					>
						<Button variant='destructive' disabled={isLoadingDelete}>
							<Trash2Icon />
						</Button>
					</ConfirmModal>
				</div>
			</div>
			<div className={styles.content}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<Controller
						name='title'
						control={form.control}
						defaultValue=''
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor='title'>Title</FieldLabel>
								<Input
									{...field}
									id='title'
									type='text'
									placeholder='Store title'
									autoComplete='off'
									disabled={isLoadingUpdate}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name='description'
						control={form.control}
						defaultValue=''
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor='description'>Description</FieldLabel>
								<Textarea
									{...field}
									id='description'
									placeholder='Store description'
									disabled={isLoadingUpdate}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<div className='flex justify-end'>
						<Button type='submit' variant='primary' disabled={isLoadingUpdate}>
							Update
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
