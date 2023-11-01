/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import { IFile } from '../typing'

interface Params {
	filename?: string
	mimetype?: string
	[key: string]: any
}

export interface GetPresignedUrlReqResponse {
	presignedUrl: string
	uploadId: string
}

type GetPresignedUrlReq = (
	params: any,
) => Promise<AxiosResponse<GetPresignedUrlReqResponse>>

type FinishUploadReq = (uploadId: string) => Promise<any>

class PresignedUploaderService {
	public async upload(
		file: IFile,
		getUrlReq: GetPresignedUrlReq | any,
		finishReq: FinishUploadReq | any,
		params: Params,
	): Promise<any> {
		console.log('start upload', params)
		const { presignedUrl, uploadId } = await this.getLink(getUrlReq, {
			...params,
			filename: file.fileName,
			mimetype: file.type,
		})

		console.log(uploadId)
		await this.uploadFile(presignedUrl, file)

		return await this.endUpload(uploadId, finishReq)
	}

	private async getLink(getUrlReq: GetPresignedUrlReq, params: Params) {
		const { data } = await getUrlReq(params)
		return data
	}

	private async uploadFile(url: string, file: any) {
		await fetch(url, {
			method: 'PUT',
			body: file,
		})
	}

	private async endUpload(id: string, finishReq: FinishUploadReq) {
		try {
			await finishReq(id)
		} catch (error) {
			console.log(error)
		}
	}
}

export const presignedUploaderService = new PresignedUploaderService()
