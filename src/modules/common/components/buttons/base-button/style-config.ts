import { colors } from '~modules/common/theme'

export const styleModConfig = {
	primary: {
		container: { backgroundColor: colors.primary },
		txt: { color: colors.secondary },
	},
	outline: {
		container: {
			backgroundColor: colors.bgLayout,
			borderWidth: 1,
			borderColor: colors.primary,
		},
		txt: { color: colors.primary },
	},
}
