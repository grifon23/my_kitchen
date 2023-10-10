import React, { useState } from 'react'
import {
	Button,
	Loader,
	PrimaryHeader,
	ScreenLayout,
	Txt,
} from '~modules/common'
import { IngradentEditor } from '../components'
import { ingradientsData } from '../config'
import { View } from 'react-native'

export const MyIngradientsScreen = () => {
	const [isOpenEditor, setIsOpenEditor] = useState(false)
	const [editIngradient, setInradient] = useState<string>('')

	const onClose = () => {
		setIsOpenEditor(false)
		setInradient(null)
	}

	const openEditor = () => {
		setIsOpenEditor(true)
	}

	return (
		<>
			<IngradentEditor
				isOpen={isOpenEditor}
				close={onClose}
				ingradientName={editIngradient}
				create={() => {}}
			/>
			<ScreenLayout
				needScroll={true}
				headerComponent={<PrimaryHeader label="Ingradients recipe" />}>
				<Button
					mod="primary"
					onPress={openEditor}
					txtContent="Add ingradient"
				/>
				<View style={{ paddingVertical: 30 }}>
					<Txt style={{ marginBottom: 20 }}>My ingradients</Txt>

					{ingradientsData.map(it => (
						<Txt key={it}>{it}</Txt>
					))}
				</View>
			</ScreenLayout>
		</>
	)
}
