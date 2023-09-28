const globalData: any = {
	store: null,
	internetConnect: true,
	scrollY: 0,
}
const set = (key: string, value: any) => {
	globalData[key] = value
}
const get = (key: string) => globalData[key]
export const gcService = {
	set,
	get,
}
