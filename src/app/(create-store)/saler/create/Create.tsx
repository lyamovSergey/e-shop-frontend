'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PageAnimation } from '@/components/layouts/PageAnimation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormLogoUpload } from '@/components/ui/form-fields/FormLogoUpload'
import { FormTextAreaInput } from '@/components/ui/form-fields/FormTextAreaInput'
import { FormTextInput } from '@/components/ui/form-fields/FormTextInput'

import { useCreateStore } from '@/hooks/queries/stores/useCreateStore'

import { createStoreSchema } from '@/shared/schemas/createStore.schema'
import { IStoreCreate } from '@/shared/types/store.interface'

export function Create() {
	const { createStore, isLoadingCreate } = useCreateStore()
	const form = useForm<IStoreCreate>({
		resolver: zodResolver(createStoreSchema),
		mode: 'onChange',
		values: {
			title: ''
		}
	})
	const onSubmit: SubmitHandler<IStoreCreate> = data => {
		createStore(data)
	}
	return (
		<PageAnimation>
			<div className=' min-h-screen flex items-center justify-center'>
				<div className=' flex min-w-70 w-90'>
					<Card className=' w-full'>
						<CardHeader>
							<CardTitle className=' text-center'>
								Create your first store
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-4'
							>
								<FormLogoUpload
									form={form}
									formField='logo'
									disabled={isLoadingCreate}
								/>
								<FormTextInput
									form={form}
									formField='title'
									title='Store title'
									placeholer='Enter store title'
									disabled={isLoadingCreate}
								/>
								<FormTextAreaInput
									form={form}
									formField='description'
									title='Store description'
									placeholer='Enter store description'
									disabled={isLoadingCreate}
								/>
								<div className='flex justify-end'>
									<Button
										type='submit'
										variant='neoAction'
										className='w-full'
										disabled={isLoadingCreate}
									>
										Create
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</PageAnimation>
	)
}
