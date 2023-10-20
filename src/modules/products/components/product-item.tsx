import React, { FC, useMemo } from 'react'
import { IProduct } from '../typing'
import { ProductEditor } from './product-form'
import { TouchableOpacity } from 'react-native'
import { Txt } from '~modules/common'

interface IProps {
	isOpen: boolean
	isActive: boolean
	editProduct: { value: string; isOpen: boolean }
	createProduct: (val: string) => void
	updateProduct: (val: string) => void
	getEditProduct: () => void
	item: string
}

export const ProductItem: FC<IProps> = ({
	isActive,
	isOpen,
	editProduct,
	createProduct,
	updateProduct,
	getEditProduct,
	item,
}) => {
	const memoProductItem = useMemo(() => {
		if (isOpen && isActive) {
			return (
				<ProductEditor
					editProduct={editProduct}
					create={createProduct}
					saveEditProduct={updateProduct}
				/>
			)
		} else {
			return (
				<TouchableOpacity onPress={getEditProduct}>
					<Txt>{item}</Txt>
				</TouchableOpacity>
			)
		}
	}, [isOpen, isActive, item, editProduct])

	return <>{memoProductItem}</>
}
