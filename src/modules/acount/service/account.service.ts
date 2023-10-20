import { Service, storageService } from '~modules/common/service'
import { StorageKey } from '~modules/common/typing'
import { accountApi } from '../api'
import { SetAccountAction } from '~modules/store/account/actions'
import { IUser } from '../typing'

class AccountService extends Service {
	public async loadAcount() {
		const uuid = await storageService.get(StorageKey.UUID)
		const account: any = await accountApi.getAccountReq(uuid)
		this.dispatch(new SetAccountAction(account))
		return account
	}
}

export const accountService = new AccountService()
