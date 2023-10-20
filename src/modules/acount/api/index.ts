import firestore from '@react-native-firebase/firestore'
import { Service } from '~modules/common/service'

class AccountApi {
	public async getAccountReq(uuid: string) {
		const { docs } = await firestore()
			.collection('users')
			.where('uuid', '==', uuid)
			.get()
		return docs[0].data()
	}
}

export const accountApi = new AccountApi()
