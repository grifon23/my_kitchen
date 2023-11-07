import _ from 'lodash'
import React, { FC, useEffect } from 'react'
import { categoryService } from '~modules/categories/service'
import { categoryValidator } from '~modules/categories/validators'
import { Button, Txt, TxtInput, useForm } from '~modules/common'
import { ModalComponent } from '~modules/common/components/modals'

interface IProps {
	isOpen: boolean
	close: () => void
	categoryId?: string
}
export const CategoryEditor: FC<IProps> = ({ isOpen, close, categoryId }) => {
	const form = useForm<{ name: string }>({}, categoryValidator)

	const resetForm = () => {
		form.setForm({ name: '' })
		form.setFormErrors({ name: '' })
	}

	const getCategory = async () => {
		try {
			if (!categoryId) {
				resetForm()

				return
			} else {
				const resp: any = await categoryService.getOneCategory(
					categoryId,
				)
				form.setFormField('name', resp.name)
			}
		} catch (error) {
			console.log('error get category', error)
		}
	}

	useEffect(() => {
		getCategory()
	}, [categoryId])

	const submit = async () => {
		try {
			if (_.isString(categoryId)) {
				await categoryService.updateCategory(String(categoryId), {
					name: form.values.name,
				})
			} else {
				await categoryService.createCategory(form.values.name)
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
