import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageKey } from '../typing'
export class StorageService {
	private _local: Partial<Record<StorageKey, any>> = {}
	constructor() {
		this.init()
	}
	private init() {
		this.get(StorageKey.AccessToken)
	}
	private async getFromAsync(key: any) {
		const encode = await AsyncStorage.getItem(key)
		if (encode) return JSON.parse(encode)
		else return null
	}
	private async setToAsync(key: any, data: any) {
		const encode = JSON.stringify(data)
		await AsyncStorage.setItem(key, encode)
	}
	public async get(key: StorageKey) {
		if (this._local[key]) return this._local[key]
		return await this.getFromAsync(key)
	}
	public getLocal(key: StorageKey) {
		return this._local[key]
	}
	public setLocal(key: StorageKey, data: any) {
		this._local[key] = data
	}
	public async set(key: StorageKey, data: any) {
		await this.setToAsync(key, data)
		this._local[key] = data
	}
}
export const storageService = new StorageService()
