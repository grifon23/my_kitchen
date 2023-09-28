import { useNavigation as useNavigationNative } from '@react-navigation/native'
type UseNavigation = () => {
	navigate: (key: string, params?: Record<any, any>) => void
	push: (key: string, params?: Record<any, any>) => void
	goBack: () => void
	reset: any
	dispatch: any
}
export const useNav = useNavigationNative as UseNavigation
export const resetNav = (nav: any, route: string, params: any = {}) => {
	nav.reset({
		index: 0,
		routes: [{ name: route, params }],
	})
}
