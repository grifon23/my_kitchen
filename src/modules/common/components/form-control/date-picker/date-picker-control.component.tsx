import moment from 'moment'
import React, { FC, useState } from 'react'
import {
	StyleSheet,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native'
import _ from 'lodash'
import { Txt } from '../../typography'
import { $size } from '~modules/common/helpers'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { colors, Icon } from '~modules/common'

interface IProps {
	value: string
	onChange: any
	minDate?: Date
	maxDate?: Date
	label?: string
	placeholder?: string
	styleBtn?: ViewStyle
	styleLabel?: TextStyle
	placeholderColor?: string
}

export const DatePickerControl: FC<IProps> = ({
	value,
	onChange,
	label,
	minDate,
	maxDate,
	placeholder,
	styleBtn,
	styleLabel,
	placeholderColor = 'rgba(85, 85, 85, 0.5)',
}) => {
	const [datePickerVisible, setDatePickerVisible] = useState(false)
	const [selectedDate, setSelectedDate] = useState(value)

	const renderDateOfBirth = () => {
		if (!selectedDate) {
			return <Txt color={placeholderColor}>{placeholder}</Txt>
		}
		return (
			<Txt color={colors.primaryTxt}>
				{moment(selectedDate).format('DD MMMM YYYY')}
			</Txt>
		)
	}

	const showDatePicker = () => {
		setDatePickerVisible(true)
	}

	const hideDatePicker = () => {
		setDatePickerVisible(false)
	}

	const handleConfirm = (date: any) => {
		setSelectedDate(date)
		onChange(String(date))
		hideDatePicker()
	}

	return (
		<>
			{label && (
				<Txt mod="sm" style={[styles.label, styleLabel]}>
					{label}
				</Txt>
			)}
			<TouchableOpacity
				style={[styles.calendarButton, styleBtn]}
				onPress={showDatePicker}>
				<Txt style={styles.calendarButtonText}>
					{renderDateOfBirth()}
				</Txt>
				<Icon name={'calendar'} size={$size(20)} />
			</TouchableOpacity>
			<DateTimePickerModal
				minimumDate={minDate}
				maximumDate={maxDate}
				date={selectedDate ? new Date(selectedDate) : new Date()}
				isVisible={datePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
				onChange={date => onChange(date.toString())}
				display="spinner"
			/>
		</>
	)
}

const styles = StyleSheet.create({
	calendarButton: {
		padding: $size(15),
		borderRadius: $size(10),
		borderWidth: 1,
		borderColor: '#7832EA',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		flexDirection: 'row',
		textAlign: 'left',
	},
	calendarButtonText: {},

	label: {
		marginBottom: 10,
		color: '#7832EA',
	},
})
