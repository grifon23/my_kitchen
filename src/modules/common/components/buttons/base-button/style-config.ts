import { colors } from '~modules/common/theme'

export const styleModConfig = {
	primary: {
		container: {
			backgroundColor: colors.primary,
			shadowColor: '#333333',
			shadowOffset: { width: 0, height: 5 },
			shadowOpacity: 0.1,
			shadowRadius: 12,
			elevation: 1,
		},
		txt: { color: colors.secondary, fontWeight: '500' },
	},
	outline: {
		container: {
			backgroundColor: colors.bgLayout,
			borderWidth: 2,
			borderColor: '#95B84B',
			shadowColor: '#333333',
			shadowOffset: { width: 0, height: 5 },
			shadowOpacity: 0.1,
			shadowRadius: 12,
			elevation: 1,
		},
		txt: { color: '#95B84B', fontWeight: '600' },
	},
}
