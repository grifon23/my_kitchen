import React from 'react'
import { View } from 'react-native'
import { ToastConfig, ToastConfigParams } from 'react-native-toast-message'
import { Txt } from '~modules/common'

const GREEN_DARK = '#1D3837'
interface IToastMessages {
	text1: string
	text2: string
}
export const toastConfig: ToastConfig = {
	closrToast: ({ text1, text2 }: ToastConfigParams<IToastMessages>) => (
		<View
			style={{
				height: 60,
				width: '100%',
				backgroundColor: GREEN_DARK,
			}}>
			<Txt>{text1}</Txt>
			<Txt>{text2}</Txt>
		</View>
	),
}
