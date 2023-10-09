import _ from 'lodash'
import React, { FC, useMemo, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { colors, Icon, Txt, TxtInput } from '~modules/common'
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
	errors: any
}
export const IngradientForm: FC<IProps> = ({
	onChangeIngradient,
	ingradient,
	index,
	remove,
	style,
	errors,
}) => {
	const getErrors = (name: keyof IIngradient) => {
		const _errors = _.cloneDeep(errors)
		return _errors[`index_${index}_${name}`]
	}
	return (
		<>
			<View style={[styles.container, style]}>
				<TxtInput
					inputProps={{
						maxLength: 20,
					}}
					onChange={val => onChangeIngradient(index, 'name', val)}
					value={ingradient.name}
					placeholder="Ingradient"
					styleContainer={{ maxWidth: '45%' }}
					error={getErrors('name')}
				/>

				<TxtInput
					inputProps={{ keyboardType: 'numeric', maxLength: 4 }}
					value={ingradient.count}
					onChange={val => onChangeIngradient(index, 'count', val)}
					styleContainer={{ maxWidth: '17%' }}
					placeholder={'0'}
					error={getErrors('count')}
				/>

				<TxtInput
					inputProps={{ maxLength: 4 }}
					value={ingradient.metric}
					onChange={val => onChangeIngradient(index, 'metric', val)}
					styleContainer={{ maxWidth: '20%' }}
					placeholder="Mtr"
					error={getErrors('metric')}
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
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})
