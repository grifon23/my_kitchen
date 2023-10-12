import React, { FC } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import { colors } from '~modules/common/theme'
import { Icon } from '../../elements'

interface IProps {
	itemIndex: any
	swipeRef: any
	openPopup: () => void
	children: JSX.Element
	openEdit: () => void
}

export const SwipableRow: FC<IProps> = ({
	itemIndex,
	swipeRef,
	openPopup,
	children,
	openEdit,
}) => {
	const rightSwipe = (progress: any, dragX: any) => {
		const progr = progress
		const trans = dragX.interpolate({
			inputRange: [0, 50, 100, 101],
			outputRange: [0, 10, 0, 1],
		})
		return (
			<View style={{ paddingRight: 0 }}>
				<Animated.View
					style={[
						styles.rightSwipe,
						{ transform: [{ translateX: trans }] },
					]}>
					<Icon
						name="trash"
						size={25}
						color={colors.errorTxt}
						style={{ height: 30 }}
					/>
				</Animated.View>
			</View>
		)
	}

	const leftSwipe = (progress: any, dragX: any) => {
		const progr = progress
		const trans = dragX.interpolate({
			inputRange: [0, 80, 100, 101],
			outputRange: [0, 10, 0, 1],
		})
		return (
			<View style={{ paddingLeft: 0 }}>
				<Animated.View
					style={[
						styles.leftSwipe,
						{ transform: [{ translateX: trans }] },
					]}>
					<Icon
						name="info"
						size={25}
						color={colors.primary}
						style={{ height: 30 }}
					/>
				</Animated.View>
			</View>
		)
	}

	const acrionDirectionSwipe = (direction: 'left' | 'right') => {
		if (direction === 'left') openEdit()
		else openPopup()
	}
	return (
		<Swipeable
			useNativeAnimations
			ref={ref => (swipeRef[itemIndex] = ref)}
			childrenContainerStyle={{ overflow: 'hidden' }}
			renderRightActions={rightSwipe}
			renderLeftActions={leftSwipe}
			overshootRight={false}
			overshootLeft={false}
			friction={3}
			onSwipeableOpen={acrionDirectionSwipe}
			rightThreshold={40}>
			{children}
		</Swipeable>
	)
}

const styles = StyleSheet.create({
	rightSwipe: {
		backgroundColor: colors.secondary,
		paddingVertical: 15,
		width: 80,
		justifyContent: 'center',
		alignItems: 'flex-end',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		paddingRight: 20,
		borderWidth: 1,
		borderColor: colors.errorTxt,
	},
	leftSwipe: {
		backgroundColor: colors.secondary,
		paddingVertical: 15,
		width: 80,
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		paddingLeft: 20,
		borderWidth: 1,
		borderColor: colors.primary,
	},
})
