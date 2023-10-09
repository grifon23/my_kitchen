import React, { useMemo } from 'react'
import {
	PrimaryHeader,
	ScreenLayout,
	Select,
	TxtInput,
	useForm,
	useNav,
} from '~modules/common'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectCategories } from '~modules/store/categories/selector'
import _ from 'lodash'
import { ICreateRecipeForm } from '~modules/recipes/typing'
import { IngradientAtom, ListIngradientAtom } from './atoms'

export const EditorRecipeScreen = () => {
	const nav = useNav()
	const { data: categories, isLoading: loadCategory } =
		useSelector(selectCategories)
	const form = useForm<ICreateRecipeForm>(
		{ ingradients: [{ name: '', count: '', metric: '' }] },
		() => null,
	)
	const onChange = (key: keyof ICreateRecipeForm, val: string) => {
		form.setFormField(key, val)
	}
	const optionsCategory = useMemo(() => {
		if (!_.isEmpty(categories))
			return categories.map(it => {
				return { value: it.id, label: it.name }
			})
	}, [categories, loadCategory])
	console.log('values', form.values)

	return (
		<ScreenLayout
			needScroll={true}
			headerComponent={
				<PrimaryHeader
					label="Create recipe"
					leftIcon="left-open-big"
					onPressLeftIcon={() => nav.goBack()}
				/>
			}>
			<View>
				<Select
					value={form.values.categoryId}
					onChange={val => onChange('categoryId', val)}
					options={optionsCategory}
					placeholder={'Select category'}
					error={form.errors.categoryId}
					height={60}
					style={{ marginBottom: 20 }}
				/>
				<TxtInput
					label="Recipe name"
					value={form.values.name}
					onChange={val => onChange('name', val)}
					placeholder={'Enter name recipe'}
					error={form.errors.name}
					styleContainer={{ marginBottom: 20 }}
				/>

				<TxtInput
					label="Description recipe"
					value={form.values.description}
					onChange={val => onChange('description', val)}
					placeholder={'Enter description recipe'}
					error={form.errors.description}
					styleContainer={{ marginBottom: 20 }}
				/>
				<ListIngradientAtom
					ingradients={form.values.ingradients}
					onChange={val => form.setFormField('ingradients', val)}
				/>
			</View>
		</ScreenLayout>
	)
}
