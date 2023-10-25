import { presenceCost, validate } from '~modules/common'
import { ICreateRecipeForm } from '../typing'

const constraints = {
	categoryId: { presence: presenceCost },
	name: { presence: presenceCost },
	description: { presence: presenceCost },
	ingradients: { array: {} },
}

export const createRecipeValidator = (data: ICreateRecipeForm) => {
	return validate(data, constraints)
}
