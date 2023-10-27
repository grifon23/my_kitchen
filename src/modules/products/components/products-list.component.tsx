import React, { FC } from 'react'
import { IProduct } from '../typing'
import { View } from 'react-native'
import { ProductItem } from './product-item'

interface IProps {
	items: IProduct[]
	editProduct: {
		isOpen: boolean
		product: IProduct
	}
	saveProduct: (val: string) => void
	getEditProduct: (id: string) => void
	deleteProductAlert: (id: string) => void
	setEditValue: (val: string) => void
}
export const ProductsList: FC<IProps> = ({
	items,
	editProduct,
	saveProduct,
	getEditProduct,
	deleteProductAlert,
	setEditValue,
}) => {
	return (
		<View>
			{items.map((it, index) => {
				return (
					<ProductItem
						item={it?.name}
						isActive={it?.id === editProduct?.product?.id}
						isOpen={editProduct?.isOpen}
						editProduct={editProduct}
						createProduct={saveProduct}
						updateProduct={val => setEditValue(val)}
						getEditProduct={() => getEditProduct(it?.id)}
						deleteProduct={() => deleteProductAlert(it?.id)}
					/>
				)
			})}
		</View>
	)
}
