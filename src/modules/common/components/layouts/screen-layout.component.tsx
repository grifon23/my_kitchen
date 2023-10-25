import React, { ReactElement } from 'react'
import {
	ColorValue,
	StatusBar,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScreenLayoutContent } from './screen-layout-content.component'
import _ from 'lodash'
import { colors } from '~modules/common/theme'
import { $size } from '../../helpers'
import { gcService } from '../../tools'

export interface ScreenLayoutProps {
	children: JSX.Element | JSX.Element[]
	needScroll?: Boolean
	scrollStyle?: ViewStyle
	viewStyle?: ViewStyle
	leftBottomRound?: boolean
	stutusBarBg?: ColorValue
	background?: string
	horizontalPadding?: number
	keyboardSpacerOn?: boolean
	headerComponent?: ReactElement
	scrollRef?: React.MutableRefObject<KeyboardAwareScrollView>
	extraHeight?: number
	footer?: () => ReactElement
	pointerEvents?: any
	bottomSafeArea?: boolean
	topPadding?: number
}

export const ScreenLayout = ({
	stutusBarBg,
	background,
	bottomSafeArea = false,
	topPadding,
	...props
}: ScreenLayoutProps) => {
	const insets = useSafeAreaInsets()
	return (
		<>
			<View
				style={{
					backgroundColor: _.defaultTo(stutusBarBg, colors.bgLayout),
					height: _.defaultTo(
						Math.max(insets.top, gcService.get('insetsTop')),
						0,
					),
					width: '100%',
				}}>
				<StatusBar barStyle={'dark-content'} translucent />
			</View>
			<View
				style={[
					styles.container,
					{
						backgroundColor: _.defaultTo(
							background,
							colors.bgLayout,
						),
						paddingTop: 10,
						paddingBottom: bottomSafeArea ? insets.bottom + 5 : 0,
					},
				]}>
				<ScreenLayoutContent
					{...props}
					header={() => props.headerComponent}
					topPadding={topPadding}
				/>

				{props.footer ? props.footer() : null}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: $size(10),
	},
})
