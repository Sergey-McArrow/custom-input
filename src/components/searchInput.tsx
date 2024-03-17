'use client'

import CustomInput from './customInput'

export const SearchInput = () => {
    return (
        <CustomInput.Root>
            <CustomInput.Input />
            <CustomInput.List>
                <CustomInput.ListItems />
            </CustomInput.List>
        </CustomInput.Root>
    )
}