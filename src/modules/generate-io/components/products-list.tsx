import React, { FC, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from '~modules/common'
import { useEditorIngradients } from '~modules/ingradients/hooks'
import { ProductRowForm } from './product-row-form'
import _ from 'lodash'
import { IIngradient } from '~modules/recipes/typing'

export const ProductsListForm: FC = () => {
	const {
		items: ingradients,
		addIngradient,
		remove,
		onChangeIngradient,
	} = useEditorIngradients()

	const saveIngradients = () => {
		console.log('ingradients', ingradients)
	}
	const makeGenerate = (list: IIngradient[]) => {
		return _.some(list, obj => _.some(obj, _.isEmpty))
	}
	const isDisabled = makeGenerate(ingradients)

	const ganerateRecipe = useMemo(() => {
		if (_.isEmpty(ingradients)) return null
		return (
			<Button
				disable={isDisabled}
				txtContent="Save ingradiens"
				onPress={saveIngradients}
				mod="primary"
			/>
		)
	}, [ingradients, isDisabled])

	return (
		<View style={styles.container}>
			<View>
				<Button
					mod="outline"
					txtContent="Add Ingradient"
					onPress={addIngradient}
					style={{ marginBottom: 20 }}
				/>
				<>
					{ingradients.map((it, index) => {
						return (
							<ProductRowForm
								ingradient={it}
								onChangeIngradient={onChangeIngradient}
								remove={() => remove(index)}
								index={index}
								style={{ marginBottom: 10 }}
							/>
						)
					})}
				</>

				<>{ganerateRecipe}</>
			</View>
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
