import auth from '@react-native-firebase/auth'
import { ISignInPayload, ISignUpPayload } from './interfaces'

export class AuthRequestsService {
	public async signIn(payload: ISignInPayload) {
		try {
			const resp = await auth().signInWithEmailAndPassword(
				payload.email,
				payload.password,
			)
		} catch (error: any) {
			const code = await error.code
			throw new Error(code)
		}
	}

	public async signUp(payload: ISignUpPayload) {
		try {
			const resp = await auth().createUserWithEmailAndPassword(
				payload.email,
				payload.password,
			)
		} catch (error: any) {
			const code = await error.code
			throw new Error(code)
		}
	}
}

export const authApiService = new AuthRequestsService()
