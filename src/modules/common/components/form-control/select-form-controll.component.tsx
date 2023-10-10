import React, { FC, useEffect, useRef, useState } from 'react'
import {
	Animated,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native'
import { IOption } from '~modules/common/typing'
import { Txt } from '../typography'
import { Icon } from '../elements'
import _ from 'lodash'
import { $size } from '~modules/common/helpers'
import { colors } from '~modules/common/theme'
interface IProps {
	options: IOption[]
	onChange: (val: string) => void
	placeholder?: string
	error?: string
	width?: number | string
	space?: number
	style?: ViewStyle
	height?: number
	value?: any
}
export const Select: FC<IProps> = ({
	options,
	onChange,
	placeholder,
	error,
	width,
	space,
	style,
	height = $size(44),
	value,
}) => {
	const animVal = useRef(new Animated.Value(0)).current
	const [open, setOpen] = useState<boolean>(false)
	const toggleOpen = () => {
		setOpen(() => !open)
	}
	const onHandleChange = (val: IOption) => {
		onChange(val.value)
		setOpen(false)
	}

	const interpolate = (outputRange: number[] | string[]) =>
		animVal.interpolate({
			inputRange: [0, 1],
			outputRange,
		})

	useEffect(() => {
		Animated.timing(animVal, {
			toValue: open ? 1 : 0,
			duration: 200,
			useNativeDriver: false,
		}).start()
	}, [open])

	return (
		<View style={style}>
			<>
				<TouchableOpacity activeOpacity={0.5} onPress={toggleOpen}>
					<View
						style={[
							styles.upContainer,
							{ width: width, marginRight: space, height },
						]}>
						<Txt style={!value ? styles.placeholder : styles.value}>
							{!value
								? placeholder
								: _.find(options, it => it.value === value)
										?.label}
						</Txt>
						<Animated.View
							style={{
								transform: [
									{
										rotate: interpolate([
											'0deg',
											'-180deg',
										]),
									},
								],
							}}>
							<Icon
								name="down-open-big"
								size={$size(20)}
								color={colors.primary}
							/>
						</Animated.View>
					</View>
				</TouchableOpacity>
				{error && !open ? (
					<Txt style={styles.error}>{error}</Txt>
				) : null}
			</>
			<Animated.View
				style={{
					maxHeight: interpolate([0, 150]),
					transform: [{ translateY: interpolate([-10, 10]) }],
					opacity: interpolate([0, 1]),
					width: width,
				}}>
				<Animated.View
					style={[
						{ opacity: interpolate([0, 1]), marginBottom: 20 },
						styles.downContaiter,
					]}>
					{options?.map(el => {
						return (
							<Animated.View
								key={el.value}
								style={[
									{
										maxHeight: interpolate([0, 100]),
										opacity: interpolate([0, 1]),
									},
									styles.itemSelect,
								]}>
								<TouchableOpacity
									onPress={() => onHandleChange(el)}>
									<Txt style={styles.txt} mod="sm">
										{el.label}
									</Txt>
								</TouchableOpacity>
							</Animated.View>
						)
					})}
				</Animated.View>
			</Animated.View>
		</View>
	)
}
const styles = StyleSheet.create({
	upContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#FFFF',
		borderRadius: 10,
		paddingHorizontal: $size(15),
		width: $size(165),
		marginRight: $size(15),
		height: $size(60),
		borderWidth: 1,
		borderColor: colors.primary,
	},
	downContaiter: {
		flexDirection: 'column',
		backgroundColor: colors.secondary,
		borderRadius: 10,
		padding: $size(15),
	},
	txt: {
		color: colors.primaryTxt,
		fontWeight: '300',
	},
	value: {
		color: colors.primary,
		fontSize: $size(14),
	},
	itemSelect: {
		paddingVertical: $size(8),
	},
	placeholder: {
		fontWeight: '300',
		letterSpacing: 0.75,
		fontSize: $size(14),
		opacity: 0.5,
	},
	error: {
		color: '#FB5450',
		fontSize: $size(13),
		marginTop: $size(5),
	},
})
