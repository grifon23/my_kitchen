import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors, Txt } from '~modules/common'

interface IProps {
	name: string
	description: string
	countComments: number
	onPress: () => void
	style?: ViewStyle
}
export const DashboardRecipeItem: FC<IProps> = ({
	name,
	description,
	onPress,
	countComments,
	style,
}) => {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={[styles.container, style]}
			onPress={onPress}>
			<View style={styles.topContainer}>
				<Txt mod="lg" style={styles.nameRecipe}>
					{name}
				</Txt>
			</View>

			<View style={styles.bottomContainer}>
				<Txt numberOfLines={4} style={styles.desctiption}>
					{description}
				</Txt>

				<View style={styles.rowComment}>
					<Txt style={styles.commentTxt} mod="md">
						Comments:
					</Txt>

					<Txt style={styles.commentTxt} mod="lg">
						{countComments}
					</Txt>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 250,
		width: '100%',
		borderRadius: 15,
		borderColor: colors.primary,
		backgroundColor: colors.secondary,
		borderWidth: 1,
		borderBottomWidth: 0,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	nameRecipe: {
		fontWeight: '600',
		color: colors.secondaryTxt,
		opacity: 0.8,
	},
	topContainer: {
		paddingTop: 15,
		paddingHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'center',
		height: '35%',
	},
	bottomContainer: {
		height: '65%',
		backgroundColor: '#70B943',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		padding: 16,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	desctiption: {
		color: '#FFFF',
	},
	rowComment: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	commentTxt: {
		color: '#FFFF',
		fontWeight: '600',
	},
})
