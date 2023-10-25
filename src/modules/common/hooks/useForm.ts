import _ from 'lodash'
import { useState } from 'react'
export interface IUseFormState {
	[key: string]: string | number | boolean | any
}
type IValidateMethod<T> = (data: T) => FormErrors<T> | null
export type FormErrors<T> = Partial<Record<keyof T, string>>
export interface IForm<T> {
	values: T
	setForm: (form: T) => void
	errors: FormErrors<T>
	setFormField: (key: keyof T, value: any) => any
	setFormError: (key: keyof T, error: string) => void
	setFormErrors: (errors: Record<keyof T, string>) => void
	onSubmit: (callback: Function) => Function
	hasErros: Boolean
}
export const useForm = <T extends IUseFormState>(
	initValue: Partial<T>,
	validateMethod: IValidateMethod<T>,
): IForm<T> => {
	const [values, setForm] = useState(initValue as T)
	const [errors, setErrors] = useState<FormErrors<T>>({})
	const setFormError = (f: keyof T, e: any) => {
		setErrors(oldErrors => {
			return { ...oldErrors, [f]: e }
		})
	}
	const setFormField = (f: keyof T, v: any) => {
		setForm(oldForm => {
			return { ...oldForm, [f]: v }
		})
		setFormError(f, null)
	}
	const validate = () => {
		const _errors = validateMethod(values)
		if (_errors) {
			setErrors(_errors)
			return true
		}
	}
	const onSubmit = (callback: Function): any => {
		if (validate && validate()) return
		callback()
	}
	return {
		values,
		setForm,
		errors,
		setFormField,
		setFormError,
		setFormErrors: setErrors,
		onSubmit,
		hasErros: !_.isEmpty(_.omitBy(errors, _.isNil)),
	}
}
