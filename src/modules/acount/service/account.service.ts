import { Service, storageService } from '~modules/common/service'
import { StorageKey } from '~modules/common/typing'
import { accountApi } from '../api'
import { Reset, SetAccountAction } from '~modules/store/account/actions'
import { IUser } from '../typing'
import { IProduct } from '~modules/products/typing'

class AccountService extends Service {
	public async loadAcount() {
		const uuid = await storageService.get(StorageKey.UUID)
		console.log('uuid account', uuid)
		const account: any = await accountApi.getAccountReq(uuid)
		this.dispatch(new SetAccountAction(account))
		return account
	}

	public async updateMyProducts(uuid: string, products: IProduct[]) {
		await this.updateMyProducts(uuid, products)
		await this.loadAcount()
	}
	public async resetAccount() {
		await storageService.set(StorageKey.UUID, null)
		this.dispatch(new Reset())
	}
}

export const accountService = new AccountService()
