import { useEffect } from 'react'
import { AppEvents, appEvents } from '~modules/common/events'
export const useEventsListener = <T extends keyof AppEvents>(
	name: T,
	action: (data: AppEvents[T]) => void,
	dependencies: any[] = [],
) => {
	useEffect(() => {
		const fn = (data: AppEvents[T]) => {
			try {
				action(data)
			} catch (e) {
				console.log('error event', e)
			}
		}
		appEvents.on(name, fn)
		return () => appEvents.off(name, fn)
	}, dependencies)
}
