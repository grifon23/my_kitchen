import React, { FC, useMemo, useState } from 'react'
import { LayoutAnimation, StyleSheet, View } from 'react-native'
import StarRating from 'react-native-star-rating-widget'
import { colors, Icon, Txt, useNav } from '~modules/common'

interface IProps {
	shareRecipe: () => void
	updateFavorite: () => void
	changeRating: (val: number) => void
	isFavorite: boolean
}
export const DetailedHeader: FC<IProps> = ({
	shareRecipe,
	updateFavorite,
	changeRating,
	isFavorite,
}) => {
	const [rating, setRating] = useState(0)
	const [activeFavorite, setActive] = useState(false)
	const nav = useNav()

	const handleChangeRating = (val: number) => {
		setRating(val)
		changeRating(val)
	}
	const toggleUpdateFavorite = () => {
		setActive(prev => !prev)
	}

	const favoriteIcon = useMemo(() => {
		return (
			<Icon
				name={activeFavorite ? 'heart' : 'heart-empty'}
				size={30}
				color={'red'}
				onPress={toggleUpdateFavorite}
			/>
		)
	}, [isFavorite, updateFavorite, activeFavorite])

	return (
		<View style={styles.container}>
			<Icon
				size={20}
				name="left-open-big"
				color={colors.secondaryTxt}
				onPress={() => nav.goBack()}
			/>

			<View style={styles.action}>
				<View style={styles.rating}>
					<Txt>{rating}</Txt>

					<StarRating
						rating={rating}
						starStyle={{ marginRight: -5 }}
						starSize={25}
						onChange={handleChangeRating}
					/>

					<Icon
						name="share"
						size={25}
						color={colors.primary}
						onPress={shareRecipe}
						buttonStyle={styles.paddingHorizonatl}
					/>

					{favoriteIcon}
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
		paddingTop: 30,
		paddingHorizontal: 16,
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	paddingHorizonatl: {
		paddingHorizontal: 15,
	},

	action: {},
})
