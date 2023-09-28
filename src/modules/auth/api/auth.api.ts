import auth from '@react-native-firebase/auth'
import { ISignInPayload, ISignUpPayload } from './interfaces'

export class AuthRequestsService {
	public async signInReq(payload: ISignInPayload) {
		try {
			const resp = await auth().signInWithEmailAndPassword(
				payload.email,
				payload.password,
			)
			return resp
		} catch (error: any) {
			const code = await error.code
			throw new Error(code)
		}
	}

	public async signUpReq(payload: ISignUpPayload) {
		try {
			const resp = await auth().createUserWithEmailAndPassword(
				payload.email,
				payload.password,
			)
			return resp
		} catch (error: any) {
			const code = await error.code
			throw new Error(code)
		}
	}

	public async logOutReq() {
		return await auth().signOut()
	}
}

export const authApiService = new AuthRequestsService()
