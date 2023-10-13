import React, {FC} from 'react'
import {StyleSheet, View} from 'react-native'
import {IMenuListItemsProps, MenuListItem} from '~modules/common'

interface IMenuListProps {
    items: IMenuListItemsProps[]
}

export const MenuList: FC<IMenuListProps> = ({items = []}) => {
    return (
        <View style={styles.container}>
            {items.map((el: IMenuListItemsProps) => (
                <MenuListItem
                    onPress={el.onPress}
                    text={el.text}
                    arrow={el.arrow}
                    rightIcon={el.rightIcon}
                    leftIcon={el.leftIcon}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
})
