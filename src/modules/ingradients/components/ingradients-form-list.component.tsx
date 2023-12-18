import _ from 'lodash'
import React, { FC, useEffect } from 'react'
import { Button, useNav } from '~modules/common'
import { IIngradient } from '~modules/recipes/typing'
import { IngradientRowForm } from './ingradient-row-form.component'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectAccount } from '~modules/store/account/selector'
import { useEditorIngradients } from '../hooks'

interface IProps {
	ingradients: IIngradient[]
	onChange?: (ings: IIngradient[]) => void
}

export const IngradientsListForm: FC<IProps> = ({ ingradients, onChange }) => {
	const { data: account } = useSelector(selectAccount)
	const nav = useNav()

	const {
		items,
		addIngradient,
		remove,
		onChangeIngradient,
		errors,
		onSubmit,
		setIngradients,
	} = useEditorIngradients()

	useEffect(() => {
		if (!_.isEmpty(ingradients) && ingradients) {
			setIngradients(ingradients)
		} else {
			setIngradients([])
		}
	}, [ingradients])

	const saveIngradients = () => {
		onChange(items)
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
				{items.map((it, index) => {
					return (
						<IngradientRowForm
							myProduct={account.myProducts}
							ingradient={it}
							onChangeIngradient={onChangeIngradient}
							remove={() => remove(index)}
							index={index}
							style={{ marginBottom: 10 }}
							errors={errors}
						/>
					)
				})}
			</View>

			<Button
				txtContent="Save ingradiens"
				onPress={() => onSubmit(saveIngradients)}
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
