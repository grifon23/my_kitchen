import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
	Button,
	PrimaryHeader,
	ScreenLayout,
	appEvents,
	colors,
	useNav,
} from '~modules/common'
import { Keyboard } from 'react-native'
import _ from 'lodash'
import { ProductEditor, ProductsList } from '~modules/products/components'
import { useSelector } from 'react-redux'
import { selectAccount } from '~modules/store/account/selector'
import { IProduct } from '~modules/products/typing'
import randomstring from 'randomstring'
import { accountService } from '~modules/account/service'

export const MyProductScreen = () => {
	const nav = useNav()
	const { data: account } = useSelector(selectAccount)
	const [products, setProducts] = useState<IProduct[]>(account.myProducts)
	const [showForm, setShowForm] = useState(false)
	const [editProduct, setEditProduct] = useState<{
		isOpen: boolean
		product: IProduct
	}>({
		isOpen: false,
		product: null,
	})

	const generateId = () => {
		return randomstring.generate(7)
	}

	useEffect(() => {
		setProducts(account.myProducts)
	}, [account])

	const createProduct = (val: string) => {
		setProducts([{ name: val, id: generateId() }, ...products])
		setShowForm(false)
	}

	const getEditProduct = (id: string) => {
		const productUpdate = products.find(it => it.id === id)
		setEditProduct({ isOpen: true, product: productUpdate })
	}

	const resetEditProduct = () => {
		setEditProduct({ isOpen: false, product: null })
	}

	const shortAlert = useCallback((message: string) => {
		return appEvents.emit('alert', {
			onPress: () => _.noop,
			btnText: 'Ok',
			buttonType: 'primary',
			message,
		})
	}, [])

	const saveAllChanges = async () => {
		try {
			await accountService.updateMyProducts(account.uuid, products)
			shortAlert('Products successfully saved')
		} catch (error) {
			shortAlert('Oops! Somethig wrong. Try again')
		}
	}

	const saveEditProduct = (val: string) => {
		if (!editProduct.product) return
		accountService.updatePruduct({ name: val, id: editProduct.product.id })
		resetEditProduct()
	}

	const deleteProduct = (id: string) => {
		accountService.removeProduct(id)
		resetEditProduct()
	}

	const deleteProductAlert = useCallback((id: string) => {
		appEvents.emit('alert', {
			message: 'Are you shure delete this product',
			btnText: 'Ok',
			buttonType: 'primary',
			cancelBtnText: 'Close',
			cancelBtnType: 'outline',
			onPress: () => deleteProduct(id),
			onPressCancelBtn: () => {},
		})
		Keyboard.dismiss()
	}, [])

	const formCreateProduct = useMemo(() => {
		if (!showForm) {
			return null
		}
		return (
			<ProductEditor
				create={createProduct}
				closeEditor={() => setShowForm(false)}
			/>
		)
	}, [showForm])

	return (
		<ScreenLayout
			needScroll={true}
			headerComponent={
				<PrimaryHeader
					label="My products"
					onPressLeftIcon={() => nav.goBack()}
					leftIcon="left-open-big"
					colorLeftIcon={colors.secondaryTxt}
				/>
			}>
			<Button
				style={{ marginBottom: 20 }}
				onPress={saveAllChanges}
				mod="primary"
				txtContent="Save all producst"
			/>

			<Button
				style={{ marginBottom: 20 }}
				onPress={() => setShowForm(true)}
				mod="primary"
				txtContent="Add product"
			/>

			{formCreateProduct}
			<ProductsList
				items={products}
				editProduct={editProduct}
				saveProduct={createProduct}
				setEditValue={val => saveEditProduct(val)}
				getEditProduct={getEditProduct}
				deleteProductAlert={deleteProductAlert}
			/>
		</ScreenLayout>
	)
}
