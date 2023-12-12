import { presenceCost, validate } from '~modules/common'
import { IChangePasswordForm } from '~modules/settings/typing'

const constraints = {
	currentPassword: {
		presence: presenceCost,
	},
	newPassword: {
		presence: presenceCost,
	},
	confirmPassword: {
		presence: presenceCost,
		equality: 'newPassword',
	},
}
export const changePasswordValidator = (data: IChangePasswordForm) => {
	return validate(data, constraints)
}
