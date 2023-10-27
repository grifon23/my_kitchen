import React, { FC, useMemo } from 'react'
import { IProduct } from '../typing'
import { ProductEditor } from './product-form'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Txt } from '~modules/common'

interface IProps {
	isOpen: boolean
	isActive: boolean
	editProduct: { product: IProduct; isOpen: boolean }
	createProduct: (val: string) => void
	updateProduct: (val: string) => void
	getEditProduct: () => void
	item: string
	deleteProduct: () => void
}

export const ProductItem: FC<IProps> = ({
	isActive,
	isOpen,
	editProduct,
	createProduct,
	updateProduct,
	getEditProduct,
	deleteProduct,
	item,
}) => {
	const memoProductItem = useMemo(() => {
		if (isOpen && isActive) {
			return (
				<ProductEditor
					editProduct={editProduct}
					create={createProduct}
					saveEditProduct={updateProduct}
					removeProduct={deleteProduct}
				/>
			)
		} else {
			return (
				<TouchableOpacity
					onPress={getEditProduct}
					style={styles.itemProduct}>
					<Txt mod="lg">{item}</Txt>
				</TouchableOpacity>
			)
		}
	}, [isOpen, isActive, item, editProduct])

	return <>{memoProductItem}</>
}

const styles = StyleSheet.create({
	itemProduct: {
		paddingVertical: 4,
	},
})
