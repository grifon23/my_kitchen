import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
	Button,
	PrimaryHeader,
	ScreenLayout,
	Txt,
	appEvents,
	colors,
	useNav,
} from '~modules/common'
import { Keyboard, TouchableOpacity, View } from 'react-native'
import _ from 'lodash'
import { storageService } from '~modules/common/service'
import { StorageKey } from '~modules/common/typing'
import { ProductEditor, ProductItem } from '~modules/products/components'
import { defaultProductsData } from '~modules/products/config'
import { useSelector } from 'react-redux'
import { selectAccount } from '~modules/store/account/selector'
import { IProduct } from '~modules/products/typing'
import randomstring from 'randomstring'
import { accountService } from '~modules/acount/service'
export const MyProductScreen = () => {
	const nav = useNav()
	const { data: account } = useSelector(selectAccount)
	const [products, setProducts] = useState<IProduct[]>([])
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

	const saveProduct = (val: string) => {
		setProducts([{ name: val, id: generateId() }, ...products])
		setShowForm(false)
	}

	const getEditProduct = (id: string) => {
		const productUpdate = products.find(it => it.id === id)
		setEditProduct({ isOpen: true, product: productUpdate })
	}

	const resetRditProduct = () => {
		setEditProduct({ isOpen: false, product: null })
	}

	const saveAllChanges = async () => {
		try {
			await accountService.updateMyProducts(account.uuid, products)
		} catch (error) {
			console.log('error update products', error)
		}
	}

	const saveEditProduct = (val: string, index: number) => {
		const copyProducts = _.cloneDeep(products)
		copyProducts[index] = { id: editProduct.product.id, name: val }
		setProducts(copyProducts)
		resetRditProduct()
	}

	const memoFormCreateProduct = useMemo(() => {
		if (!showForm) {
			return null
		}
		return (
			<ProductEditor
				create={saveProduct}
				closeEditor={() => setShowForm(false)}
			/>
		)
	}, [showForm])

	const deleteProduct = (id: string) => {
		const copyProducts = _.cloneDeep(account.myProducts)

		const templ = copyProducts.filter(it => id !== it.id)
		console.log('copyProducts', copyProducts.length)
		setProducts(templ)
		resetRditProduct()
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
			{memoFormCreateProduct}
			<View>
				{products.map((it, index) => {
					return (
						<ProductItem
							item={it.name}
							isActive={it.id === editProduct?.product?.id}
							isOpen={editProduct.isOpen}
							editProduct={editProduct}
							createProduct={saveProduct}
							updateProduct={val => saveEditProduct(val, index)}
							getEditProduct={() => getEditProduct(it.id)}
							deleteProduct={() => deleteProductAlert(it.id)}
						/>
					)
				})}
			</View>
		</ScreenLayout>
	)
}
