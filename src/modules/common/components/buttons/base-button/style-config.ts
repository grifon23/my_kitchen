import { colors } from '~modules/common/theme'

export const styleModConfig = {
	primary: {
		container: { backgroundColor: colors.primary },
		txt: { color: colors.secondary, fontWeight: '500' },
	},
	outline: {
		container: {
			backgroundColor: colors.bgLayout,
			borderWidth: 1,
			borderColor: colors.primary,
		},
		txt: { color: colors.primary, fontWeight: '500' },
	},
}
