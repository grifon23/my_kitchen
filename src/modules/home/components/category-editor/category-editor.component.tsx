import React, { FC } from 'react'
import { Button, Txt, TxtInput, useForm } from '~modules/common'
import { ModalComponent } from '~modules/common/components/modals'
import { ColorsWrapperAtom } from './atoms'

interface IProps {
	isOpen: boolean
	close: () => void
	categoryId?: number
}
export const CategoryEditor: FC<IProps> = ({ isOpen, close, categoryId }) => {
	const form = useForm<{ name: string; color: string }>({}, () => null)
	return (
		<ModalComponent
			isVisible={isOpen}
			onClose={close}
			animationIn={'bounceInRight'}
			animationOut={'bounceOutRight'}>
			<ModalComponent.Container style={{ padding: 20, borderRadius: 10 }}>
				<ModalComponent.Header>
					<Txt style={{ textAlign: 'center' }}>Category create</Txt>
				</ModalComponent.Header>
				<ModalComponent.Body>
					<TxtInput
						label="Category name"
						placeholder="Enter category"
						onChange={val => form.setFormField('name', val)}
						value={form.values.name}
						error={form.errors.name}
						styleContainer={{ marginVertical: 20 }}
					/>

					<ColorsWrapperAtom
						onChange={val => form.setFormField('color', val)}
						activeColor={form.values.color}
						style={{ marginBottom: 20 }}
					/>

					<Button
						mod="primary"
						txtContent="Save"
						onPress={() => {}}
					/>
				</ModalComponent.Body>
			</ModalComponent.Container>
		</ModalComponent>
	)
}
