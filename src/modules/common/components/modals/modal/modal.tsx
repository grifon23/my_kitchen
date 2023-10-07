import React from 'react'
import RNModal from 'react-native-modal'
import { getDimentions } from '../../../helpers'
import {
	ModalBodyAtom,
	ModalContainerAtom,
	ModalFooterAtom,
	ModalHeaderAtom,
} from './atoms'
type ModalProps = {
	isVisible: boolean
	children: React.ReactNode
	onClose: () => void
	positionModal?:
		| 'center'
		| 'flex-start'
		| 'flex-end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
	[x: string]: any
}
const dimensions = getDimentions()
export const ModalComponent = ({
	isVisible = false,
	children,
	positionModal = 'center',
	onClose,
	...props
}: ModalProps) => {
	return (
		<RNModal
			deviceHeight={dimensions.height}
			deviceWidth={dimensions.width}
			statusBarTranslucent
			isVisible={isVisible}
			animationInTiming={500}
			animationOutTiming={500}
			backdropTransitionInTiming={300}
			backdropTransitionOutTiming={300}
			backdropOpacity={0.7}
			hasBackdrop={true}
			onBackdropPress={onClose}
			style={{
				marginHorizontal: 0,
				marginVertical: 0,
				justifyContent: positionModal,
				paddingHorizontal: 16,
			}}
			{...props}>
			{children}
		</RNModal>
	)
}
ModalComponent.Header = ModalHeaderAtom
ModalComponent.Container = ModalContainerAtom
ModalComponent.Body = ModalBodyAtom
ModalComponent.Footer = ModalFooterAtom
