import _ from 'lodash'
import React, { FC, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, ErrorTxt, Txt, useNav } from '~modules/common'
import { IIngradient } from '~modules/recipes/typing'
import { UserRouteKey } from '~modules/root/typing'
import { PreviewIngradient } from './preview-ingradient.component'

interface IProps {
	ingradients: IIngradient[]
	error: string
	openDrawer: () => void
}

export const PreviewIngradients: FC<IProps> = ({
	ingradients,
	error,
	openDrawer,
}) => {
	const nav = useNav()
	const labelButton = _.isEmpty(ingradients)
		? 'Add ingradient'
		: 'Edit ingradients'

	const memoIngradientsList = useMemo(() => {
		if (!_.isEmpty(ingradients))
			return (
				<View>
					{ingradients.map(it => {
						return (
							<PreviewIngradient
								name={it.name}
								count={it.count}
								metric={it.metric}
							/>
						)
					})}
				</View>
			)
	}, [ingradients])

	return (
		<View style={styles.container}>
			<View style={styles.ingradientsHeader}>
				<View style={styles.row}>
					<Txt mod="xl" style={{ flex: 1 }}>
						Ingradients
					</Txt>

					<Button
						height={40}
						mod="primary"
						onPress={() => openDrawer()}
						txtContent={labelButton}
						style={{ height: 40, width: 180 }}
					/>
				</View>
				{error ? <ErrorTxt error={error} /> : null}
			</View>

			{memoIngradientsList}
		</View>
	)
}

const styles = StyleSheet.create({
	ingradientsHeader: {
		marginBottom: 20,
	},
	ingradientsList: {
		flexDirection: 'column',
	},
	container: {
		minHeight: 200,
		marginBottom: 20,
	},
	row: { flexDirection: 'row', alignItems: 'center' },
})
