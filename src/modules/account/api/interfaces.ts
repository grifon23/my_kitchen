import { GendersEnum } from "../typing"


export interface IPayloadUpdateAccount {
	name: string
	email: string
	dateOfBirth: string
	gender: GendersEnum
	avatar: string
}
