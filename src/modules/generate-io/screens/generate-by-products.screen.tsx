import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
	Button,
	PrimaryHeader,
	ScreenLayout,
	Txt,
	colors,
	useForm,
	useNav,
} from '~modules/common'
import { ProductRowForm, ProductsListForm } from '../components'
import { IngradientsListForm } from '~modules/ingradients/components'
import { ICreateRecipeForm, IIngradient } from '~modules/recipes/typing'
import { createRecipeValidator } from '~modules/recipes/validators'

export const GenerateByProductsScreen = () => {
	const nav = useNav()
	const form = useForm<ICreateRecipeForm>({}, createRecipeValidator)

	const onChangeIngradients = (val: IIngradient[]) => {
		console.log('submit products', val)
		// form.setFormField('ingradients', val)
	}
	return (
		<ScreenLayout
			needScroll={true}
			headerComponent={
				<PrimaryHeader
					label="Generate recipe by products"
					onPressLeftIcon={() => nav.goBack()}
					leftIcon="left-open-big"
					colorLeftIcon={colors.secondaryTxt}
				/>
			}>
			<ProductsListForm />
		</ScreenLayout>
	)
}

const styles = StyleSheet.create({
	container: {},
})
