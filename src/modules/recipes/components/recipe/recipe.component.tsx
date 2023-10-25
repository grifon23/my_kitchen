import React, { FC, useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors, Icon, Txt } from '~modules/common'
import { IRecipe } from '~modules/recipes/typing'

interface IProps {
	item: IRecipe
	isFavoriteItem?: boolean
	onPress: () => void
	style?: ViewStyle
	updateFavorite?: (id: string, isFavorite: boolean) => void
}
export const Recipe: FC<IProps> = ({
	item,
	onPress,
	style,
	updateFavorite,
	isFavoriteItem,
}) => {
	const [stateFavorite, setStateFavorite] = useState<boolean>(item.isFavorite)
	const toggle = () => setStateFavorite(prev => !prev)

	const handleChangeFavorite = () => {
		toggle()
		updateFavorite(item.id, !stateFavorite)
	}
	const memoFavorite = useMemo(() => {
		if (isFavoriteItem) return null
		return (
			<Icon
				name={stateFavorite ? 'heart' : 'heart-empty'}
				size={25}
				color={'red'}
				onPress={handleChangeFavorite}
			/>
		)
	}, [item.isFavorite, stateFavorite, updateFavorite, isFavoriteItem])
	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity onPress={onPress} style={styles.content}>
				<Txt style={{ fontWeight: '500' }}>{item.name}</Txt>
			</TouchableOpacity>
			{memoFavorite}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 10,
		flexDirection: 'row',
		backgroundColor: colors.secondary,
		borderColor: colors.primary,
		paddingHorizontal: 15,
	},
	content: {
		width: '80%',
		paddingVertical: 20,
	},
})
