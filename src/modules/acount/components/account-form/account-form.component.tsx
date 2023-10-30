import _ from 'lodash'
import React, { FC, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { useSelector } from 'react-redux'
import { IAccountForm } from '~modules/acount'

import {
	$size,
	DatePickerControl,
	FormControllSelect,
	Txt,
	TxtInput,
	useNav,
} from '~modules/common'
import { selectAccount } from '~modules/store/account/selector'

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
	email
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
			<View style={styles.emailContainer}>
				<Txt mod="sm" style={styles.label}>
					Email
				</Txt>
				<Txt style={styles.emailTxt}>
					{email}
				</Txt>
			</View>
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
	emailTxt: {
		padding: $size(15),
		borderRadius: $size(10),
		borderWidth: 1,
		borderColor: '#7832EA',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		textAlign: 'left',
	},
	emailContainer:{
		marginBottom: 20
	},
	label: {
		marginBottom: 10,
		color: '#7832EA',
	},
})
