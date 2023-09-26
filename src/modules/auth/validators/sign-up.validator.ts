import { presenceCost, validate, validateEmailRule } from '~modules/common'
import { ISignUpForm } from '../typing'
const constraints = {
	email: { presence: presenceCost, email: validateEmailRule },
	password: { presence: presenceCost },
	confirmPassword: { presence: presenceCost, equality: 'password' },
}
export const validateSignUp = (data: ISignUpForm) => {
	return validate<any>(data, constraints)
}
