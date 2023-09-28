import { NavGroupKey } from '~modules/root/typing'
import { SetNavGroupAction } from '~modules/store/navigation/actions'
import { StorageKey } from '../typing'
import { Service } from './service'
import { storageService } from './storage.service'

export class AppService extends Service {
	public async init() {
		const token = await storageService.get(StorageKey.AccessToken)
		if (token) {
			this.dispatch(new SetNavGroupAction(NavGroupKey.User))
		} else {
			this.dispatch(new SetNavGroupAction(NavGroupKey.Auth))
		}
	}
}

export const appService = new AppService()
