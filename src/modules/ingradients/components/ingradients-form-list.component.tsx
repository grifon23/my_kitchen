import _ from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { Button, useForm, useNav } from '~modules/common'
import { IIngradient } from '~modules/recipes/typing'
import { IngradientRowForm } from './ingradient-row-form.component'
import { StyleSheet, View } from 'react-native'
import { UserRouteKey } from '~modules/root/typing'
import { ingradientValidator } from '../validators'
import { useSelector } from 'react-redux'
import { selectAccount } from '~modules/store/account/selector'

interface IForm {
	ingradients: IIngradient[]
}

interface IProps {
	ingradients: IIngradient[]
	onChange?: (ings: IIngradient[]) => void
}
export const IngradientsListForm: FC<IProps> = ({ ingradients, onChange }) => {
	const { data: account } = useSelector(selectAccount)
	const nav = useNav()
	const form = useForm<IForm>(
		{
			ingradients: [],
		},
		ingradientValidator,
	)
	useEffect(() => {
		if (!_.isEmpty(ingradients) && ingradients) {
			form.setFormField('ingradients', ingradients)
		} else {
			form.setForm({ ingradients: [] })
		}
	}, [ingradients])

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

	const saveIngradients = () => {
		onChange(form.values.ingradients)
	}

	const resetErros = (index: number) => {
		const _errors: any = _.cloneDeep(form.errors)
		_errors[`error_${index}`] = ''
		form.setFormErrors(_errors)
	}

	return (
		<View style={styles.container}>
			<View>
				<Button
					mod="outline"
					txtContent="Add Ingradient"
					onPress={addIngradient}
					style={{ marginBottom: 20 }}
				/>
				{form.values.ingradients.map((it, index) => {
					return (
						<IngradientRowForm
							myProduct={account.myProducts}
							ingradient={it}
							onChangeIngradient={onChangeIngradient}
							remove={() => remove(index)}
							index={index}
							style={{ marginBottom: 10 }}
							errors={form.errors}
						/>
					)
				})}
			</View>

			<Button
				txtContent="Save ingradiens"
				onPress={() => form.onSubmit(saveIngradients)}
				mod="primary"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		flexGrow: 1,
		paddingBottom: 30,
	},
})
