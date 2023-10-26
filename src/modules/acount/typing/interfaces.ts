import { IProduct } from '~modules/products/typing'

export interface IUser {
	name?: string
	email: string
	uuid: string
	age?: number
	myProducts: IProduct[]
}
