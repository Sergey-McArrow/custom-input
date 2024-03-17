
import { FC, KeyboardEvent, PropsWithChildren, memo, useCallback, useEffect } from 'react'
import { useInputStore } from '@/store/inputStore'
import { TAcceptableSymbols, TInputItem, TInputState } from '@/types/input'
import { StoreApi } from 'zustand'
import createContext from "zustand/context"
import { getUniqueItemsByName, isAcceptableSymbol } from '@/utils/helper'
import { UseInputItems } from '@/hooks/useInputItems'

const { Provider, useStore } = createContext<StoreApi<TInputState>>()

const Root: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Provider createStore={useInputStore}>
            {children}
        </Provider>
    )
}
const Input = () => {
    const { input, toggleOpen, setFoundItems, setInput, items, addItem, clearItems, removeLastItem, removeItem } = useStore()
    const { data, isPending, error } = UseInputItems()

    const clearOptions = useCallback(() => {
        clearItems()
        setInput('')
    }, [])

    const handleKey = useCallback((e: KeyboardEvent) => {
        const { key } = e
        const isAcceptable = isAcceptableSymbol(key)
        const regex = /^[\w.-]{0,1}$/g

        switch (key) {
            case "Backspace":
                removeLastItem()
                setInput(input.slice(0, -1))
                break
            default:
                if (isAcceptable) {
                    addItem(key as TAcceptableSymbols)
                    setInput('')
                } else if (key.match(regex)) {
                    setInput(input + key)
                }
                break
        }
    }, [input, addItem, isAcceptableSymbol, removeLastItem, setInput])

    useEffect(() => {
        const filteredData = data?.filter(el => el.name.includes(input))
        if (filteredData && input.length > 1) {
            setFoundItems(getUniqueItemsByName(filteredData))
            toggleOpen()
        }
    }, [input])


    return (
        <div
            onBlur={toggleOpen}
            onClick={toggleOpen}
            tabIndex={0} onKeyDown={handleKey}
            className='border border-gray-300 rounded-md flex items-center gap-2 p-2 w-80 focus:border-blue-500 focus:outline-none'
        >
            <div className='flex-grow outline-none bg-transparent flex flex-wrap items-center'
            >
                {isPending ? <span className='text-gray-400'>Loading...</span> : null}
                {error ? <span>Ups! it was an error 🚨! {error.message}</span> : null}

                {items?.map((v, i) => (
                    <span
                        key={i}
                        className='flex items-center border border-gray-300 rounded-md p-1.5 cursor-pointer'
                    >
                        {(typeof v === 'object' && 'name' in v) ? v?.name : v}{/* // TODO: find better solution */}
                        <button className='text-base ml-1 text-gray-700 hover:text-blue-500 focus:text-blue-500 focus:outline-none border-l border-r px-1 border-gray-500'
                            onClick={() => removeItem(v)}
                        >
                            &times;
                        </button>
                    </span>
                ))}
                <span>{input}</span>
            </div>
            <button
                onClick={e => {
                    clearOptions()
                }}
                className='text-gray-700 hover:text-gray-900 focus:text-gray-900 focus:outline-none'
            >
                &times;
            </button>
        </div>
    )
}

const List: FC<PropsWithChildren> = ({ children }) => {
    const { open, foundItems, setOpen } = useStore()
    useEffect(() => { !foundItems.length && setOpen(false) }, [foundItems]) //TODO: find better solution

    return open && foundItems.length
        ? <div className='w-80 relative'>
            <ul className={`absolute w-full  bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto left-0`}>
                {children}
            </ul>
        </div >
        : null
}

const ListItems = () => {
    const { addItem, foundItems, setInput, setFoundItems, toggleOpen } = useStore()

    const handleAddItem = useCallback((el: TInputItem) => {
        addItem(el)
        setFoundItems([])
        setInput('')
        toggleOpen()
    }, [])

    return (
        <>
            {foundItems.length && foundItems?.map(el =>
                <li key={el.id + el.name} className='flex justify-between bg-gray-200 px-2 py-1 rounded-md m-1 cursor-pointer w-[calc(95%_-_1rem]'
                    onMouseDown={() => handleAddItem(el)}
                >
                    <span> {el.name} </span>
                    <span className='text-gray-400' >{el.category}</span>
                </li >
            )}
        </>

    )
}

export default {
    Root: memo(Root),
    Input: memo(Input),
    List: memo(List),
    ListItems: memo(ListItems),
}

