import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
	appEvents,
	Button,
	Loader,
	PrimaryHeader,
	ScreenLayout,
} from '~modules/common'
import { Categories, CategoryEditor } from '../components'

import { ICategory } from '../typing'
import _ from 'lodash'
import { categoryService } from '../service'

export const CategoriesScreen = () => {
	const [isOpenEditor, setIsOpenEditor] = useState(false)
	const [list, setList] = useState<ICategory[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [categoryId, setCategoryId] = useState<string>(null)

	const onClose = () => {
		setIsOpenEditor(false)
		setCategoryId(null)
		getCategories()
	}

	const openEditor = (id?: string) => {
		setIsOpenEditor(true)
		setCategoryId(id)
	}

	const getCategories = async () => {
		setIsLoading(true)
		try {
			const categories = await categoryService.getCategories()
			setList(categories)
		} catch (error) {
			console.log('error', error)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		getCategories()
	}, [])

	const removeCategory = async (id: string) => {
		try {
			await categoryService.deleteCategory(id)
			getCategories()
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
					openEditor={openEditor}
					removeCategory={alertRemoveCategory}
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
