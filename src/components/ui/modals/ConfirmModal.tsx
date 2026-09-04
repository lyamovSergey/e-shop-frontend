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
	open?: boolean
	onOpenChange?: (open: boolean) => void
	onClose?: () => void
	disabled?: boolean
}

export function ConfirmModal({
	children,
	handleClick,
	title = 'Are you absolutely sure?',
	text = 'This action cannot be undone. This will permanently delete your account from our servers.',
	confirmButton = 'Continue',
	cancelButton = 'Cancel',
	open,
	onOpenChange,
	onClose,
	disabled = false
}: PropsWithChildren<IConfirmModalProps>) {
	return (
		<AlertDialog
			{...(open !== undefined && {
				open: open,
				onOpenChange: val => {
					if (!val) onClose?.()
					onOpenChange?.(val)
				}
			})}
		>
			{children && <AlertDialogTrigger render={children as ReactElement} />}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{text}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={disabled}>
						{cancelButton}
					</AlertDialogCancel>
					<AlertDialogAction disabled={disabled} onClick={handleClick}>
						{confirmButton}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
