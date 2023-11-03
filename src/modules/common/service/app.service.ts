import { NavGroupKey } from '~modules/root/typing'
import { SetNavGroupAction } from '~modules/store/navigation/actions'
import { Service } from './service'
import { accountService } from '~modules/account/service'
import { storageService } from './storage.service'
import { StorageKey } from '../typing'

export class AppService extends Service {
	public async init() {
		const uuid = await storageService.get(StorageKey.UUID)
		if (uuid) {
			await accountService.loadAcount()
			this.dispatch(new SetNavGroupAction(NavGroupKey.User))
		} else {
			this.dispatch(new SetNavGroupAction(NavGroupKey.Auth))
		}
	}
}

export const appService = new AppService()
