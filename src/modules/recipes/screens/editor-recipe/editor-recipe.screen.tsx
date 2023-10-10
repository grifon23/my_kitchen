import React, { useEffect, useMemo } from 'react'
import {
	Button,
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
import { useRoute } from '@react-navigation/native'
import { PreviewIngradients } from '~modules/ingradients/components'

export const EditorRecipeScreen = () => {
	const { params }: any = useRoute()

	const nav = useNav()
	const { data: categories, isLoading: loadCategory } =
		useSelector(selectCategories)
	const form = useForm<ICreateRecipeForm>({}, () => null)

	useEffect(() => {
		if (params?.ingradients) {
			form.setFormField('ingradients', params.ingradients)
		}
	}, [params?.ingradients])

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
			}
			scrollStyle={{
				flexGrow: 1,
				flexDirection: 'column',
				justifyContent: 'space-between',
				paddingBottom: 30,
			}}>
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
					isTexterea={true}
					inputProps={{
						multiline: true,
					}}
				/>

				<PreviewIngradients ingradients={form.values.ingradients} />
			</View>

			<Button
				txtContent={'Save recipe'}
				mod="outline"
				onPress={() => {}}
			/>
		</ScreenLayout>
	)
}
