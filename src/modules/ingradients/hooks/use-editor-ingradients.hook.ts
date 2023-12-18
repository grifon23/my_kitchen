import { useForm } from '~modules/common'
import { IIngradient } from '~modules/recipes/typing'
import { ingradientValidator } from '../validators'
import _ from 'lodash'

interface IForm {
	ingradients: IIngradient[]
}

export const useEditorIngradients = () => {
	const form = useForm<IForm>(
		{
			ingradients: [],
		},
		ingradientValidator,
	)

	const onChangeIngradient = (
		index: number,
		key: keyof IIngradient,
		val: string,
	) => {
		const _ingradients = _.cloneDeep(form.values.ingradients)
		_ingradients[index][key] = val
		form.setFormField('ingradients', _ingradients)
		resetErros(index)
	}

	const addIngradient = () => {
		const emptyIngradient: IIngradient = {
			name: '',
			count: '',
			metric: '',
		}
		const _ingradients = _.cloneDeep(form.values.ingradients)
		_ingradients.push(emptyIngradient)
		form.setFormField('ingradients', _ingradients)
	}

	const remove = (ind: number) => {
		const _ingradients = _.cloneDeep(form.values.ingradients)
		const templ = _ingradients.filter((_, index: number) => index !== ind)
		form.setFormField('ingradients', templ)
	}

	const resetErros = (index: number) => {
		const _errors: any = _.cloneDeep(form.errors)
		_errors[`error_${index}`] = ''
		form.setFormErrors(_errors)
	}

	return {
		items: form.values.ingradients,
		setIngradients: (val: IIngradient[]) =>
			form.setFormField('ingradients', val),
		addIngradient,
		remove,
		onChangeIngradient,
		resetErros,
		errors: form.errors,
		onSubmit: form.onSubmit,
	}
}
