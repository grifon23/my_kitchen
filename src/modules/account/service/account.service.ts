import { Service, storageService } from '~modules/common/service'
import { StorageKey } from '~modules/common/typing'
import { accountApi } from '../api'
import {
	RemoveProductAction,
	ResetAccount,
	SetAccountAction,
	UpdateProductAction,
} from '~modules/store/account/actions'
import { IProduct } from '~modules/products/typing'
import { SetNavGroupAction } from '~modules/store/navigation/actions'
import { NavGroupKey } from '~modules/root/typing'
import { categoryService } from '~modules/categories/service'

class AccountService extends Service {
	public async loadAcount() {
		const uuid = await storageService.get(StorageKey.UUID)
		const account: any = await accountApi.getAccountReq(uuid)
		this.dispatch(new SetAccountAction(account))
		this.dispatch(new SetNavGroupAction(NavGroupKey.User))
		await categoryService.loadCategories()

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

	public async uploadAvatar(fileName: string, fileDate: string) {
		try {
			const imageRef = await accountApi.getUploadLink(fileName)
			await imageRef.putFile(fileDate)
			return await imageRef.getDownloadURL()
		} catch (error) {
			console.error('Firebase Storage:', error)
			throw error
		}
	}
}

export const accountService = new AccountService()
