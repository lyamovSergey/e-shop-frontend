'use client'
import type { PropsWithChildren, ReactElement } from 'react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface IConfirmModalProps {
	handleClick: () => void
	title?: string
	text?: string
	confirmButton?: string
	cancelButton?: string
}

export function ConfirmModal({
	children,
	handleClick,
	title = 'Are you absolutely sure?',
	text = 'This action cannot be undone. This will permanently delete your account from our servers.',
	confirmButton = 'Continue',
	cancelButton = 'Cancel'
}: PropsWithChildren<IConfirmModalProps>) {
	return (
		<AlertDialog>
			<AlertDialogTrigger render={children as ReactElement} />
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{text}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{cancelButton}</AlertDialogCancel>
					<AlertDialogAction onClick={handleClick}>
						{confirmButton}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
