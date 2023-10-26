import { Service, storageService } from '~modules/common/service'
import { StorageKey } from '~modules/common/typing'
import { accountApi } from '../api'
import { ResetAccount, SetAccountAction } from '~modules/store/account/actions'
import { IUser } from '../typing'
import { IProduct } from '~modules/products/typing'

class AccountService extends Service {
	public async loadAcount() {
		const uuid = await storageService.get(StorageKey.UUID)
		const account: any = await accountApi.getAccountReq(uuid)
		this.dispatch(new SetAccountAction(account))
		return account
	}

	public async updateMyProducts(uuid: string, products: IProduct[]) {
		await this.updateMyProducts(uuid, products)
		await this.loadAcount()
	}

	public async resetAccount() {
		this.dispatch(new ResetAccount())
	}
}

export const accountService = new AccountService()
