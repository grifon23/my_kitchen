import { IIngradient } from './ingradient.interface'

export interface ICreateRecipeForm {
	categoryId: string
	name: string
	description: string
	ingradients: IIngradient[]
}
