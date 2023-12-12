import { Events } from 'jet-tools'
export type AppEvents = {
	event: {
		data: string
	}
	redirect: {
		route: string
		payload: any
	}
	needScroll: {
		isScrollable: boolean
	}
	alert: {
		icon?: string
		message: string
		onPress: () => void
		buttonType: 'primary' | 'outline'
		btnText?: string
		colorIcon?: string
		cancelBtnText?: string
		cancelBtnType?: 'primary' | 'outline'
		onPressCancelBtn?: () => void
	}
	editorRecipe: {}
	reload: {}
}
export const appEvents = new Events<AppEvents>()
