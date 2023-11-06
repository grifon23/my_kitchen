import _ from 'lodash'
import React, { FC } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { GendersEnum, IAccountForm } from '~modules/account'

import {
	$size,
	DatePickerControl,
	FormControllSelect,
	TxtInput,
} from '~modules/common'
import { TextRow } from '../text-row'

interface IProps {
	values: IAccountForm
	onChange: (key: keyof IAccountForm, val: string) => void
	errors?: any
	style?: ViewStyle
	email: string
}
export const AccountForm: FC<IProps> = ({
	values,
	onChange,
	errors,
	style,
	email,
}) => {
	return (
		<View style={[styles.container, style]}>
			<TxtInput
				label="Full Name"
				value={values.name}
				onChange={val => onChange('name', val)}
				error={errors?.name}
				styleContainer={{ marginBottom: 24 }}
				placeholder="Enter Full name"
			/>
			<TextRow label="Email" value={email} />
			<FormControllSelect
				label="Gender"
				selected={values.gender}
				onSelect={val => onChange('gender', val.value)}
				options={[
					{ value: GendersEnum.Male, label: 'Male' },
					{ value: GendersEnum.Female, label: 'Female' },
				]}
				placeholder="Select gender"
				error={errors.gender}
				mb={20}
			/>

			<DatePickerControl
				value={values.dateOfBirth}
				label={'Select Birthday'}
				placeholder={'Enter date of Birthday'}
				onChange={(val: any) => {
					onChange('dateOfBirth', val)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	emailTxt: {
		padding: $size(15),
		borderRadius: $size(10),
		borderWidth: 1,
		borderColor: '#7832EA',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		textAlign: 'left',
	},
	emailContainer: {
		marginBottom: 20,
	},
	label: {
		marginBottom: 10,
		color: '#7832EA',
	},
})
