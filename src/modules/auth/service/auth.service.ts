import auth from '@react-native-firebase/auth'
import { appEvents, colors } from '~modules/common'
import { exeptionsConfig } from '../config'
import { ErrorKeysEnum } from '../typing'

export class AuthService {
	public async signIn(payload: { email: string; password: string }) {
		try {
			const resp = await auth().signInWithEmailAndPassword(
				payload.email,
				payload.password,
			)
			console.log('resp', resp)
		} catch (error: any) {
			const code = await error.code
			throw new Error(code)
		}
	}

	public async signUp(payload: { email: string; password: string }) {
		try {
			const resp = await auth().createUserWithEmailAndPassword(
				payload.email,
				payload.password,
			)
			console.log('resp', resp)
		} catch (error: any) {
			const code = await error.code
			throw new Error(code)
		}
	}
}

export const authService = new AuthService()
