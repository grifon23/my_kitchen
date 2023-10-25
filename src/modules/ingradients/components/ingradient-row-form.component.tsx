import _ from 'lodash'
import React, { FC, useMemo, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import {
	colors,
	ErrorTxt,
	FormControllSelect,
	Icon,
	SearchFormControll,
	SelectAutoComplete,
	Txt,
	TxtInput,
} from '~modules/common'
import { IIngradient } from '~modules/recipes/typing'
import { ingradientsData } from '../config'

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
export const IngradientRowForm: FC<IProps> = ({
	onChangeIngradient,
	ingradient,
	index,
	remove,
	style,
	errors,
}) => {
	const getErrors = () => {
		const _errors = _.cloneDeep(errors)
		return _errors[`error_${index}`]
	}

	return (
		<View style={[styles.container, style]}>
			<View style={styles.row}>
				<FormControllSelect
					onSelect={val =>
						onChangeIngradient(index, 'name', val.value)
					}
					selected={ingradient.name}
					options={ingradientsData.map(it => {
						return { label: it, value: it }
					})}
					placeholder="Select ingradient"
					style={{ maxWidth: '45%' }}
					mb={0}
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
			<ErrorTxt error={getErrors()} />
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
