import { IIngradient, IRecipe } from '../typing'

export interface IUpdateRecipePayload {
	name?: string
	categoryId?: string
	description?: string
	ingradients?: IIngradient[]
}

export interface IStoreRecipePayload extends IRecipe {}
