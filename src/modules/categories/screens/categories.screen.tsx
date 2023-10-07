import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
	appEvents,
	Button,
	colors,
	PrimaryHeader,
	ScreenLayout,
	useNav,
} from '~modules/common'
import { Categories, CategoryEditor } from '../components'

import _ from 'lodash'
import { categoryService } from '../service'
import { useSelector } from 'react-redux'
import { selectCategories } from '~modules/store/categories/selector'
import { UserRouteKey } from '~modules/root/typing'
import { Loader } from '~modules/common/components/elements/loader.element'

export const CategoriesScreen = () => {
	const nav = useNav()
	const { data: list, isLoading } = useSelector(selectCategories)
	const [isOpenEditor, setIsOpenEditor] = useState(false)
	const [categoryId, setCategoryId] = useState<string>(null)

	const onClose = () => {
		setIsOpenEditor(false)
		setCategoryId(null)
	}

	const openEditor = () => {
		setIsOpenEditor(true)
	}

	const editCategory = (id: string) => {
		setCategoryId(id)
		openEditor()
	}
	const getCategories = async () => {
		try {
			await categoryService.loadCategories()
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		getCategories()
	}, [])

	const removeCategory = async (id: string) => {
		try {
			await categoryService.deleteCategory(id)
		} catch (error) {
			console.log('error remove category')
		}
	}

	const alertRemoveCategory = (id: string) => {
		appEvents.emit('alert', {
			onPress: async () => removeCategory(id),
			btnText: 'Ok',
			icon: 'trash',
			buttonType: 'primary',
			message: 'Are you sure delete category with all recipes?',
		})
	}

	const goDetailCategory = (id: string) => {
		nav.navigate(UserRouteKey.Recipes, { categoryId: id })
	}

	if (isLoading) return <Loader />
	return (
		<>
			<ScreenLayout
				horizontalPadding={0}
				needScroll={false}
				viewStyle={{ flexGrow: 1 }}
				headerComponent={<PrimaryHeader label="Categories" />}>
				<View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
					<Button
						mod="outline"
						onPress={openEditor}
						txtContent="Add category"
					/>
				</View>

				<Categories
					list={list}
					openEditor={editCategory}
					removeCategory={alertRemoveCategory}
					goDetailCategory={goDetailCategory}
				/>
			</ScreenLayout>
			<CategoryEditor
				isOpen={isOpenEditor}
				close={onClose}
				categoryId={categoryId}
			/>
		</>
	)
}
