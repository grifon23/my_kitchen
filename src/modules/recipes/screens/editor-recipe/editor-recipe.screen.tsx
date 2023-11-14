import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Drawer from 'react-native-drawer'
import {
	Button,
	FormControllSelect,
	Loader,
	PrimaryHeader,
	ScreenLayout,
	TxtInput,
	appEvents,
	colors,
	gcService,
	useForm,
	useNav,
	Checkbox,
} from '~modules/common'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectCategories } from '~modules/store/categories/selector'
import _ from 'lodash'
import {
	ICreateRecipeForm,
	IIngradient,
	IRecipe,
} from '~modules/recipes/typing'
import { useIsFocused, useRoute } from '@react-navigation/native'
import {
	IngradientsListForm,
	PreviewIngradients,
} from '~modules/ingradients/components'
import { recipesService } from '~modules/recipes/service'
import { UserRouteKey } from '~modules/root/typing'
import { createRecipeValidator } from '~modules/recipes/validators'
import { selectRecipeById } from '~modules/store/recipes/selector'
import { Store } from '~modules/store/typing'
import { StyleSheet } from 'react-native'

export const EditorRecipeScreen = () => {
	const { params }: any = useRoute()
	const nav = useNav()
	const drawerRef = useRef(null)
	const isFocused = useIsFocused()

	const [recipe, setRecipe] = useState<IRecipe>(null)
	const [isLoading, setIsLoading] = useState(false)
	const { data: categories, isLoading: loadCategory } =
		useSelector(selectCategories)

	const form = useForm<ICreateRecipeForm>({}, createRecipeValidator)

	const loadRecipe = async (id: string) => {
		setIsLoading(true)
		try {
			const resp: any = await recipesService.getDetailedRecipe(id)
			setRecipe(resp)
		} catch (error) {
			console.log('error', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (!params?.id) return
		loadRecipe(params?.id)
	}, [params])

	const openDrawer = () => {
		drawerRef.current?.open()
	}

	const closeDrawer = () => {
		drawerRef.current?.close()
	}

	const onChangeIngradients = (val: IIngradient[]) => {
		form.setFormField('ingradients', val)
		closeDrawer()
	}

	const resetForm = () => {
		const keys = _.keys(form.values)
		keys.forEach((it: any) => {
			form.setFormField(it, '')
		})
	}

	useEffect(() => {
		if (!params?.id) {
			resetForm()
			return
		} else {
			const prepareData: any = _.omit(recipe, ['id'])
			form.setForm(prepareData)
		}
	}, [params?.id, isFocused, isLoading, recipe])

	const onChange = (key: keyof ICreateRecipeForm, val: string) => {
		form.setFormField(key, val)
	}

	const optionsCategory = useMemo(() => {
		if (!_.isEmpty(categories))
			return categories.map(it => {
				return { value: it.id, label: it.name }
			})
	}, [categories, loadCategory])

	const successAlert = useCallback((message: string) => {
		return appEvents.emit('alert', {
			onPress: () => nav.navigate(UserRouteKey.Home),
			btnText: 'Ok',
			buttonType: 'primary',
			message,
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

			successAlert('Recipe successfuly create')
		} catch (error) {
			errorAlert()
		}
	}

	const updateRecipe = async (id: string) => {
		try {
			const dataToSave = {
				...form.values,
				isFavorite: false,
			}
			await recipesService.updateRecipe(id, dataToSave)
			resetForm()
			successAlert('Recipe successfuly update')
			gcService.set('recipeId', null)
		} catch (error) {
			errorAlert()
		}
	}

	const submit = () => {
		if (params?.id) updateRecipe(params?.id)
		else createRecipe()
	}

	const memoTitleScreen = useMemo(() => {
		if (params?.id) return 'Edit recipe'
		else return 'Create recipe'
	}, [params?.id])

	const onChangeIsPublic = () => {
		if (form.values.isPublic) {
			form.setFormField('isPublic', false)
		} else {
			form.setFormField('isPublic', true)
		}
	}
	if (isLoading) return <Loader />

	return (
		<Drawer
			side="right"
			ref={drawerRef}
			content={
				<ScreenLayout
					needScroll={true}
					scrollStyle={{ flexGrow: 1 }}
					headerComponent={
						<PrimaryHeader
							label="Ingradients recipe"
							leftIcon="left-open-big"
							colorLeftIcon={colors.secondaryTxt}
							onPressLeftIcon={closeDrawer}
						/>
					}>
					<IngradientsListForm
						ingradients={form.values.ingradients}
						onChange={val => onChangeIngradients(val)}
					/>
				</ScreenLayout>
			}>
			<ScreenLayout
				needScroll={true}
				headerComponent={
					<PrimaryHeader
						label={memoTitleScreen}
						leftIcon="left-open-big"
						onPressLeftIcon={() => nav.goBack()}
					/>
				}
				scrollStyle={styles.container}>
				<View>
					<View style={styles.publicCheckbox}>
						<Checkbox
							onChange={onChangeIsPublic}
							label={'Public recipe'}
							isActive={form.values.isPublic}
						/>
					</View>

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
						openDrawer={openDrawer}
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
		</Drawer>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingBottom: 30,
	},
	publicCheckbox: {
		marginLeft: 'auto',
	},
})
