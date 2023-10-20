import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Service, storageService } from '~modules/common/service'
import { StorageKey } from '~modules/common/typing'
import { NavGroupKey } from '~modules/root/typing'
import { Reset, SetNavGroupAction } from '~modules/store/navigation/actions'
import { authApiService, ISignInPayload, ISignUpPayload } from '../api'
import { defaultProductsData } from '~modules/ingradients/config'

export class AuthService extends Service {
	public async signIn(payload: ISignInPayload) {
		const resp = await authApiService.signInReq(payload)
		const token = await resp.user.getIdToken()
		this.saveSession(token, resp.user.uid)
		this.dispatch(new SetNavGroupAction(NavGroupKey.User))
	}

	public async signUp(payload: ISignUpPayload) {
		const resp = await authApiService.signUpReq(payload)
		await authApiService.createUser({
			email: payload.email,
			uuid: resp.user.uid,
			myProducts: defaultProductsData,
		})
		const isSignedInWithGoogle = await GoogleSignin.hasPlayServices()
		if (isSignedInWithGoogle) {
			await authApiService.signUpWithGoogle()
		}
		const token = await resp.user.getIdToken()
		this.saveSession(token, resp.user.uid)
		this.dispatch(new SetNavGroupAction(NavGroupKey.User))
	}

	public async signInWithGoogle() {
		const resp = await authApiService.signInGoogleReq()
		const token = await resp.user.getIdToken()
		this.saveSession(token, resp.user.uid)
		this.dispatch(new SetNavGroupAction(NavGroupKey.User))
	}

	public async saveSession(token: string, uuid: string) {
		await storageService.set(StorageKey.AccessToken, token)
		await storageService.set(StorageKey.UUID, uuid)
	}

	public async logOut() {
		await authApiService.logOutReq()
		// Remove Google account
		// await authService.revokeGoogleAccess()
		await storageService.set(StorageKey.AccessToken, null)
		this.dispatch(new Reset())
	}

	private async revokeGoogleAccess() {
		try {
			const isLoginUser = await GoogleSignin.isSignedIn()
			if (isLoginUser) await GoogleSignin.revokeAccess()
		} catch (error) {
			console.error('Error revoking access:', error)
		}
	}
}

export const authService = new AuthService()
