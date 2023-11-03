import { Alert, Linking } from 'react-native'
import {
	CameraOptions,
	ImageLibraryOptions,
	launchCamera,
	launchImageLibrary,
	PhotoQuality,
} from 'react-native-image-picker'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

export const openGalleryPicker = async () => {
	const options: ImageLibraryOptions = {
		mediaType: 'photo',
		selectionLimit: 1,
		includeBase64: true,
	}
	const img = await launchImageLibrary(options)
	return img
}

export const pickFromCamera = async () => {
	const options: CameraOptions = {
		mediaType: 'photo',
		includeBase64: true,
		saveToPhotos: false,
	}
	const img = await launchCamera(options)
	return img
}

export const pickFromGalleryWithPermission = async () => {
	const perm = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)

	switch (perm) {
		case RESULTS.GRANTED:
		case RESULTS.UNAVAILABLE:
			return true

		case RESULTS.BLOCKED: {
			needMediaPermissions()
			return
		}
		default: {
			const requestRes = await request(PERMISSIONS.IOS.PHOTO_LIBRARY)

			return requestRes === RESULTS.GRANTED
		}
	}
}

export const pickFromCameraWithPermissions = async (permission: any) => {
	const perm = await check(PERMISSIONS.IOS.CAMERA)

	switch (perm) {
		case RESULTS.GRANTED:
		case RESULTS.UNAVAILABLE:
			return true

		case RESULTS.BLOCKED: {
			needMediaPermissions()
			return
		}
		default: {
			const requestRes = await request(PERMISSIONS.IOS.CAMERA)

			return requestRes === RESULTS.GRANTED
		}
	}
}

export const needMediaPermissions = () => {
	return new Promise((resolve, reject) => {
		Alert.alert(
			'Need access to gallery',
			'Allow access in settings',
			[
				{
					text: 'Cancel',
					onPress: () => reject(),
					style: 'cancel',
				},
				{
					text: 'Ok',
					onPress: () => Linking.openSettings(),
				},
			],
			{ cancelable: false },
		)
	})
}
