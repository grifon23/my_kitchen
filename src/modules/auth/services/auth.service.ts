import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Service, storageService } from '~modules/common/service'
import { StorageKey } from '~modules/common/typing'
import { NavGroupKey } from '~modules/root/typing'
import { Reset, SetNavGroupAction } from '~modules/store/navigation/actions'
import { ResetAccount } from '~modules/store/account/actions'
import { authApiService, ISignInPayload, ISignUpPayload } from '../api'
import { defaultProductsData } from '~modules/products/config'
import { accountService } from '~modules/account/service'
import { IAccountForm } from '~modules/account'
import { IUpdateUserInfo } from '../typing'

export class AuthService extends Service {
	public async signIn(payload: ISignInPayload) {
		const resp = await authApiService.signInReq(payload)
		const token = await resp.user.getIdToken()
		this.saveSession(token, resp.user.uid)
		this.dispatch(new SetNavGroupAction(NavGroupKey.User))
		await accountService.loadAcount()
	}

	private async connectGoogleAccount() {
		try {
			const isSignedInWithGoogle = await GoogleSignin.hasPlayServices()
			if (isSignedInWithGoogle) {
				await authApiService.signUpWithGoogle()
			}
		} catch (error) {
			console.log('connectGoogleAccount', error)
		}
	}

	public async signUp(payload: ISignUpPayload) {
		try {
			const resp = await authApiService.signUpReq(payload)
			await authApiService.createUser({
				email: payload.email,
				uuid: resp.user.uid,
				myProducts: defaultProductsData,
			})
			await this.connectGoogleAccount()
			const token = await resp.user.getIdToken()
			this.saveSession(token, resp.user.uid)
		} catch (error) {
			console.log('signUp', error)
		} finally {
			await accountService.loadAcount()
		}
	}

	public async signInWithGoogle() {
		const resp = await authApiService.signInGoogleReq()
		const token = await resp.user.getIdToken()
		this.saveSession(token, resp.user.uid)
		this.dispatch(new SetNavGroupAction(NavGroupKey.User))
		await accountService.loadAcount()
	}

	public async saveSession(token: string, uuid: string) {
		await storageService.set(StorageKey.UUID, uuid)
	}

	public async updateAccountInfo(payload: IUpdateUserInfo) {
		const date = payload.dateOfBirth
		await authApiService.updateUserInfo({
			...payload,
		})
		await accountService.loadAcount()
		this.dispatch(new SetNavGroupAction(NavGroupKey.User))
	}

	public async logOut() {
		await authApiService.logOutReq()
		await storageService.set(StorageKey.UUID, null)
		this.dispatch(new Reset())
		this.dispatch(new ResetAccount())
		// Remove Google account
		// await authService.revokeGoogleAccess()
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
