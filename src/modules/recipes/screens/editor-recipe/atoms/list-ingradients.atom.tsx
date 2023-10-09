import _ from 'lodash'
import React, { FC } from 'react'
import { View } from 'react-native'
import { Txt } from '~modules/common'
import { ICreateRecipeForm, IIngradient } from '~modules/recipes/typing'
import { IngradientAtom } from './ingradien.atom'

interface IProps {
	ingradients: IIngradient[]
	onChange: (val: IIngradient[]) => void
}
export const ListIngradientAtom: FC<IProps> = ({ ingradients, onChange }) => {
	const handleOnchange = (
		index: number,
		key: keyof IIngradient,
		val: string,
	) => {
		const _ingradients = _.cloneDeep(ingradients)
		_ingradients[index][key] = val
		onChange(_ingradients)
	}

	const addIngradient = () => {
		const emptyIngradient: IIngradient = {
			name: '',
			count: '',
			metric: '',
		}
		const _ingradients = _.cloneDeep(ingradients)
		_ingradients.push(emptyIngradient)
		onChange(_ingradients)
	}

	const removeIngradient = (_index: number) => {
		const _ingradients = _.cloneDeep(ingradients)
		const filterIngradients = _ingradients.filter(
			(_, index) => index !== _index,
		)
		onChange(filterIngradients)
	}
	return (
		<View>
			<Txt mod="lg" style={{ marginBottom: 20, textAlign: 'center' }}>
				Ingradients
			</Txt>
			<View>
				{ingradients.map((it, index) => {
					return (
						<IngradientAtom
							style={{ marginBottom: 20 }}
							index={index}
							ingradient={it}
							onChangeIngradient={handleOnchange}
							onPress={addIngradient}
							remove={() => removeIngradient(index)}
						/>
					)
				})}
			</View>
		</View>
	)
}
