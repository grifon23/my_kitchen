import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, TxtInput, colors } from '~modules/common'
interface IProps {
	create: (val: string) => void
	editProduct?: { value: string; isOpen: boolean }
	saveEditProduct?: (val: string) => void
}
export const ProductEditor: FC<IProps> = ({
	create,
	editProduct,
	saveEditProduct,
}) => {
	const [product, setProduct] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		if (editProduct) setProduct(editProduct.value)
	}, [editProduct?.value])

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

	return (
		<View style={styles.container}>
			<TxtInput
				placeholder="Enter product"
				onChange={handleOnChange}
				value={product}
				error={error}
				styleContainer={{ marginVertical: 20, maxWidth: '90%' }}
			/>
			<Icon
				name="check"
				onPress={submit}
				size={30}
				color={colors.primary}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})
