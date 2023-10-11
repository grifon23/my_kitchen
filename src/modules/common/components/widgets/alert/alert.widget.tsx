import React, { useEffect, useRef, useState } from 'react'
import { ModalComponent } from '../../modals'
import { StyleSheet, View } from 'react-native'
import { Txt } from '../../typography'
import _ from 'lodash'
import { Icon } from '../../elements'
import { colors } from '~modules/common/theme'
import { Button } from '../../buttons'
import { appEvents, AppEvents } from '~modules/common/events'
import { useEventsListener } from '~modules/common/hooks'
interface IContent {
	icon: string
	colorIcon: string
	message: string
	buttonType: 'primary' | 'outline' | null
	btnText: string
	cancelBtnText?: string
	cancelBtnType?: 'primary' | 'outline'
}
const contentInitial: IContent = {
	icon: '',
	message: '',
	buttonType: null,
	btnText: '',
	colorIcon: '',
	cancelBtnText: '',
	cancelBtnType: 'outline',
}
export const AlertWidget = () => {
	const settingsRef = useRef<any>({
		onPress: () => {},
	})
	const [content, setContent] = useState<IContent>(contentInitial)
	const [isVisible, setVisible] = useState(false)
	useEventsListener(
		'alert',
		data => {
			settingsRef.current = {
				onPress: data?.onPress,
				onPressCancelBtn: data?.onPressCancelBtn,
			}
			setContent({
				icon: data?.icon,
				buttonType: data?.buttonType,
				message: data?.message,
				btnText: _.defaultTo(data.btnText, contentInitial.btnText),
				colorIcon: data.colorIcon,
				cancelBtnText: data.cancelBtnText,
				cancelBtnType: data.cancelBtnType,
			})
		},
		[setContent, settingsRef.current, content],
	)
	useEffect(() => {
		if (content?.message) setVisible(true)
	}, [content, settingsRef.current])
	const close = () => {
		setVisible(false)
	}
	const onConfirm = () => {
		settingsRef.current.onPress()
		close()
	}

	const onCancel = () => {
		if (settingsRef.current?.onPressCancelBtn) {
			settingsRef.current?.onPressCancelBtn()
			close()
		}
		close()
	}
	return (
		<ModalComponent
			coverScreen={false}
			useNativeDriverForBackdrop={true}
			backdropTransitionOutTiming={400}
			hideModalContentWhileAnimating={true}
			animationIn="pulse"
			isVisible={Boolean(isVisible)}
			onBackdropPress={close}
			onClose={close}>
			<ModalComponent.Container style={styles.container}>
				<ModalComponent.Header>
					<View style={styles.header}>
						<Icon
							name={content.icon}
							size={60}
							color={_.defaultTo(
								content.colorIcon,
								colors.primary,
							)}
						/>
					</View>
				</ModalComponent.Header>
				<View style={styles.content}>
					<Txt mod="xl" style={styles.message}>
						{content?.message}
					</Txt>
				</View>
				<View
					style={[
						styles.button,
						{
							justifyContent: settingsRef.current
								?.onPressCancelBtn
								? 'space-between'
								: 'center',
						},
					]}>
					{settingsRef.current?.onPressCancelBtn ? (
						<Button
							style={styles.close}
							onPress={onCancel}
							mod={_.defaultTo(content.cancelBtnType, 'outline')}
							txtContent={_.defaultTo(
								content.cancelBtnText,
								'Cancel',
							)}
						/>
					) : null}

					<Button
						style={{
							minWidth: settingsRef.current?.onPressCancelBtn
								? '45%'
								: '100%',
						}}
						onPress={onConfirm}
						mod={content.buttonType}
						txtContent={content.btnText}
					/>
				</View>
			</ModalComponent.Container>
		</ModalComponent>
	)
}
const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		overflow: 'hidden',
		backgroundColor: colors.secondary,
		paddingHorizontal: 24,
		paddingVertical: 40,
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 24,
	},
	header: {
		alignItems: 'center',
	},
	message: {
		textAlign: 'center',
	},
	button: {
		alignSelf: 'center',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	btnTxt: {},
	close: {
		minWidth: '45%',
	},
	bottomBtn: {},
})
export const Alert = {
	Component: AlertWidget,
	Show: (params: AppEvents['alert']) => {
		appEvents.emit('alert', params)
	},
}
