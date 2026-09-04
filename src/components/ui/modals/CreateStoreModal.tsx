'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { type PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { FormTextInput } from '@/components/ui/form-fields/FormTextInput'

import { useCreateStore } from '@/hooks/queries/stores/useCreateStore'

import { createStoreSchema } from '@/shared/schemas/createStore.schema'
import { IStoreCreate } from '@/shared/types/store.interface'

export function CreateStoreModal({ children }: PropsWithChildren<unknown>) {
	const [isOpen, setIsOpen] = useState(false)
	const { createStore, isLoadingCreate } = useCreateStore()
	const form = useForm<IStoreCreate>({
		resolver: zodResolver(createStoreSchema),
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IStoreCreate> = data => {
		createStore(data)
		setIsOpen(false)
	}
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger
				render={
					<Button variant='outline' className='w-full rounded-sm'>
						<Plus className=' size-4' />
						Create store
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Shop</DialogTitle>
					<DialogDescription>Set name to create store</DialogDescription>
				</DialogHeader>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormTextInput
						form={form}
						formField='title'
						title='Store title'
						placeholer='Enter store title'
						disabled={isLoadingCreate}
					/>
					<div className='flex justify-end'>
						<Button type='submit' variant='primary' disabled={isLoadingCreate}>
							Create
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
