import { ErrorKeysEnum } from '../typing'

export const exeptionsConfig: any = {
	[ErrorKeysEnum.EmailAlreadyExist]: 'That email address is already in use!',
	[ErrorKeysEnum.InvalidEmail]: 'User not exist',
	[ErrorKeysEnum.InvalidLogin]: 'User not exist',
}
