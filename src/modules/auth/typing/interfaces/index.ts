import { GendersEnum } from '~modules/account'

export interface ISignInForm {
	email: string
	password: string
}

export interface ISignUpForm {
	email: string
	password: string
	confirmPassword: string
}

export interface IUpdateUserInfo {
	uuid: string
	dateOfBirth: string
	name: string
	gender: GendersEnum
	avatar: string
}
