import _ from 'lodash'
import moment from 'moment'
import _validate from 'validate.js'
export const prepareValidatorResult = <T extends Record<string, any>>(
	result: T,
): Record<keyof T, string> | null => {
	if (_.isEmpty(result)) return null
	_.each(result, (it, key, arr: any) => {
		arr[key] = it[0]
	})
	return result
}
_validate.extend(_validate.validators.datetime, {
	parse: function (value: any) {
		console.log('parse', value, +moment.utc(value))
		return +moment.utc(value)
	},
	format: function (value: any, options: any) {
		const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss'
		return moment.utc(value).format(format)
	},
})
const presenceCost = {
	allowEmpty: false,
	message: '^Field is required',
	meessageStatic: 'Field is required',
}
const validateEmailRule = {
	message: '^Email is invalid',
}
const validateMobile = {
	pattern: '^[0-9]+$',
	message: '^Mobile number is invalid. Only numbers allowed',
}
const validatePasswordRule = {
	pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$',
	message: '^Password is not valid',
}
const validate = <T extends Record<string, any>>(
	values: T,
	constraints: any,
) => {
	const result = _validate(values, constraints)
	return prepareValidatorResult<T>(result)
}
_validate.validators.array = (
	arrayItems: any[],
	options: { length: number; message: string; key?: string },
) => {
	if (_.isEmpty(arrayItems)) return presenceCost.message
	if (arrayItems.length < options.length) return options.message
	if (options.key) if (!arrayItems[0][options.key]) return options.message
	return null
}
_validate.validators.characters = (
	value: string,
	options: {
		message: string
	},
) => {
	if (String(value).search(/[^a-zA-Zа-яА-я0-9а-яієїйьЇІ"'.)(, -]+/) !== -1)
		return options.message
			? options.message
			: '^common.validations.characters'
	return null
}
const isValidEmail = (email: string) => {
	return /\S+@\S+\.\S+/.test(email)
}
export {
	validate,
	presenceCost,
	validateEmailRule,
	validatePasswordRule,
	validateMobile,
	isValidEmail,
}
