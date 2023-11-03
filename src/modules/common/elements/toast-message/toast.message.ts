import Toast from 'react-native-toast-message'

export const messageToast = (key: 'error' | 'success', message?: string) => {
	Toast.show({
		type: key,
		text1: message,
	})
}
