import React, {FC} from 'react'
import {colors, Icon} from '~modules/common'

interface IProps {
    arrow: boolean
    icon?: string
}

export const MenuListRightIcon: FC<IProps> = ({arrow, icon}) => {
    if (arrow)
        return (
            <Icon
                size={24}
                color={colors.primary}
                name={'right-open-big'}
            />
        )
    return <Icon size={24} color={'rgba(53, 113, 253, 1)'} name={icon} />
}
