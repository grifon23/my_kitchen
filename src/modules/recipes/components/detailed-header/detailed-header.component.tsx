import React, { FC, useMemo, useState } from 'react'
import { LayoutAnimation, Platform, StyleSheet, View } from 'react-native'
import StarRating from 'react-native-star-rating-widget'
import { colors, Icon, Txt, useNav } from '~modules/common'

interface IProps {
	shareRecipe: () => void
	changeRating: (val: number) => void
	isFavorite: boolean
	nameRecipe: string
}
export const DetailedHeader: FC<IProps> = ({
	shareRecipe,
	changeRating,
	isFavorite,
	nameRecipe,
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
	}, [isFavorite, activeFavorite])

	return (
		<View style={styles.container}>
			<Icon
				size={20}
				name="left-open-big"
				color={colors.secondaryTxt}
				onPress={() => nav.goBack()}
			/>
			<Txt mod="lg" style={styles.title}>
				{nameRecipe}
			</Txt>
			<View>
				<View style={styles.rating}>
					{/* <Txt>{rating}</Txt>

					<StarRating
						rating={rating}
						starStyle={{ marginRight: -5 }}
						starSize={25}
						onChange={handleChangeRating}
					/> */}

					<Icon
						name="share"
						size={25}
						color={colors.primary}
						onPress={shareRecipe}
						buttonStyle={styles.paddingHorizonatl}
					/>

					{/* {favoriteIcon} */}
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
