import firestore from '@react-native-firebase/firestore'
import { Service } from '~modules/common/service'
import { IProduct } from '~modules/products/typing'

class AccountApi {
	public async getAccountReq(uuid: string) {
		const { docs } = await firestore()
			.collection('users')
			.where('uuid', '==', uuid)
			.get()
		console.log('docs', docs, uuid)
		return docs[0].data()
	}

	public async updateMyProductsReq(uuid: string, products: IProduct[]) {
		await firestore()
			.collection('users')
			.doc(uuid)
			.update({ myProducts: products })
	}
}

export const accountApi = new AccountApi()
