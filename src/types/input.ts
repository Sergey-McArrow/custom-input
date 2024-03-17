import { acceptableSymbols } from '@/const'

export type TInputItem = {
	name: string
	category: string
	value: number | string
	id: string
}

export type TAcceptableSymbols = (typeof acceptableSymbols)[number]

export type TInputState = {
	input: string
	setInput: (value: string) => void
	foundItems: TInputItem[]
	setFoundItems: (items: TInputItem[]) => void
	items: (TInputItem | TAcceptableSymbols)[]
	addItem: (item: TInputItem | TAcceptableSymbols) => void
	removeItem: (item: TInputItem | TAcceptableSymbols) => void
	removeLastItem: () => void
	clearItems: () => void
	open: boolean
	toggleOpen: () => void
	setOpen: (open: boolean) => void
}

export type TWithInputItemProps = {
	item: TInputItem
}
