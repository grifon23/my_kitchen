import { NavGroupKey } from '~modules/root/typing'
import { SetNavGroupAction } from '~modules/store/navigation/actions'
import { Service } from './service'
import { accountService } from '~modules/acount/service'

export class AppService extends Service {
	public async init() {
		const account = await accountService.loadAcount()
		if (account) {
			this.dispatch(new SetNavGroupAction(NavGroupKey.User))
		} else {
			this.dispatch(new SetNavGroupAction(NavGroupKey.Auth))
		}
	}
}

export const appService = new AppService()
