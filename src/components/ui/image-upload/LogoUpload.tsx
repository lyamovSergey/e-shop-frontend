'use client'

import { ImagePlus, Trash2 } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { useUpload } from '@/components/ui/image-upload/useUpload'

import styles from './ImageUpload.module.scss'
import { cn } from '@/lib/utils'

interface IImageUploadProps {
	isDisabled: boolean
	onChange: (value: string[] | string) => void
	value: string
}

export function LogoUpload({ isDisabled, onChange, value }: IImageUploadProps) {
	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload(onChange)
	return (
		<div className={cn(styles.logo_container, 'neo-base')}>
			{value ? (
				<>
					<Image
						src={value}
						alt='Product image'
						width={200}
						height={200}
						className='max-w-43 max-h-43 w-auto h-auto'
					/>
					<Button
						onClick={() => onChange('')}
						variant='neoDanger'
						className=' absolute top-2 right-2'
					>
						<Trash2 />
					</Button>
				</>
			) : (
				<Button
					type='button'
					disabled={isDisabled || isUploading}
					variant='neo'
					onClick={handleButtonClick}
					className={cn(styles.upload, {
						'mt-4': value
					})}
				>
					<ImagePlus />
					Upload Logo
				</Button>
			)}
			<input
				type='file'
				className=' hidden'
				ref={fileInputRef}
				onChange={e => handleFileChange(e, 'store')}
				disabled={isDisabled}
			/>
		</div>
	)
}
