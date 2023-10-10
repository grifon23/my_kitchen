import _ from 'lodash'
import React, { FC, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Txt, useNav } from '~modules/common'
import { IIngradient } from '~modules/recipes/typing'
import { UserRouteKey } from '~modules/root/typing'

interface IProps {
	ingradients: IIngradient[]
}

export const PreviewIngradients: FC<IProps> = ({ ingradients }) => {
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
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginBottom: 10,
								}}>
								<Txt>{it.name}</Txt>
								<View
									style={{
										borderBottomWidth: 1,
										flex: 1,
										borderStyle: 'solid',
										paddingBottom: 10,
									}}
								/>
								<View style={{ flexDirection: 'row' }}>
									<Txt>{it.count} </Txt>
									<Txt>{it.metric}</Txt>
								</View>
							</View>
						)
					})}
				</View>
			)
	}, [ingradients])

	return (
		<View style={styles.container}>
			<View style={styles.ingradientsHeader}>
				<Txt mod="xl" style={{ flex: 1 }}>
					Ingradients
				</Txt>

				<Button
					height={40}
					mod="primary"
					onPress={() =>
						nav.navigate(UserRouteKey.IngradientsRecipe, {
							ingradients,
						})
					}
					txtContent={labelButton}
					style={{ height: 40, width: 180 }}
				/>
			</View>
			{memoIngradientsList}
		</View>
	)
}

const styles = StyleSheet.create({
	ingradientsHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	ingradientsList: {
		flexDirection: 'column',
	},
	container: {
		minHeight: 200,
		marginBottom: 20,
	},
})
