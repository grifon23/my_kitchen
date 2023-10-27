import _ from 'lodash'
import React, { FC } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { IAccountForm } from '~modules/account/typing'
import {
	DatePickerControl,
	FormControllSelect,
	TxtInput,
} from '~modules/common'

interface IProps {
	values: IAccountForm
	onChange: (key: keyof IAccountForm, val: string) => void
	errors?: any
	style?: ViewStyle
}
export const AccountForm: FC<IProps> = ({
	values,
	onChange,
	errors,
	style,
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
			<TxtInput
				label="Email"
				value={'admin@email.com'}
				onChange={_.noop}
				styleContainer={{ marginBottom: 24 }}
			/>
			<FormControllSelect
				label="Gender"
				selected={values.gender}
				onSelect={val => onChange('gender', val.value)}
				options={[
					{ value: 'male', label: 'Male' },
					{ value: 'female', label: 'Female' },
				]}
				placeholder="Select gender"
				error={errors.gender}
				mb={20}
			/>
			<DatePickerControl
				value={values.dateOfBirth}
				label={'Select Birthday'}
				placeholder={'Enter date of Birthday'}
				onChange={(val: any) => onChange('dateOfBirth', val.toString())}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
})
