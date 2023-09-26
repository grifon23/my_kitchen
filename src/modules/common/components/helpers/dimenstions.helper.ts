import { Dimensions } from 'react-native'

export const getDimentions = () => {
	const { height, width } = Dimensions.get('screen')
	return { height, width }
}
