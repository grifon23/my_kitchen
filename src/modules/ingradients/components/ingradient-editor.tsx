import React, { FC, useEffect } from 'react'
import { Button, Txt, TxtInput, useForm } from '~modules/common'
import { ModalComponent } from '~modules/common/components/modals'
interface IProps {
	isOpen: boolean
	close: () => void
	ingradientName?: string
	create: () => void
}
export const IngradentEditor: FC<IProps> = ({
	isOpen,
	close,
	ingradientName,
	create,
}) => {
	const form = useForm<{ name: string }>({}, () => null)

	useEffect(() => {
		if (ingradientName) form.setFormField('name', ingradientName)
	}, [ingradientName])

	const resetForm = () => {
		form.setForm({ name: '' })
		form.setFormErrors({ name: '' })
	}

	const submit = () => {
		try {
			if (ingradientName) {
				console.log('edit ingradient')
			} else {
				console.log('create ingradient')
				create()
			}
			close()
			form.setForm({ name: '' })
			form.setFormErrors({ name: '' })
		} catch (error) {
			console.log('error editor category', error)
		}
	}

	const handleClose = () => {
		close()
		resetForm()
	}
	return (
		<ModalComponent isVisible={isOpen} onClose={handleClose}>
			<ModalComponent.Container style={{ padding: 20, borderRadius: 10 }}>
				<ModalComponent.Header>
					<Txt style={{ textAlign: 'center' }}>Add ingradient</Txt>
				</ModalComponent.Header>
				<ModalComponent.Body>
					<TxtInput
						label="Ingradient name"
						placeholder="Enter ingradient"
						onChange={val => form.setFormField('name', val)}
						value={form.values.name}
						error={form.errors.name}
						styleContainer={{ marginVertical: 20 }}
					/>

					<Button
						mod="primary"
						txtContent="Save"
						onPress={() => form.onSubmit(submit)}
					/>
				</ModalComponent.Body>
			</ModalComponent.Container>
		</ModalComponent>
	)
}
