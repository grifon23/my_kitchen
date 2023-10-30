import { presignedUploaderService, Service, storageService } from '~modules/common/service'
import { IFile, IUploadParams, StorageKey, TypeUploadFile } from '~modules/common/typing'
import { accountApi } from '../api'
import {
	RemoveProductAction,
	ResetAccount,
	SetAccountAction,
	UpdateProductAction,
} from '~modules/store/account/actions'
import { IAccountForm, IUser } from '../typing'
import { IProduct } from '~modules/products/typing'

class AccountService extends Service {
	public async loadAcount() {
		const uuid = await storageService.get(StorageKey.UUID)
		const account: any = await accountApi.getAccountReq(uuid)
		this.dispatch(new SetAccountAction(account))
		return account
	}

	public async updateMyProducts(uuid: string, products: IProduct[]) {
		await accountApi.updateMyProductsReq(uuid, products)
		await this.loadAcount()
	}

	public async resetAccount() {
		this.dispatch(new ResetAccount())
	}

	public updatePruduct(payload: IProduct) {
		this.dispatch(new UpdateProductAction(payload))
	}

	public removeProduct(id: string) {
		this.dispatch(new RemoveProductAction({ id }))
	}

	public async uploadAvatar(file: IFile) {
		// await presignedUploaderService.upload(
		// 	file,
		// 	async (params: IUploadParams) => await accountGetLinkAvatar(params),
		// 	async (params: string) => await accountFinishUploadAvatar(params),
		// 	{ type },
		// )
		await accountApi.updateProfileImageReq(file)
		await this.loadAcount()

	}
	public async updateAccountInfo(data: IAccountForm) {
		await accountApi.updateAccountMainInfoReq(data)
		await this.loadAcount()
	}
}

export const accountService = new AccountService()
