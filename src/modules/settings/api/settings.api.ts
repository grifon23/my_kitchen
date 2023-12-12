import auth from '@react-native-firebase/auth'

export class SettingsRequestsService {
	public getAuthProviderCredential(email: string, currentPassword: string) {
		return auth.EmailAuthProvider.credential(email, currentPassword)
	}
	public getUser() {
		return auth().currentUser
	}
}
export const settingsApiService = new SettingsRequestsService()
