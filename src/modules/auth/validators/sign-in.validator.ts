import { presenceCost, validate, validateEmailRule } from '~modules/common'
import { ISignInForm } from '../typing'

const constraints = {
	password: { presence: presenceCost },
	email: { presence: presenceCost, email: validateEmailRule },
}

export const signInValidator = (data: ISignInForm) => {
	return validate(data, constraints)
}
