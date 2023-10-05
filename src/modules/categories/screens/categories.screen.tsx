import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, PrimaryHeader, ScreenLayout } from '~modules/common'
import { Categories, Category, CategoryEditor } from '../components'
import firestore from '@react-native-firebase/firestore'

import { ICategory } from '../typing'
import _ from 'lodash'
import { categoriesApi } from '../api'

export const CategoriesScreen = () => {
	const [isOpenEditor, setIsOpenEditor] = useState(false)
	const [list, setList] = useState<ICategory[]>([])
	const onClose = () => {
		setIsOpenEditor(false)
	}

	const openEditor = () => {
		setIsOpenEditor(true)
	}

	const getCategories = async () => {
		try {
			const categories: any = []

			const collection = await categoriesApi.getCategoriesReq()
			console.log('collection', collection)
			collection.forEach(it => {
				categories.push({ id: it.id, ...it.data() })
			})
			setList(categories)
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		getCategories()
	}, [])
	console.log('list', list)
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

				<Categories list={list} />
			</ScreenLayout>
			<CategoryEditor isOpen={isOpenEditor} close={onClose} />
		</>
	)
}
