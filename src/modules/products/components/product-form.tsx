import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, TxtInput, colors } from '~modules/common'
import { IProduct } from '../typing'
interface IProps {
	create: (val: string) => void
	editProduct?: { product: IProduct; isOpen: boolean }
	saveEditProduct?: (val: string) => void
	removeProduct?: () => void
	closeEditor?: () => void
}
export const ProductEditor: FC<IProps> = ({
	create,
	editProduct,
	saveEditProduct,
	removeProduct,
	closeEditor,
}) => {
	const [product, setProduct] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		if (editProduct) setProduct(editProduct.product.name)
	}, [editProduct?.product])

	const handleOnChange = (val: string) => {
		setProduct(val)
		setError('')
	}
	const submit = () => {
		try {
			if (!product) throw new Error('Field is require')
			if (editProduct) {
				saveEditProduct(product)
				setError('')
			} else create(product)
		} catch (error: any) {
			console.log('error editor category', error.message)
			setError(error.message)
		}
	}
	const resetEditor = () => {
		closeEditor()
		setProduct('')
		setError('')
	}

	const handleRemoveProduct = () => {
		if (editProduct) {
			removeProduct()
		} else {
			resetEditor()
		}
	}

	return (
		<View style={styles.container}>
			<TxtInput
				inputProps={{ autoFocus: true }}
				placeholder="Enter product"
				onChange={handleOnChange}
				value={product}
				error={error}
				styleContainer={styles.input}
			/>

			<View style={styles.rowIcon}>
				<Icon
					name="cancel-1"
					onPress={handleRemoveProduct}
					size={20}
					color={colors.errorTxt}
				/>

				<Icon
					name="check"
					onPress={submit}
					size={30}
					color={colors.primary}
					style={styles.checkIcon}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		// marginBottom: 1,
	},
	input: { maxWidth: '80%' },
	rowIcon: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkIcon: {
		marginLeft: 20,
	},
})
