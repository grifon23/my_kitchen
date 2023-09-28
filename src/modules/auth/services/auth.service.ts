import {
	Service,
	storageService,
	StorageService,
} from '~modules/common/service'
import { StorageKey } from '~modules/common/typing'
import { NavGroupKey } from '~modules/root/typing'
import { Reset, SetNavGroupAction } from '~modules/store/navigation/actions'
import { authApiService, ISignInPayload, ISignUpPayload } from '../api'

export class AuthService extends Service {
	public async signIn(payload: ISignInPayload) {
		const resp = await authApiService.signInReq(payload)
		const token = await resp.user.getIdToken()
		console.log('resp.user.getIdToken', token)
		this.saveSession(token)
		this.dispatch(new SetNavGroupAction(NavGroupKey.User))
	}

	public async signUp(payload: ISignUpPayload) {
		const resp = await authApiService.signUpReq(payload)
		const token = await resp.user.getIdToken()
		this.saveSession(token)
		this.dispatch(new SetNavGroupAction(NavGroupKey.User))
	}

	public async saveSession(token: string) {
		await storageService.set(StorageKey.AccessToken, token)
	}

	public async logOut() {
		await authApiService.logOutReq()
		await storageService.set(StorageKey.AccessToken, null)
		this.dispatch(new Reset())
	}
}

export const authService = new AuthService()
