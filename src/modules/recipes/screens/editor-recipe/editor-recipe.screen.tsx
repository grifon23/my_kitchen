import React, { useCallback, useEffect, useMemo } from 'react'
import {
	Button,
	FormControllSelect,
	PrimaryHeader,
	ScreenLayout,
	TxtInput,
	appEvents,
	useForm,
	useNav,
} from '~modules/common'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectCategories } from '~modules/store/categories/selector'
import _ from 'lodash'
import { ICreateRecipeForm } from '~modules/recipes/typing'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { PreviewIngradients } from '~modules/ingradients/components'
import { recipesService } from '~modules/recipes/service'
import { UserRouteKey } from '~modules/root/typing'
import { createRecipeValidator } from '~modules/recipes/validators'

export const EditorRecipeScreen = () => {
	const { params }: any = useRoute()
	const isFocused = useIsFocused()
	const nav = useNav()
	const { data: categories, isLoading: loadCategory } =
		useSelector(selectCategories)
	const form = useForm<ICreateRecipeForm>({}, createRecipeValidator)

	const resetForm = () => {
		const keys = _.keys(form.values)
		keys.forEach((it: any) => {
			form.setFormField(it, '')
		})
	}

	// useEffect(() => {
	// 	if (!isFocused) {
	// 		setTimeout(() => resetForm(), 5000)
	// 	}
	// }, [isFocused])

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

	const successAlert = useCallback(() => {
		return appEvents.emit('alert', {
			onPress: () => nav.navigate(UserRouteKey.Home),
			btnText: 'Ok',
			buttonType: 'primary',
			message: 'Recipe successfuly create',
		})
	}, [])

	const errorAlert = useCallback(() => {
		return appEvents.emit('alert', {
			onPress: _.noop,
			btnText: 'Close',
			buttonType: 'primary',
			message: 'Somthing wrong, try later',
		})
	}, [])

	const createRecipe = async () => {
		try {
			const dataToSave = {
				...form.values,
				isFavorite: false,
			}
			await recipesService.createRecipe(dataToSave)
			resetForm()
			successAlert()
		} catch (error) {
			errorAlert()
		}
	}

	const submit = async () => {
		createRecipe()
	}

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
				<FormControllSelect
					label="Category"
					selected={form.values.categoryId}
					onSelect={val => onChange('categoryId', val.value)}
					options={optionsCategory}
					placeholder={'Select category'}
					error={form.errors.categoryId}
					mb={20}
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

				<PreviewIngradients
					error={form.errors.ingradients}
					ingradients={form.values.ingradients}
				/>
			</View>

			<Button
				txtContent={'Save recipe'}
				mod="outline"
				onPress={() => form.onSubmit(submit)}
			/>
		</ScreenLayout>
	)
}
