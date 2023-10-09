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
		_.keys(error).map(key => {
			const _key = `index_${index}_${key}`
			errors[_key] = error[key]
		})
	})
	return !_.isEmpty(errors) ? errors : null
}
