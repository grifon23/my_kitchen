import React, { FC, useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'
import { Txt } from '~modules/common/components/typography'
import { $size } from '~modules/common/helpers'
import { colors } from '~modules/common/theme'
import { IOption } from '~modules/common/typing'

interface IProps {
	options: IOption[]
	isOpen: boolean
	searchString: string
	onChange: (val: string) => void
}
export const DropdownAtom: FC<IProps> = ({
	options,
	isOpen,
	searchString,
	onChange,
}) => {
	const animVal = useRef(new Animated.Value(0)).current

	const interpolate = (outputRange: number[] | string[]) =>
		animVal.interpolate({
			inputRange: [0, 1],
			outputRange,
		})

	useEffect(() => {
		Animated.timing(animVal, {
			toValue: isOpen ? 1 : 0,
			duration: 200,
			useNativeDriver: false,
		}).start()
	}, [isOpen, searchString])
	return (
		<Animated.View
			style={{
				maxHeight: interpolate([0, 150]),
				transform: [{ translateY: interpolate([-10, 10]) }],
				opacity: interpolate([0, 1]),
				width: '100%',
				position: 'absolute',
				top: 55,
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
								onPress={() => onChange(el.value)}>
								<Txt style={styles.txt} mod="sm">
									{el.label}
								</Txt>
							</TouchableOpacity>
						</Animated.View>
					)
				})}
			</Animated.View>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {},
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
	itemSelect: {
		paddingVertical: $size(8),
	},
})
