import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { ImageSource } from 'react-native-vector-icons/Icon'
import { $size} from '~modules/common'

interface RemoteImageProps extends Record<string, ImageSource> {
	url?: string
	source: ImageSource
}
export const RemoteImage: FC<RemoteImageProps> = ({ source, ...props }) => {
	if (props.url) {
		return (
			<FastImage
				source={{ uri: props.url }}
				resizeMode={FastImage.resizeMode.cover}
				style={[styles.image, props.styleImg]}
				{...props}
			/>
		)
	} else {
		return (
			<Image
				source={source}
				resizeMode={FastImage.resizeMode.cover}
				style={[styles.image, props.styleImg]}
				{...props}
			/>
		)
	}
}
const styles = StyleSheet.create({
	image: {
		borderRadius: 50,
	},
})
