import React, { FC } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { $size } from '../../helpers'

interface ScreenLayoutContentProps {
	children: JSX.Element | JSX.Element[]
	header?: () => React.ReactNode
	horizontalPadding?: number
	needScroll?: Boolean
	scrollStyle?: ViewStyle
	viewStyle?: ViewStyle
	leftBottomRound?: boolean
	background?: string
	keyboardSpacerOn?: boolean
	scrollRef?: React.MutableRefObject<KeyboardAwareScrollView>
	extraHeight?: number
	pointerEvents?: any
	topPadding?: number
}

export const ScreenLayoutContent: FC<ScreenLayoutContentProps> = ({
	children,
	header,
	topPadding = 16,
	horizontalPadding = 15,
	needScroll,
	scrollStyle,
	viewStyle,
	scrollRef,
	extraHeight = 160,
	pointerEvents = undefined,
}) => {
	if (needScroll)
		return (
			<View style={styles.view}>
				{header && header()}
				<KeyboardAwareScrollView
					ref={scrollRef}
					enableAutomaticScroll={true}
					keyboardShouldPersistTaps="handled"
					extraHeight={extraHeight}
					scrollEventThrottle={20}
					pointerEvents={pointerEvents}
					contentContainerStyle={[
						{
							paddingTop: 16,
							paddingHorizontal: $size(horizontalPadding),
						},
						scrollStyle,
					]}>
					{children}
				</KeyboardAwareScrollView>
			</View>
		)
	else
		return (
			<View style={styles.view}>
				{header && header()}
				<View
					style={[
						viewStyle,
						{
							paddingTop: topPadding,
							paddingHorizontal: $size(horizontalPadding),
							flex: 1,
						},
					]}
					pointerEvents={pointerEvents}>
					{children}
				</View>
			</View>
		)
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		zIndex: 2,
	},
})
