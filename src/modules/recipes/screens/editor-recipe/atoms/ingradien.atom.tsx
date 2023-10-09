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
	onPress: () => void
	ingradient: IIngradient
	index: number
	remove: () => void
	style?: ViewStyle
}
export const IngradientAtom: FC<IProps> = ({
	onChangeIngradient,
	onPress,
	ingradient,
	index,
	remove,
	style,
}) => {
	const memoActionsIngradient = useMemo(() => {
		if (!_.values(ingradient).every(it => it) ?? index > 0) {
			return (
				<Icon
					name="plus-circled"
					size={30}
					color={colors.primary}
					onPress={onPress}
				/>
			)
		} else {
			return (
				<Icon
					name="cancel"
					size={30}
					color={colors.errorTxt}
					onPress={remove}
				/>
			)
		}
	}, [ingradient])
	return (
		<View style={[styles.container, style]}>
			<TxtInput
				inputProps={{
					maxLength: 20,
				}}
				onChange={val => onChangeIngradient(index, 'name', val)}
				value={ingradient.name}
				placeholder="Ingradient"
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
			<View style={{ maxWidth: '10%' }}>{memoActionsIngradient}</View>
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
