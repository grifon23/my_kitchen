import _ from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { Button, useForm, useNav } from '~modules/common'
import { IIngradient } from '~modules/recipes/typing'
import { IngradientForm } from './ingradient.component'
import { StyleSheet, View } from 'react-native'
import { UserRouteKey } from '~modules/root/typing'
import { ingradientValidator } from '../validators'

interface IForm {
	ingradients: IIngradient[]
}

interface IProps {
	ingradients: IIngradient[]
}
export const IngradientsListForm: FC<IProps> = ({ ingradients }) => {
	const nav = useNav()
	const form = useForm<IForm>(
		{
			ingradients: [],
		},
		ingradientValidator,
	)

	useEffect(() => {
		if (!_.isEmpty(ingradients)) {
			form.setFormField('ingradients', ingradients)
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
		nav.navigate(UserRouteKey.EditorRecipe, {
			ingradients: form.values.ingradients,
		})
	}

	console.log('errors', form.errors)
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
						<IngradientForm
							ingradient={it}
							onChangeIngradient={onChangeIngradient}
							remove={() => remove(index)}
							index={index}
							style={{ marginBottom: 20 }}
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
