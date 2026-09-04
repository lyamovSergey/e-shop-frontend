'use client'

import { ImagePlus } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { useUpload } from '@/components/ui/image-upload/useUpload'

import styles from './ImageUpload.module.scss'
import { cn } from '@/lib/utils'

interface IImageUploadProps {
	isDisabled: boolean
	onChange: (value: string[]) => void
	value: string[]
}
export function ImageUpload({
	isDisabled,
	onChange,
	value
}: IImageUploadProps) {
	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload(onChange)
	return (
		<div>
			<div className={styles.image_container}>
				{value.map(url => (
					<div className={styles.image_wrapper} key={url}>
						<Image src={url} alt='Product image' fill />
					</div>
				))}
			</div>
			<Button
				type='button'
				disabled={isDisabled || isUploading}
				variant='secondary'
				onClick={handleButtonClick}
				className={cn(styles.upload, {
					'mt-4': value.length
				})}
			>
				<ImagePlus />
				Upload Images
			</Button>
			<input
				type='file'
				multiple
				className=' hidden'
				ref={fileInputRef}
				onChange={handleFileChange}
				disabled={isDisabled}
			/>
		</div>
	)
}
