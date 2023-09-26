import { Events } from 'jet-tools'
export type AppEvents = {
	event: {
		data: string
	}
	redirect: {
		route: string
		payload: any
	}
	alert: {
		icon?: string
		message: string
		onPress: () => void
		buttonType: 'primary' | 'outline'
		btnText?: string
		colorIcon?: string
	}
}
export const appEvents = new Events<AppEvents>()
