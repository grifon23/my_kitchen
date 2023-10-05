import _ from 'lodash'
import React, { FC, useEffect } from 'react'
import { categoryService } from '~modules/categories/service'
import { Button, Txt, TxtInput, useForm } from '~modules/common'
import { ModalComponent } from '~modules/common/components/modals'
import { ColorsWrapperAtom } from './atoms'

interface IProps {
	isOpen: boolean
	close: () => void
	categoryId?: string
}
export const CategoryEditor: FC<IProps> = ({ isOpen, close, categoryId }) => {
	const form = useForm<{ name: string; color: string }>({}, () => null)

	const getCategory = async () => {
		try {
			if (!_.isString(categoryId)) return
			const resp: any = await categoryService.getOneCategory(categoryId)
			form.setFormField('name', resp.name)
			console.log('resp', resp)
		} catch (error) {
			console.log('error get category', error)
		}
	}
	console.log('categoryId', _.isString(categoryId))

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
				await categoryService.createCategory({ name: form.values.name })
			}
			close()
			form.setForm({ name: '', color: '' })
		} catch (error) {
			console.log('error editor category', error)
		}
	}
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
						onPress={() => form.onSubmit(submit)}
					/>
				</ModalComponent.Body>
			</ModalComponent.Container>
		</ModalComponent>
	)
}
