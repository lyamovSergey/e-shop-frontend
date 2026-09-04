'use client'
import { ChevronsUpDown, Plus, StoreIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/command'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

import { STORE_URL } from '@/config/url.config'

import { IStore } from '@/shared/types/store.interface'

import { cn } from '@/lib/utils'

interface StoreSwitcherProps {
	items: IStore[]
}
export function StoreSwitcher({ items }: StoreSwitcherProps) {
	const router = useRouter()
	const params = useParams<{ storeId: string }>()
	const [isOpen, setIsOpen] = useState(false)

	const onStoreSelect = (storeId: string) => {
		setIsOpen(false)
		router.push(STORE_URL.home(storeId))
	}
	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger
				render={
					<Button
						variant='outline'
						size='sm'
						role='combobox'
						aria-expanded={isOpen}
						aria-label='Choose Store'
						className='w-52'
					>
						<StoreIcon className='mr-2 size-4' />
						My Stores
						<ChevronsUpDown className='ml-auto size-4 shrink-0 opacity-50' />
					</Button>
				}
			/>
			<PopoverContent className='w-52 p-0'>
				<Command>
					<CommandList>
						<CommandInput placeholder='Search...' />
						<CommandEmpty>Nothing found</CommandEmpty>
						<CommandGroup heading='Stores'>
							{items.map(store => (
								<CommandItem
									key={store.id}
									onSelect={() => onStoreSelect(store.id)}
									className={cn('text-sm', {
										'bg-blue-500 text-white': store.id == params.storeId
									})}
								>
									<StoreIcon className='mr-2 size-4' />
									<div title={store.title} className='line-clamp-1'>
										{store.title}
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CreateStoreModal></CreateStoreModal>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
