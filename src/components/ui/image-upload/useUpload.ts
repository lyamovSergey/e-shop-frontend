import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useMemo, useRef } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/files.service'

export function useUpload(onChange: (value: string[] | string) => void) {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const { mutate: uploadFiles, isPending: isUploading } = useMutation({
		mutationKey: ['files', 'upload'],
		mutationFn: ({
			formData,
			folder
		}: {
			formData: FormData
			folder?: string
		}) => fileService.upload(formData, folder),
		onSuccess(data) {
			onChange(data.map(file => file.url))
		},
		onError(error) {
			console.log('useUpload error::: ', error)
			toast.error('Error upload files!')
		}
	})

	const handleFileChange = (
		event: ChangeEvent<HTMLInputElement>,
		folder?: string
	) => {
		const selectedFiles = event.target.files
		if (selectedFiles) {
			const fileArray = Array.from(selectedFiles)
			const formData = new FormData()
			fileArray.forEach(file => formData.append('files', file))
			uploadFiles({ formData, folder })
		}
	}
	const handleButtonClick = () => {
		fileInputRef.current?.click()
	}
	// return useMemo(
	// 	() => ({ handleButtonClick, isUploading, fileInputRef, handleFileChange }),
	// 	[handleButtonClick, isUploading, fileInputRef, handleFileChange]
	// )
	return { handleButtonClick, isUploading, fileInputRef, handleFileChange }
}
