import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, ScreenLayout, Txt, useNav } from '~modules/common'
import { UserRouteKey } from '~modules/root/typing'

export const OnBoardingIOScreen = () => {
	const nav = useNav()

	const goGenerateByProduct = () => {
		nav.navigate(UserRouteKey.GenerateByProducts)
	}
	return (
		<ScreenLayout viewStyle={styles.container}>
			<View style={styles.btnGroup}>
				<Button
					txtContent="Generate by product"
					onPress={goGenerateByProduct}
					mod={'primary'}
				/>

				<Button
					txtContent="Generate unique recipe"
					onPress={() => {}}
					mod={'outline'}
				/>
			</View>
		</ScreenLayout>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnGroup: {
		flexDirection: 'column',
		gap: 20,
	},
})
