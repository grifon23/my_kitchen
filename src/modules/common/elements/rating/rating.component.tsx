import React, { FC } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from '~modules/common'

interface IProps {
	rating: number
	onRate: (value: number) => void
	disable?: boolean
}

export const Rating: FC<IProps> = ({ rating, onRate, disable }) => {
	const stars = [1, 2, 3, 4, 5]

	return (
		<View style={styles.container}>
			{stars.map(star => (
				<TouchableOpacity
                    disabled={disable}
					key={star}
					onPress={() => onRate(star)}
					style={styles.starContainer}>
					<Icon
						name={star <= rating ? 'star' : 'star-empty'}
						size={30}
						color={star <= rating ? 'gold' : 'gray'}
					/>
				</TouchableOpacity>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	starContainer: {
		marginRight: 5,
	},
})

export default Rating
