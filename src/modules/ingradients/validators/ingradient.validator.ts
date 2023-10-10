import _ from 'lodash'
import { presenceCost, validate } from '~modules/common'

const constraints = {
	name: { presence: presenceCost },
	count: { presence: presenceCost },
	metric: { presence: presenceCost },
}

export const ingradientValidator = (data: any) => {
	const errors: any = _.defaultTo({}, {})
	data.ingradients?.forEach((it: any, index: number) => {
		const error: any = validate(it, constraints)
		if (error) {
			const _key = `error_${index}`
			errors[_key] = 'Fields is required'
		} else null
	})
	return !_.isEmpty(errors) ? errors : null
}
