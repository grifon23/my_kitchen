import _ from 'lodash'
import { IMenuListItemsProps } from '~modules/common'
interface IPropsMenuList {
	logout: () => void
	aboutUs: () => void
	shareUs: () => void
	connectGoogle: () => void
	passwordChange: () => void
	account: () => void
	favoriteRecipe: () => void
}
export const menuListConfig = ({
	logout,
	aboutUs,
	shareUs,
	connectGoogle,
	passwordChange,
	favoriteRecipe,
	account,
}: IPropsMenuList): IMenuListItemsProps[] => [
	{
		onPress: favoriteRecipe,
		text: 'Favorite recipe',
		arrow: true,
		leftIcon: 'heart-empty',
	},
	{
		onPress: account,
		text: 'Account',
		arrow: true,
		leftIcon: 'user',
	},
	{
		onPress: aboutUs,
		text: 'About Us',
		arrow: true,
		leftIcon: 'info',
	},
	{
		onPress: shareUs,
		text: 'Share us',
		arrow: true,
		leftIcon: 'share',
	},
	{
		onPress: connectGoogle,
		text: 'Connect Google account',
		arrow: true,
		leftIcon: 'google',
	},
	{
		onPress: passwordChange,
		text: 'Password change',
		arrow: true,
		leftIcon: 'arrows-cw',
	},
	{
		onPress: logout,
		text: 'Logout',
		leftIcon: 'logout',
	},
]
