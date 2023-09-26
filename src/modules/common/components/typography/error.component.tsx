import React from 'react'
import { FC } from 'react'
import { Txt } from './txt.component'

interface IProps {
	error: string
}

export const ErrorTxt: FC<IProps> = ({ error }) => {
	return (
		<Txt mod="es" color="red">
			{error}
		</Txt>
	)
}
