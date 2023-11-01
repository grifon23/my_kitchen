import React, { FC, useMemo, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { ErrorTxt, Txt } from '../../typography'
import { IOption } from '~modules/common/typing'
import { ModalComponent } from '../../modals'
import {
	DropdownItemSelectAtom,
	DropdownSelectWrapAtom,
	FieldSelectAtom,
} from './atoms'
import { $size } from '~modules/common/helpers'
import { colors } from '~modules/common/theme'

interface IProps {
	selected: string
	onSelect: (val: IOption) => void
	error?: string
	options: IOption[]
	placeholder: string
	label?: string
	mb?: number
	disabled?: boolean
	style?: ViewStyle
}

export const FormControllSelect: FC<IProps> = ({
	selected,
	onSelect,
	error,
	options = [],
	placeholder,
	label,
	mb,
	disabled,
	style,
}) => {
	const [openDropDown, setOpenDropdown] = useState(false)

	const toggleOpen = () => setOpenDropdown(prev => !prev)
	const closeDropdown = () => setOpenDropdown(false)

	const handleOnChange = (val: IOption) => {
		onSelect(val)
		closeDropdown()
	}
	const memoSelectedLabel = useMemo(() => {
		const selectedItem = options.find(it => it.value === selected)
		return selectedItem?.label
	}, [selected])

	const renderOptions = () => {
		return options.map(it => (
			<DropdownItemSelectAtom
				key={it.value}
				onPress={() => handleOnChange(it)}
				label={it.label}
			/>
		))
	}

	const memoLabel = useMemo(() => {
		if (!label) return null
		return (
			<View style={styles.labelWrap}>
				<Txt mod="es" style={styles.label}>
					{label}
				</Txt>
			</View>
		)
	}, [label, styles.labelWrap, styles.label])

	return (
		<View style={[styles.container, { marginBottom: mb }, style]}>
			{memoLabel}

			<FieldSelectAtom
				disabled={disabled}
				selected={memoSelectedLabel}
				placeholder={placeholder}
				onPress={toggleOpen}
			/>

			{error ? <ErrorTxt error={error} /> : null}

			<ModalComponent isVisible={openDropDown} onClose={closeDropdown}>
				<DropdownSelectWrapAtom>
					{renderOptions()}
				</DropdownSelectWrapAtom>
			</ModalComponent>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	labelWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	label: {
		marginBottom: 10,
		color: colors.primary,
	},
})
