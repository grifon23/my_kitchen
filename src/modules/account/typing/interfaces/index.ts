import { GendersEnum } from './../enums/gender.enum'
export interface IAccountForm {
	name: string
	email: string
	dateOfBirth: string
	gender: GendersEnum
}
