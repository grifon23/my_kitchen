import React, { FC } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import { colors } from '~modules/common/theme'
import { Icon } from '../../elements'

interface IProps {
	item: any
	swipeRef: any
	openPopup: () => void
	children: JSX.Element
}

export const SwipableRow: FC<IProps> = ({
	item,
	swipeRef,
	openPopup,
	children,
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
	return (
		<Swipeable
			useNativeAnimations
			ref={ref => (swipeRef[item.id] = ref)}
			childrenContainerStyle={{ overflow: 'hidden' }}
			renderRightActions={rightSwipe}
			overshootRight={false}
			overshootLeft={false}
			onSwipeableRightOpen={openPopup}
			friction={3}
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
})
