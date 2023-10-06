import { presenceCost, validate } from '~modules/common'

const constraints = {
	name: { presence: presenceCost },
}

export const categoryValidator = (data: any) => {
	return validate(data, constraints)
}
