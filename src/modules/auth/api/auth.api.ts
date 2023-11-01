import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { ISignInPayload, ISignUpPayload } from './interfaces'
import { appEvents } from '~modules/common'
import _ from 'lodash'
import { IProduct } from '~modules/products/typing'

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

	public async createUser(payload: {
		email: string
		uuid: string
		myProducts: IProduct[]
	}) {
		await firestore().collection('users').doc(payload.uuid).set(payload)
	}

	public async updateUserInfo(payload: {
		uuid: string
		dateOfBirth: string
		name: string
		gender: string
		avatar: string
	}) {
		await firestore().collection('users').doc(payload.uuid).update(payload)
	}

	public async signInGoogleReq() {
		try {
			await GoogleSignin.hasPlayServices()
			const { idToken, user } = await GoogleSignin.signIn()
			const checkUser = await authApiService.checkUser(user.email)
			if (checkUser) {
				const googleCredential =
					auth.GoogleAuthProvider.credential(idToken)
				return await auth().signInWithCredential(googleCredential)
			} else {
				this.alertUserNotRegister()
			}
		} catch (error: any) {
			const code = await error.code
			throw new Error(code)
		}
	}

	public async logOutReq() {
		return await auth().signOut()
	}

	public async checkUser(email: string) {
		try {
			const data = await firestore()
				.collection('users')
				.where('email', '==', email)
				.get()
			if (data.empty) {
				return false
			}
			return true
		} catch (error) {
			console.log('ERROR CHECK USER', error)
		}
	}

	public async signUpWithGoogle() {
		const userInfo = await GoogleSignin.signIn()
		const googleCredential = auth.GoogleAuthProvider.credential(
			userInfo.idToken,
		)
		const user = auth().currentUser
		if (user) {
			await user.linkWithCredential(googleCredential)
		} else {
			console.log('USER IN SIGN UP ', user)
		}
	}
	alertUserNotRegister = () => {
		appEvents.emit('alert', {
			onPress: () => _.noop,
			btnText: 'Ok',
			icon: 'user',
			buttonType: 'primary',
			message: 'Please create an account first!',
		})
	}
}

export const authApiService = new AuthRequestsService()
