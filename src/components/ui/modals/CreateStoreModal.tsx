'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { type PropsWithChildren, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { useCreateStore } from '@/hooks/queries/stores/useCreateStore'

import { IStoreCreate } from '@/shared/types/store.interface'

const storeTitleSchema = z.object({
	title: z.string().min(1, 'Title is required')
})

export function CreateStoreModal({ children }: PropsWithChildren<unknown>) {
	const [isOpen, setIsOpen] = useState(false)
	const { createStore, isLoadingCreate } = useCreateStore()
	const form = useForm<IStoreCreate>({
		resolver: zodResolver(storeTitleSchema),
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
									disabled={isLoadingCreate}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
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
