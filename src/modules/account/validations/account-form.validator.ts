import { presenceCost, validate } from '~modules/common'
import _ from 'lodash'
import { IAccountForm } from '../typing'

const constraints = {
	name: {
		presence: presenceCost,
		format: {
			pattern: /^[^\s]+(\s+[^\s]+)*$/,
			message: '^Name should not start or end with spaces',
		},
	},
	gender: { presence: presenceCost },
	dateOfBirth: {
		presence: presenceCost,
	},
}

export const accountFormValidate = (data: IAccountForm) => {
	return validate<any>(data, constraints)
}
