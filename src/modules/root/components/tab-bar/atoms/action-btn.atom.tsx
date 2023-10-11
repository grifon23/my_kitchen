import React, { FC, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import {
	$size,
	appEvents,
	colors,
	gcService,
	Icon,
	useNav,
} from '~modules/common'
import { UserRouteKey } from '~modules/root/typing'

export const ActionBtnAtom: FC = () => {
	const nav = useNav()
	const openEditorRecipe = () => {
		gcService.set('recipeId', null)
		nav.navigate(UserRouteKey.EditorRecipe)
	}
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={styles.container}
			onPress={openEditorRecipe}>
			<Icon name="plus" size={20} color={colors.bgLayout} />
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		height: $size(56, 52),
		width: $size(56, 52),
		borderRadius: 110,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 10,
	},
})
