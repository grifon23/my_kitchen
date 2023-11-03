import { IIngradient } from './ingradient.interface'

export interface IRecipe {
	name: string
	categoryId: string
	id: string
	isFavorite: boolean
	ingradients: IIngradient[]
	description: string
}
