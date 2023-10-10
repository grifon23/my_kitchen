import React, { FC, useEffect, useMemo, useState } from 'react'
import { TxtInput } from '../input.component'
import _ from 'lodash'
import { IOption } from '~modules/common/typing'
import { DropdownAtom } from './atoms'
import { View } from 'react-native'

interface IProps {
	error?: string
	value: string
	onChange: (val: string) => void
	options: IOption[]
	placeholder?: string
}
export const SelectAutoComplete: FC<IProps> = ({
	error,
	value,
	onChange,
	options,
	placeholder,
}) => {
	const [open, setOpen] = useState<boolean>(false)
	const [searchString, setSearchString] = useState('')

	const openingDropdown = () => {
		if (searchString.length > 2) setOpen(true)
	}

	useEffect(() => {
		openingDropdown()
	}, [searchString, open, value])

	const memoOptions = useMemo(() => {
		if (!searchString) return []
		else {
			const filterOptions = options.filter(it =>
				it.value.toLowerCase().includes(searchString),
			)
			if (!_.isEmpty(filterOptions)) filterOptions.length = 4
			return filterOptions
		}
	}, [searchString, open, value])

	const handleOnChange = (val: string) => {
		setSearchString(val)
		onChange(val)
		setOpen(false)
	}
	return (
		<View style={{ width: '45%', position: 'relative' }}>
			<TxtInput
				value={searchString}
				onChange={val => setSearchString(val.trimStart())}
				error={error}
				placeholder={placeholder}
			/>
			{_.isEmpty(memoOptions) ? null : (
				<DropdownAtom
					isOpen={open}
					searchString={searchString}
					options={memoOptions}
					onChange={handleOnChange}
				/>
			)}
		</View>
	)
}
