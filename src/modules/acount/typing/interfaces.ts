import { IProduct } from '~modules/ingradients/typing'

export interface IUser {
	name?: string
	email: string
	uuid: string
	age?: number
	myProducts: IProduct[]
}
