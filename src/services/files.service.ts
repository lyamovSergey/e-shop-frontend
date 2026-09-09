import { axiosWithAuth } from '@/api/api.client.interseptors'

import { API_URL } from '@/config/api.config'

import { IFile, filesSchema } from '@/shared/schemas/api/file.schema'

class FileService {
	async upload(file: FormData, folder?: string) {
		const { data } = await axiosWithAuth<IFile[]>({
			url: API_URL.files(),
			method: 'POST',
			data: file,
			params: {
				folder
			},
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return filesSchema.parse(data)
	}
}
export const fileService = new FileService()
