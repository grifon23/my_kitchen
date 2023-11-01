import { presenceCost, validate } from '~modules/common'
import _ from 'lodash'
import { IAccountForm } from '../typing'

const constraints = {
	// date: { presence: presenceCost },
	// departureTime: {
	// 	presence: presenceCost,
	// 	length: {
	// 		minimum: 5,
	// 		message: '^Departure time must be format hh:mm',
	// 		tokenizer: (val: number) => {
	// 			return String(val)
	// 		},
	// 	},
	// },
	// from: { presence: presenceCost },
	// to: { presence: presenceCost },
	// reason: { presence: presenceCost },
}

export const accountFormValidate = (data: IAccountForm) => {
	return validate<any>(data, constraints)
}
