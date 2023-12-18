import _ from 'lodash'
import React, { FC, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { ErrorTxt, Icon, TxtInput, colors } from '~modules/common'
import { IProduct } from '~modules/products/typing'
import { IIngradient } from '~modules/recipes/typing'

interface IProps {
	onChangeIngradient: (
		index: number,
		key: keyof IIngradient,
		val: string,
	) => void
	ingradient: IIngradient
	index: number
	remove: () => void
	style?: ViewStyle
}
export const ProductRowForm: FC<IProps> = ({
	onChangeIngradient,
	ingradient,
	index,
	remove,
	style,
}) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.row}>
				<TxtInput
					value={ingradient.name}
					onChange={val => onChangeIngradient(index, 'name', val)}
					placeholder="Select ingradient"
					styleContainer={{ maxWidth: '45%' }}
				/>

				<TxtInput
					inputProps={{ keyboardType: 'numeric', maxLength: 4 }}
					value={ingradient.count}
					onChange={val => onChangeIngradient(index, 'count', val)}
					styleContainer={{ maxWidth: '17%' }}
					placeholder={'0'}
				/>

				<TxtInput
					inputProps={{ maxLength: 4 }}
					value={ingradient.metric}
					onChange={val => onChangeIngradient(index, 'metric', val)}
					styleContainer={{ maxWidth: '20%' }}
					placeholder="Mtr"
				/>
				<View style={{ maxWidth: '10%' }}>
					<Icon
						name="cancel"
						size={30}
						color={colors.errorTxt}
						onPress={remove}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	container: {
		flexDirection: 'column',
	},
})
