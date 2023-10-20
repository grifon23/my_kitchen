import React, { useState } from 'react'
import { Button, PrimaryHeader, ScreenLayout, Txt } from '~modules/common'
import { TouchableOpacity, View } from 'react-native'
import _ from 'lodash'
import { storageService } from '~modules/common/service'
import { StorageKey } from '~modules/common/typing'
import { ProductEditor, ProductItem } from '~modules/products/components'

export const MyProductScreen = () => {
	const [products, setProducts] = useState<string[]>([])
	const [showForm, setShowForm] = useState(false)
	const [editProduct, setEditProduct] = useState({
		editIndex: null,
		isOpen: false,
		value: '',
	})

	const saveProduct = (val: string) => {
		setProducts([val, ...products])
		setShowForm(false)
	}

	const getEditProduct = (ind: number) => {
		const product = products.find((it, index) => index === ind)
		setEditProduct({ isOpen: true, value: product, editIndex: ind })
	}

	const saveEditProduct = (val: string, index: number) => {
		const copyProducts = _.cloneDeep(products)
		console.log('edit value', val, index)
		copyProducts[index] = val
		setProducts(copyProducts)
		setEditProduct({ isOpen: false, value: '', editIndex: null })
	}

	return (
		<>
			<ScreenLayout
				needScroll={true}
				headerComponent={<PrimaryHeader label="My products" />}>
				<Button
					onPress={() => setShowForm(true)}
					mod="primary"
					txtContent="Add product"
				/>
				{showForm ? <ProductEditor create={saveProduct} /> : null}

				<View>
					{products.map((it, index) => {
						return (
							<ProductItem
								item={it}
								isActive={index === editProduct.editIndex}
								isOpen={editProduct.isOpen}
								editProduct={editProduct}
								createProduct={saveProduct}
								updateProduct={val =>
									saveEditProduct(val, index)
								}
								getEditProduct={() => getEditProduct(index)}
							/>
						)
					})}
				</View>
			</ScreenLayout>
		</>
	)
}
