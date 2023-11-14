import React, { FC } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { colors, Icon, useNav } from '~modules/common'

interface IProps {
	shareRecipe: () => void
	downloadLecipe: () => void
}
export const DashboardHeader: FC<IProps> = ({
	shareRecipe,
	downloadLecipe,
}) => {
	const nav = useNav()

	return (
		<View style={styles.container}>
			<Icon
				size={20}
				name="left-open-big"
				color={colors.secondaryTxt}
				onPress={() => nav.goBack()}
			/>

			<View>
				<View style={styles.rating}>
					<Icon
						name="download"
						size={25}
						color={colors.secondaryTxt}
						onPress={downloadLecipe}
						buttonStyle={styles.paddingHorizonatl}
					/>

					<Icon
						name="share"
						size={25}
						color={colors.primary}
						onPress={shareRecipe}
						buttonStyle={styles.paddingHorizonatl}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: Platform.select({
			ios: 50,
			android: 30,
		}),
		paddingHorizontal: 16,
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	paddingHorizonatl: {
		paddingHorizontal: 15,
	},

	title: {
		fontWeight: '500',
		maxWidth: '70%',
	},
})
