import { settingsApiService } from '../api/settings.api'
import { Service } from '~modules/common/service'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

export class ChangePasswordService extends Service {
	public async changePassword(currentPassword: string, newPassword: string) {
		await this.passwordCheck(currentPassword)
		await this.updatePassword(newPassword)
	}

	private async updatePassword(newPassword: string) {
		const user = settingsApiService.getUser()
		await user.updatePassword(newPassword)
	}
	private async passwordCheck(currentPassword: string) {
		const user = settingsApiService.getUser()
		const credential = settingsApiService.getAuthProviderCredential(
			user.email,
			currentPassword,
		)
		await user.reauthenticateWithCredential(credential)
	}
}

export const changePasswordService = new ChangePasswordService()
