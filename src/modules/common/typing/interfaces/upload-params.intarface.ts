import { TypeUploadFile } from "../enums"

export interface IUploadParams {
	filename: string
	mimeType: string
	type: TypeUploadFile
}
